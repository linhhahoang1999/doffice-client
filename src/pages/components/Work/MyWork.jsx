import React, { useEffect, useState } from 'react';
import { Card, Button, ListGroup, DropdownButton, Dropdown } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import CreateWorkModal from './modal/CreateWorkModal'
import { Routes } from '../../../routes';


import StatusShow from './StatusShow';
import { useDispatch } from 'react-redux';
import workActions from '../../../actions/workActions';
import { useSelector } from 'react-redux';
import TableWork from './TableWork';
import SearchForm from '../Form/SearchForm';


export default (props) => {

    const userId = props.match.params.userId
    const dispatch = useDispatch();

    const { userLoaded, user, role } = useSelector(state => state.authentication);
    const canCreate = (role?.roleCode != "2") ? true : false

    const [createForm, setCreateForm] = useState(false)
    const [tableShow, setTableShow] = React.useState(false)
    const [statusShow, setStatusShow] = React.useState(true)


    const handleTableShow = () => {
        setTableShow(true)
        setStatusShow(false)

    }

    const handleCreateShow = () => {
        setCreateForm(true)


    }

    const handleStatusShow = () => {
        setTableShow(false)
        setStatusShow(true)

    }

    const { works, loading } = useSelector(state => state.work);
    useEffect(() => {

        dispatch(workActions.getWorkByUserId(userId))
        componentDidMount()

    }, [])
    const [listWork, setListWork] = React.useState(works)

    const filterTitle = (text) => {
        if (text === " ")
            setListWork(works)
        else {
            const tmp = works.filter(work => work.title.toLowerCase().includes(text))
            setListWork(tmp)
        }
    }


    const componentDidMount = () => {
        document.title = "Công việc của tôi";
    }


    return (
        <>
            <div className="" style={{ maxWidth: "40%" }}>

                <ListGroup horizontal>
                    <ListGroup.Item style={{ width: 'auto' }} action href={Routes.WorkManagement.path} className='active'>
                        Công việc
                    </ListGroup.Item>
                    <ListGroup.Item style={{ width: 'auto' }} action href={Routes.TaskManagement.path} >
                        Tác vụ
                    </ListGroup.Item>
                </ListGroup>
            </div>
            <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4" style={{ marginBottom: '25px' }}>

                <div className="d-block mb-4 mb-xl-0">

                    <h4>Danh sách công việc của tôi</h4>
                    {/* <p className="mb-0">
                    Dozens of reusable components built to provide buttons, alerts, popovers, and more.
                </p> */}

                    {canCreate && <Button variant="secondary" className="m-1 mb-4" onClick={handleCreateShow}>
                        Thêm công việc
                    </Button>}
                </div>
            </div>
            <SearchForm initialText={"Tìm kiếm công việc"} type="stored" filterTitle={filterTitle} />

            {!loading ? (
                <>
                    <DropdownButton variant='light' id="dropdown-basic-button" title="Xem theo:" style={{ paddingBottom: '10px' }}>
                        <Dropdown.Item onClick={handleTableShow} className={tableShow ? 'active' : null}><Link>Dạng bảng</Link ></Dropdown.Item>
                        <Dropdown.Item onClick={handleStatusShow} className={statusShow ? 'active' : null} ><Link>Trạng thái</Link ></Dropdown.Item>
                        <Dropdown.Item  ><Link to={Routes.WorkManagement.path}>Tất cả công việc </Link> </Dropdown.Item>
                        <Dropdown.Item ><Link to={Routes.StoredWorks.path}>Công việc lưu trữ</Link></Dropdown.Item>

                    </DropdownButton>





                    <Card border="light" className="shadow-sm">

                        <Card.Body className="p-0">

                            {statusShow ? (<StatusShow works={listWork} />
                            ) : null}

                            {tableShow ? (
                                <TableWork works={listWork} />
                            ) : null}

                        </Card.Body>
                    </Card>
                </>
            ) : 'loading...'
            }
            {
                createForm ? (
                    <CreateWorkModal showModal={createForm} setshowModal={setCreateForm} />

                ) : null
            }

        </>
    )
}