import React, { useEffect, useState } from 'react';
import { Card, Button, Table, ListGroup, InputGroup, Form, DropdownButton, Dropdown, Row, Col } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { Routes } from '../../../routes';

import CreateWorkModal from './modal/CreateWorkModal';


import StatusShow from './StatusShow';
import { useDispatch } from 'react-redux';
import workActions from '../../../actions/workActions';
import { useSelector } from 'react-redux';
import TableWork from './TableWork';
import SearchForm from '../Form/SearchForm';
import Recently from '../Recently/Recently';




export default () => {
  const dispatch = useDispatch();


  const [createForm, setCreateForm] = useState(false)
  const [tableShow, setTableShow] = React.useState(false)
  const [statusShow, setStatusShow] = React.useState(true)

  const { userLoaded, user, role } = useSelector(state => state.authentication);
  const canCreate = (role?.roleCode != "2") ? true : false

  console.log(role)


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

    dispatch(workActions.getAll())
    componentDidMount()

  }, [])

  const componentDidMount = () => {
    document.title = "Quản lý công việc";
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
      <div style={{ marginTop: 20 }}>
        <Recently userId={user.id} />

      </div>

      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4" style={{ marginBottom: '25px' }}>

        <div className="d-block mb-2 ">
          <h4>Danh sách công việc</h4>

          {canCreate && <Button variant="secondary" className="m-1 " onClick={handleCreateShow}>
            Thêm công việc
          </Button>}
        </div>
      </div>

      <SearchForm initialText={"Tìm kiếm công việc"} type="work" />

      {!loading ? (
        <>

          <div style={{ display: 'flex', paddingTop: 20 }}>

            <DropdownButton variant='light' id="dropdown-basic-button" title="Xem theo:" style={{ paddingBottom: '10px' }}>
              <Dropdown.Item onClick={handleTableShow} className={tableShow ? 'active' : null}><Link>Dạng bảng</Link ></Dropdown.Item>
              <Dropdown.Item onClick={handleStatusShow} className={statusShow ? 'active' : null} ><Link>Trạng thái</Link ></Dropdown.Item>
              <Dropdown.Item ><Link to={'/work/user/' + user.id}>Công việc của tôi</Link></Dropdown.Item>
              <Dropdown.Item ><Link to={Routes.StoredWorks.path}>Công việc lưu trữ</Link></Dropdown.Item>
            </DropdownButton>

          </div>



          <Card border="light" className="shadow-sm">

            <Card.Body className="p-0">

              {statusShow ? (<StatusShow works={works} />
              ) : null}

              {tableShow ? (
                <TableWork works={works} />
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