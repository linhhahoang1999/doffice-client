import React from 'react';
import moment from 'moment';
import { Button, InputGroup, Form, Row, Col } from '@themesberg/react-bootstrap';
import { useHistory } from 'react-router-dom';


const WorkDetailForm = ({
    input, onSubmit, onChange, disabled
}) => {

    const history = useHistory();

    return (

        <Form className="mt-4" onSubmit={onSubmit} style={{ color: 'black', }} >
            <Form.Group id="title" className="mb-4">
                <Form.Label>Tên công việc</Form.Label>
                <InputGroup>

                    <Form.Control autoFocus required type="text" name='title' onChange={onChange} value={input.title} />
                </InputGroup>
            </Form.Group>


            <Form.Group>
                <Form.Group id="description" className="mb-4">
                    <Form.Label>Nội dung tóm tắt</Form.Label>
                    <InputGroup>



                        <textarea required type="text" name='description' onChange={onChange} value={input.description} />
                    </InputGroup>
                </Form.Group>
            </Form.Group>

            <Form.Group>
                <Form.Group id="beginDate" className="mb-4">
                    <Form.Label>Ngày bắt đầu công việc</Form.Label>
                    <InputGroup>
                        <Form.Control type="date" value={moment(input.beginDate).format('YYYY-MM-DD')} name="beginDate" onChange={onChange} required />
                    </InputGroup>
                </Form.Group>
            </Form.Group>

            <Form.Group id="endDate" className="mb-4">
                <Form.Label>Thời hạn (Dự tính) </Form.Label>
                <InputGroup>
                    <Form.Control type="date" name='endDate' onChange={onChange} value={moment(input.endDate).format('YYYY-MM-DD')} required />
                </InputGroup>
            </Form.Group>

            <Form.Group id="userAssign" className="mb-4" hidden>
                <Form.Label>User</Form.Label>
                <InputGroup>
                    <Form.Control type="text" name='userAssign' value="6174d5109bf03f565fe5303d" />
                </InputGroup>
            </Form.Group>
            <div style={{ display: "flex" }}>
                <Button disabled={disabled} variant="info" type="submit" >
                    Lưu thông tin
                </Button>
                <Button variant="dark" style={{ marginLeft: "auto" }} onClick={() => { history.goBack() }} >
                    Quay lại
                </Button>
            </div>
        </Form>
    );
};

export default WorkDetailForm;