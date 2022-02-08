import React from 'react';
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUnlockAlt, faUser, faPhone } from '@fortawesome/free-solid-svg-icons';

import { Link, useHistory } from 'react-router-dom';
import { Routes } from '../../../routes';

const fakeRole = [
    {
        id: 'someId1',
        name: 'Admin'
    },
    {
        id: 'someId2',
        name: 'Moderator'
    }
];

export default () => {
    const [ input, setInput ] = React.useState({ email: '', password: '', passwordConfirmation: '', fullName: '', phone: '', roleId: '' });

    const history = useHistory();

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    
        setInput({ ...input, [name]: value });
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(input);
        history.push(Routes.User.path);
    }

    return (
        <>
            <Form className="mt-4" onSubmit={onSubmit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="example@company.com" name='email' onChange={onChange}/>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Password" name='password' onChange={onChange}/>
                      </InputGroup>
                    </Form.Group>
                  </Form.Group>

                  <Form.Group>
                    <Form.Group id="passwordConfirmation" className="mb-4">
                      <Form.Label>Confirm Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Password Confirmation" name='passwordConfirmation' onChange={onChange}/>
                      </InputGroup>
                    </Form.Group>
                  </Form.Group>

                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Full Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control type="text" placeholder="Full Name" name='fullName' onChange={onChange}/>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Phone Number</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faPhone} />
                      </InputGroup.Text>
                      <Form.Control type="text" placeholder="Phone Number" name='phone' onChange={onChange}/>
                    </InputGroup>
                  </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select name='roleId' onChange={onChange}>
                        <option defaultValue>Select Role</option>
                        { fakeRole.map((v, i) => (<option key={i} value={v.id}>{ v.name }</option>)) }
                    </Form.Select>
                </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Add User
                  </Button>
                </Form>
        </>
    )
}