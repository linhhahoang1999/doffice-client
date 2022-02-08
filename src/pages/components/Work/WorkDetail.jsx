import React, { useEffect } from 'react';
import moment from "moment";
import { Form, Button, } from '@themesberg/react-bootstrap';


import { useHistory } from 'react-router-dom';

// Icon
import { faCheck, faPlus, faPlay, faBan, faSave, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Multiselect } from 'multiselect-react-dropdown';
import './work.scss'

// import workServices from '../../../services/work.services'
import { useDispatch } from 'react-redux';
import workActions from '../../../actions/workActions';
import taskActions from '../../../actions/taskActions'
import staffActions from '../../../actions/staffActions'
import { useSelector } from 'react-redux';
import ListTask from './ListTask';
import recentlyServices from '../../../services/recently.services';
import CreateTaskModal from '../Task/CreateTaskModal';
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
// import commentServices from "../../../services/comment.services"
import Comments from '../Comment/Comments';
import WorkDetailForm from './WorkDetailForm'
import HistoryDropdown from '../History/HistoryDropdown';


const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success me-3',
        cancelButton: 'btn btn-gray'
    },
    buttonsStyling: false
}));



export default (props) => {
    const { user, role } = useSelector(state => state.authentication)
    const id = props.match.params.id
    const dispatch = useDispatch();



    const [disabled, setDisabled] = React.useState(true)
    const [showCreateTaskModal, setShowCreateTaskModal] = React.useState()



    const canEdit = (role?.roleCode != "2") ? true : false
    const [canCreateTask, setCanCreateTask] = React.useState(false)


    const handleCreateTaskShow = () => {
        setShowCreateTaskModal(true);
    }

    const history = useHistory();

    const [input, setInput] =
        React.useState({
            title: '',
            description: '',
            beginDate: '',
            endDate: '',
            userAssign: ''
        });

    const { workDetail, assigns } = useSelector(state => state.work)
    const { tasks, } = useSelector(state => state.task)
    const { staffs } = useSelector(state => state.staff)

    useEffect(() => {


        Promise.all(
            [dispatch(workActions.getWorkById(id)),
            dispatch(workActions.getAssignsByWorkId(id)),
            dispatch(taskActions.getTaskByWorkId(id)),
            dispatch(staffActions.getAllStaff()),

            ]
        ).then(async result => {
            const work = result[0] ?? {};
            const workDTO = {
                title: work.title,
                description: work.description,
                beginDate: moment(work.beginDate).format('YYYY-MM-DD'),
                endDate: moment(work.endDate).format('YYYY-MM-DD'),
                userAssign: ''

            }
            setInput(workDTO)
            insertRecently(work)
            const workAssign = result[1] ?? {};
            const found = workAssign?.find(wa => wa.userId = user.id)
            if (found?.id === user.id)
                setCanCreateTask(true)


        })
        componentDidMount()



    }, [])
    const componentDidMount = () => {
        document.title = "Thông tin công việc";
    }
    const insertRecently = async (work) => {
        var recently = {
            id: null,
            createAt: null,
            userId: user.id,
            entityId: id,
            type: "work",
            title: work.title
        }
        await recentlyServices.insertRecently(recently);



    }



    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDisabled(false)
        setInput({ ...input, [name]: value });
    }

    const onSelect = (selectedList, selectedItem) => {
        dispatch(workActions.insertWorkAssign(id, selectedItem.id))
    }

    const onRemove = (selectedList, removedItem) => {
        dispatch(workActions.removeWorkAssign(id, removedItem.id))
    }



    const onSubmit = async (e) => {
        console.log(input)
        e.preventDefault();
        const formData = new FormData();
        Object.keys(input).forEach((key) => {
            console.log(input[key]);
            if (key === 'userAssign') {
                for (let i = 0; i < input[key].length; i++) {
                    formData.append(`${key}[${i}]`, input[key][i]);
                }
            } else {
                formData.append(key, input[key]);
            }
        });
        const result = await SwalWithBootstrapButtons.fire({
            icon: 'question',
            title: 'Xác nhận lưu chỉnh sửa',
            text: 'Bạn có chắc muốn lưu thay đổi?',
            showCancelButton: true,
            confirmButtonText: "Xác nhận",
            cancelButtonText: 'Huỷ'
        });


        if (result.isConfirmed) {
            await SwalWithBootstrapButtons.fire('Đã lưu!', 'Thông tin công việc đã được cập nhật', 'success');
            dispatch(workActions.updateWorkByForm(formData, id)).then((result) => {
                if (result) {
                    dispatch(workActions.getWorkById(id))
                    // setSuccessShow(true)
                    setDisabled(true)
                }

            })
        }



        // history.push(Routes.WorkManagement.path);


    }

    const handleComplete = async () => {

        const val = !workDetail.isCompleted;
        const beginDate = moment(workDetail.beginDate).format('YYYY-MM-DD');
        const endDate = moment(workDetail.endDate).format('YYYY-MM-DD');
        const Edit = moment(workDetail.createAt).format('YYYY-MM-DD');


        var newWork = workDetail
        newWork.isCompleted = val
        newWork.createdAt = null;
        newWork.beginDate = beginDate
        newWork.endDate = endDate
        newWork.lastEdited = null

        console.log(newWork)
        dispatch(workActions.updateWorkDetail(newWork, id)).then(
            rs => {
                if (rs) {
                    dispatch(workActions.getWorkById(id))
                }

            }

        )



    }

    const handleStored = async (e) => {
        e.preventDefault()
        const val = !workDetail.isStored;
        const beginDate = moment(workDetail.beginDate).format('YYYY-MM-DD');
        const endDate = moment(workDetail.endDate).format('YYYY-MM-DD');
        const Edit = moment(workDetail.createAt).format('YYYY-MM-DD');


        var newWork = workDetail
        newWork.isStored = val
        newWork.createdAt = null;
        newWork.beginDate = beginDate
        newWork.endDate = endDate
        newWork.lastEdited = null

        console.log(newWork)
        dispatch(workActions.updateWorkDetail(newWork, id)).then(
            rs => {
                if (rs) {
                    dispatch(workActions.getWorkById(id))
                }

            }

        )

    }
    const handleDelete = async () => {

        const result = await SwalWithBootstrapButtons.fire({
            icon: 'warning',
            title: 'Xác nhận ',
            text: 'Bạn có chắc muốn xoá?',
            showCancelButton: true,
            confirmButtonText: "Xác nhận",
            cancelButtonText: 'Huỷ'
        });


        if (result.isConfirmed) {
            await SwalWithBootstrapButtons.fire('Đã lưu!', 'xoá công việc thành công', 'success');
            dispatch(workActions.deleteWork(id)).then(result => {
                if (result) {
                    history.goBack()
                }
            })


        }



    }



    return (
        <>
            {workDetail ? (

                <div className="row">
                    <div className='col edit-form ' style={{ borderRight: '1px solid gray' }}>
                        <Button variant="dark" style={{ marginLeft: "auto" }} onClick={() => { history.goBack() }} >
                            <FontAwesomeIcon icon={faLongArrowAltLeft} style={{ marginRight: 5 }} />
                            Quay lại
                        </Button>
                        <div style={{ display: "flex" }}>
                            <h4>Thông tin công việc</h4>

                            <div style={{ marginLeft: "auto" }}>
                                <HistoryDropdown entityId={id}
                                    type="work" />
                            </div>


                        </div>

                        {canEdit && <div>
                            {workDetail.isCompleted ? (
                                <Button variant="outline-info" style={{ marginLeft: "auto", fontSize: 10 }} onClick={handleComplete}>
                                    <FontAwesomeIcon icon={faPlay} style={{ marginRight: 5, fontSize: 10 }} />
                                    Tiến hành công việc
                                </Button>
                            ) :
                                (<Button variant="outline-success" style={{ marginLeft: "auto", fontSize: 10 }} onClick={handleComplete}>
                                    <FontAwesomeIcon icon={faCheck} style={{ marginRight: 5, fontSize: 10 }} />
                                    Đánh dấu hoàn thành
                                </Button>)}

                            {workDetail.isStored ? (
                                <Button variant="outline-danger" style={{ marginLeft: "auto", fontSize: 10 }} onClick={handleStored}>
                                    <FontAwesomeIcon icon={faBan} style={{ marginRight: 5, fontSize: 10 }} />
                                    Xoá khỏi danh sách lưu trữ
                                </Button>
                            ) :
                                (<Button variant="outline-warning" style={{ marginLeft: "10px", fontSize: 10 }} onClick={handleStored}>
                                    <FontAwesomeIcon icon={faSave} style={{ marginRight: 5, fontSize: 10 }} />
                                    Lưu trữ công việc
                                </Button>)}
                            
                                <Button variant="danger" style={{ marginLeft: "10px", fontSize: 10 }} onClick={handleDelete}>Xoá công việc</Button>
                           

                        </div>}
                        {canEdit && <div> {workDetail.isCompleted ? ('Đã hoàn thành') : 'Đang tiền hành'}</div>}


                        {canEdit && <WorkDetailForm input={input} onChange={onChange} onSubmit={onSubmit} disabled={disabled} />}
                        {!canEdit && <div style={{ fontSize: "19px", marginTop: "10px" }}>
                            <h5 style={{ font: "#a8abad" }}>
                                Công việc : {input.title}
                            </h5>
                            <div className="work-info pr-5 ">
                                <div className="row">
                                    <div className="col-5">Nội dung công việc :</div>
                                    <div className="col"> {input.description} </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-5">Ngày bắt đầu :</div>
                                <div className="col">
                                    Ngày {moment(input.ModalInfobeginDate).format('DD-MM-YYYY')}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-5">Thời hạn:</div>
                                <div className="col">
                                    Ngày {moment(input.endDate).format('DD-MM-YYYY')}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-5"  >Trạng thái</div>
                                <div className="col" style={{ color: 'blue' }} > {input.isCompleted ? ('Hoàn thành') : 'Đang tiến hành'} </div>
                            </div>
                        </div>
                        }

                    </div>
                    <div className='col-6' style={{ marginTop: 20 }}>


                        <Form.Group id="staffs" className="mb-4">
                            <Form.Label>Nhân viên tham gia</Form.Label>
                            <div>
                                <Multiselect

                                    options={staffs} // Options to display in the dropdown
                                    selectedValues={assigns}
                                    displayValue="userName" // Property name to display in the dropdown options
                                    placeholder="Chọn nhân viên"
                                    onSelect={onSelect}
                                    onRemove={onRemove}
                                    disable={!canEdit}
                                />
                            </div>
                        </Form.Group>

                        {tasks ? (
                            <div className='list-task' style={{ paddingBottom: 20 }}>

                                <p className="fw-bold pt-3" style={{ color: 'black' }}> Danh sách tác vụ : </p>
                                {tasks.length ? (
                                    tasks.map((task) =>
                                        <ListTask key={task.id} {...task} />

                                    )
                                ) : "Chưa có"}


                            </div>
                        ) : 'loading...'}


                        {(canCreateTask || canEdit) && <Button size='small'
                            variant='outline-dark'
                            // style={{  borderRadius: 0, padding: '1px 10px 1px 10px' }}
                            onClick={handleCreateTaskShow}>
                            <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5, fontSize: 10, marginBottom: 2 }} />
                            Thêm tác vụ mới
                        </Button>}
                        {
                            showCreateTaskModal ? (
                                <CreateTaskModal showModal={showCreateTaskModal}
                                    setshowModal={setShowCreateTaskModal}
                                    workId={id}
                                />
                            ) : null
                        }




                    </div>
                    <div style={{ backgroundColor: '#fff', marginTop: 20 }}>
                        <Comments type='work' currentUserId={user.id} entityId={id} />
                    </div>


                </div>

            ) : 'loading...'
            }
        </>
    )
}