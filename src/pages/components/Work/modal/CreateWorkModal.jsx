import React, { useEffect, useState } from 'react';

import { Form, Button, ListGroup, InputGroup, ListGroupItem, Modal } from '@themesberg/react-bootstrap';

import { Multiselect } from 'multiselect-react-dropdown';

import { useDispatch } from 'react-redux';
import workActions from '../../../../actions/workActions';
import staffActions from '../../../../actions/staffActions';
import { useSelector } from 'react-redux';




const CreateTaskModal = ({ showModal, setshowModal, data }) => {
    const dispatch = useDispatch()

    const [show, setShow] = useState(showModal);
    const handleClose = () => setshowModal(false);


    const [assigns, setAssigns] = React.useState()

    const [input, setInput] = React.useState({
        title: '',
        description: '',
        beginDate: '',
        endDate: '',
        userAssign: [],
    });
    const { staffs } = useSelector(state => state.staff)
    const textInput = React.createRef();



    useEffect(() => {

        Promise.all([
            dispatch(staffActions.getAllStaff())
        ])
        componentDidMount()



    }, [])
    // console.log(data)



    const onSelect = async (selectedList, selectedItem) => {
        setAssigns(selectedList)
    }
    const onSubmit = async (e) => {



        e.preventDefault();
        if (assigns) {
            for (var i = 0; i < assigns.length; i++)
                input.userAssign.push(assigns[i].id)

        }
        // console.log("input:" + input)
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

        // console.log(formData)
        dispatch(workActions.createWorkByform(formData)).then(
            result => {
                if (result)
                    dispatch(workActions.getAll())

            })
        handleClose()

    }

    const onRemove = async (selectedList, removedItem) => {
        setAssigns(selectedList)

    }
    const componentDidMount = () => {
        textInput.current.focus();
    }

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput({ ...input, [name]: value });
    }




    return (
        <>
            <Modal
                slide="true"
                show={showModal} onHide={handleClose}
                size="lg"
                style={{ paddingLeff: 30 }}

            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: 'large', marginTop: 10 }}>T???o c??ng vi???c m???i</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mt-4" onSubmit={onSubmit}>
                        <Form.Group id="title" className="mb-4" autoFocus onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
                            <InputGroup >
                                <Form.Control
                                    className="border-0"
                                    size='lg'
                                    style={{ fontWeight: 'bolder', color: 'black', }}
                                    ref={textInput}
                                    type="text"
                                    placeholder="T??N C??NG VI???C"
                                    name='title'
                                    onChange={onChange}
                                    required />
                            </InputGroup>
                        </Form.Group>


                        <Form.Group>
                            <Form.Group id="description" className="mb-4" style={{ display: 'flex' }}>
                                <Form.Label style={{ width: 100, marginTop: 10 }}>M?? t???</Form.Label>
                                <InputGroup>
                                    <textarea type="text" placeholder="M?? t??? c??ng vi???c" name='description' onChange={onChange} required />
                                </InputGroup>
                            </Form.Group>
                        </Form.Group>

                        <Form.Group>
                            <Form.Group id="beginDate" className="mb-4" style={{ display: 'flex' }}>
                                <Form.Label style={{ width: 100, marginTop: 10 }} >B???t ?????u: </Form.Label>
                                <InputGroup>
                                    <Form.Control style={{ maxWidth: '50%' }} type="date" name="beginDate" onChange={onChange} required />
                                </InputGroup>
                            </Form.Group>
                        </Form.Group>

                        <Form.Group id="endDate" className="mb-4" style={{ display: 'flex' }}>
                            <Form.Label style={{ width: 100, marginTop: 10 }} >Th???i h???n</Form.Label>
                            <InputGroup>
                                <Form.Control style={{ maxWidth: '50%' }} type="date" name='endDate' onChange={onChange} required />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group id="userAssign" className="mb-4" style={{ display: 'flex' }}>
                            <Form.Label style={{ width: 100, marginTop: 10 }} >Nh??n vi??n</Form.Label>

                            <InputGroup onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
                                <Multiselect
                                    options={staffs} // Options to display in the dropdown
                                    selectedValues={assigns}
                                    displayValue="userName" // Property name to display in the dropdown options
                                    placeholder="Ch???n nh??n vi??n"
                                    onSelect={onSelect}
                                    onRemove={onRemove}

                                ></Multiselect>


                            </InputGroup>
                        </Form.Group>

                        <div style={{ display: 'flex', marginTop: 40, }}>

                            <Button variant="info" type="submit" style={{ marginLeft: 'auto' }}>
                                Th??m c??ng vi???c
                            </Button>

                            <Button variant="danger" onClick={handleClose} style={{ marginLeft: 25 }}>
                                Hu???
                            </Button>
                        </div>
                    </Form>


                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>

        </>
    );

}
export default CreateTaskModal;


