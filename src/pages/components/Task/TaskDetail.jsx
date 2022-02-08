import React, { useEffect } from 'react';
import moment from "moment";
import { Form, Button, InputGroup, Table, } from '@themesberg/react-bootstrap';


import { useHistory } from 'react-router-dom';
import recentlyServices from '../../../services/recently.services';

import { Multiselect } from 'multiselect-react-dropdown';


// import workServices from '../../../services/work.services'
import { useDispatch } from 'react-redux';
import workActions from '../../../actions/workActions';
import taskActions from '../../../actions/taskActions'

import taskServices from '../../../services/task.services';
import { useSelector } from 'react-redux';


import Comments from '../Comment/Comments';
import Swal from 'sweetalert2'
import withReactContent from "sweetalert2-react-content";
import HistoryDropdown from '../History/HistoryDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';


import ModalInfo from '../Work/modal/ModalInfo'


const SwalWithBootstrapButtons = withReactContent(Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success me-3',
        cancelButton: 'btn btn-gray'
    },
    buttonsStyling: false
}));


export default (props) => {

    const id = props.match.params.id
    const { user, role } = useSelector(state => state.authentication)
    const dispatch = useDispatch();


    const [disabled, setDisabled] = React.useState(true)

    const PRIORITY = [{ value: "thấp", data: 'low' }, { value: "trung bình", data: 'medium' }, { value: "cao", data: 'high' }]
    const STATUS = [{ value: "tiếp theo", data: 'next up' }, { value: "Tiến hành", data: 'in progress' }, { value: "hoàn thành", data: 'completed' }]

    const [canEdit, setCanEdit] = React.useState(() => {
        var rs = (role?.roleCode != "2") ? true : false
        return rs;

    }
    )





    const history = useHistory();

    const [input, setInput] =
        React.useState({
            workId: '',
            title: '',
            description: '',
            priority: '',
            status: '',
            beginDate: '',
            endDate: '',
            userAssign: '',
        });

    const { workDetail, assigns } = useSelector(state => state.work)
    const { taskDetail, taskAssigns } = useSelector(state => state.task)
    // const { staffs, loading } = useSelector(state => state.staff)
    const [reload, setReLoad] = React.useState(false)

    const [showWorkModal, setShowWorkModal] = React.useState(false)


    const handleWorkShow = () => {
        setShowWorkModal(true);

    }

    useEffect(() => {

        dispatch(taskActions.getTaskById(id)).then(
            rs => {
                if (rs) {
                    insertRecently(rs)
                    const taskDTO = {
                        workId: rs.workId,
                        title: rs.title,
                        description: rs.description,
                        priority: rs.priority,
                        status: rs.status,
                        beginDate: moment(rs.beginDate).format('YYYY-MM-DD'),
                        endDate: moment(rs.endDate).format('YYYY-MM-DD'),
                        userAssign: '',
                    }
                    setInput(taskDTO)
                    dispatch(workActions.getWorkById(rs.workId)).then(rs => {
                        if (rs)
                            dispatch(workActions.getAssignsByWorkId(rs.id))
                    })
                    dispatch(taskActions.getAssignByTaskId(rs.id))

                    if (rs.createdBy === user.id)
                        setCanEdit(true)

                }
            }
        )
        componentDidMount()

    }, [reload])

    const insertRecently = async (task) => {
        var recently = {
            id: null,
            createAt: null,
            userId: user.id,
            entityId: id,
            type: "task",
            title: task.title
        }
        await recentlyServices.insertRecently(recently);



    }
    const componentDidMount = () => {
        document.title = "Thông tin Tác vụ";
    }


    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDisabled(false)
        setInput({ ...input, [name]: value });
    }

    const onSelect = (selectedList, selectedItem) => {
        dispatch(taskActions.insertTaskAssign(id, selectedItem.id))

    }

    const onRemove = (selectedList, removedItem) => {

        dispatch(taskActions.removeTaskAssign(id, removedItem.id))
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
            await SwalWithBootstrapButtons.fire('Đã lưu!', 'xoá tác vụ thành công   ', 'success');
            dispatch(taskActions.deletetask(id)).then(result => {
                if (result) {
                    history.goBack()
                }
            })


        }



    }


    const onSubmit = async (e) => {
        console.log(input)
        e.preventDefault();
        const formData = new FormData();
        Object.keys(input).forEach((key) => {
            console.log(input[key]);
            formData.append(key, input[key]);

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
            taskServices.updateTask(id, formData)
            setDisabled(true)
        }

    }




    console.log(taskAssigns)
    return (
        <>
            {taskDetail ? (
                <>
                    <Button variant="dark" style={{ marginLeft: "auto" }} onClick={() => { history.goBack() }} >
                        <FontAwesomeIcon icon={faLongArrowAltLeft} style={{ marginRight: 5 }} />
                        Quay lại
                    </Button>
                    <div style={{ display: "flex", }}>

                        <div>
                            <h4>Thông tin tác vụ</h4>
                            <HistoryDropdown entityId={id}
                                type="task" />
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            {canEdit &&
                                <Button variant="danger" onClick={handleDelete}>Xoá tác vụ</Button>
                            }

                        </div>

                    </div>


                    <div className='edit-form  ' >
                        {canEdit && <Form className="mt-4 " onSubmit={onSubmit}
                            style={{
                                padding: '5px 5px  20px  10px ',
                                borderRadius: 5,
                                color: 'black',
                                backgroundColor: '#fff',
                                fontSize: 15


                            }}
                        >
                            <Table>
                                <tr>
                                    <td><Form.Group id="title" className="mb-4" >
                                        <Form.Label>Tên tác vụ</Form.Label>
                                        <InputGroup>
                                            <Form.Control autoFocus required type="text" name='title' onChange={onChange} value={input.title} />
                                        </InputGroup>
                                    </Form.Group>

                                    </td>
                                    <td>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Thuộc công việc
                                                <Button variant="outline-dark" style={{ marginLeft: "15px", padding: "2px 10px 2px 10px" }} onClick={handleWorkShow} >
                                                    Xem
                                                </Button>
                                            </Form.Label>
                                            <InputGroup>
                                                <Form.Control type="text" value={input.workId} name='workId' onChange={onChange} hidden />
                                                {workDetail ? (
                                                    <div style={{ backgroundColor: '#fff', width: '100%', padding: '10px 5px 10px 10px', border: '.5px solid lightgray', borderRadius: 5 }} >
                                                        {workDetail.title}
                                                    </ div >

                                                ) : null}
                                            </InputGroup>
                                        </Form.Group>


                                    </td>

                                </tr>
                                <tr>
                                    <Form.Group>
                                        <Form.Group id="description" className="mb-4">
                                            <Form.Label>Mô tả</Form.Label>
                                            <InputGroup>
                                                <textarea type="text" placeholder="Nội dung tác vụ" name='description' value={input.description} onChange={onChange} required />
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Group>
                                </tr>
                                <tr>
                                    <td>
                                        <Form.Group>
                                            <Form.Group id="beginDate" className="mb-4">
                                                <Form.Label>Ngày bắt đầu </Form.Label>
                                                <InputGroup>
                                                    <Form.Control type="date" value={moment(input.beginDate).format('YYYY-MM-DD')} name="beginDate" onChange={onChange} required />
                                                </InputGroup>
                                            </Form.Group>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Độ ưu tiên</Form.Label>
                                            <Form.Select name='priority' onChange={onChange} required>
                                                <option disabled selected hidden>Chọn độ ưu tiên</option>
                                                {PRIORITY.map(c => (<option key={c.data} value={c.data} selected={(input.priority === c.data ? true : null)} >{c.value.toUpperCase()}</option>))}
                                            </Form.Select>
                                        </Form.Group>


                                    </td>
                                    <td>


                                        <Form.Group id="endDate" className="mb-4">
                                            <Form.Label>Thời hạn </Form.Label>
                                            <InputGroup>
                                                <Form.Control type="date" name='endDate' onChange={onChange} value={moment(input.endDate).format('YYYY-MM-DD')} required />
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Trạng thái</Form.Label>
                                            <Form.Select name='status' onChange={onChange} required>
                                                <option disabled selected hidden>Chọn trạng thái</option>
                                                {STATUS.map(c => (<option key={c.data} value={c.data} selected={(input.status === c.data ? true : null)} >{c.value.toUpperCase()}</option>))}
                                            </Form.Select>
                                        </Form.Group>

                                    </td>
                                </tr>
                            </Table>



                            <div style={{ display: "flex" }}>
                                <Button disabled={disabled} variant="info" type="submit" >
                                    Lưu thông tin
                                </Button>
                                <Button variant="dark" style={{ marginLeft: "auto" }} onClick={() => { history.goBack() }} >
                                    Quay lại
                                </Button>
                            </div>
                        </Form>}
                        {!canEdit &&
                            <div className="work-info pr-5 ">

                                <h5> Tác vụ : {input.title}</h5>
                                <div className="row">
                                    <div className="col-5">Mô tả tác vụ :</div>
                                    <div className="col"> {input.description} </div>
                                </div>


                                {workDetail ? (
                                    <div className="row">
                                        <div className="col-5">Thuộc công việc :</div>
                                        <div className="col"> {workDetail.title}   <Button variant="outline-dark" style={{ marginLeft: "15px", padding: "2px 10px 2px 10px" }} onClick={handleWorkShow} >
                                            Xem
                                        </Button> </div>
                                    </div>

                                ) : null}


                                <div className="row">
                                    <div className="col-5">Ngày bắt đầu :</div>
                                    <div className="col">
                                        {moment(input.beginDate).format('MM-DD-YYYY HH:mm:ss')}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-5">Thời hạn:</div>
                                    <div className="col">
                                        {moment(input.endDate).format('MM-DD-YYYY HH:mm:ss')}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-5"  >Trạng thái</div>
                                    <div className="col"  > {input.priority}  </div>
                                </div>

                                <div className="row">
                                    <div className="col-5"  >Trạng thái</div>
                                    <div className="col"  > {input.status}  </div>
                                </div>
                            </div>}





                    </div>
                    <div style={{ marginTop: 20 }}>


                        <Form.Group id="staffs" className="mb-4">
                            <Form.Label>Nhân viên tham gia</Form.Label>
                            <div>
                                <Multiselect
                                    options={assigns} // Options to display in the dropdown
                                    selectedValues={taskAssigns}
                                    displayValue="userName" // Property name to display in the dropdown options
                                    placeholder="Chọn nhân viên"
                                    onSelect={onSelect}
                                    onRemove={onRemove}
                                    disable={!canEdit}

                                />


                            </div>
                        </Form.Group>




                    </div>

                    {
                        showWorkModal ? (
                            <ModalInfo showModal={showWorkModal} setshowModal={setShowWorkModal} data={workDetail} />
                        ) : null
                    }

                    <div style={{ backgroundColor: '#fff', marginTop: 20 }}>
                        <Comments type='task' currentUserId={user.id} entityId={id} />
                    </div>

                </>

            ) : 'Hi...'
            }
        </>
    )
}