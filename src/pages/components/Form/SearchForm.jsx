import React from "react";

import { Button, InputGroup, Form, Row, Col } from '@themesberg/react-bootstrap';
import { useDispatch } from "react-redux";
import workActions from '../../../actions/workActions';
import taskActions from "../../../actions/taskActions";


const SearchForm = ({

  type,
  initialText = "",
  filterTitle,
}) => {
  const [text, setText] = React.useState(initialText);
  const onSubmit = (e) => {
    e.preventDefault();
    if (type === "work") {
      if (text === "") {
        dispatch(workActions.getAll())
      }
      else
        dispatch(workActions.searchWork(text))
    }
    if (type === "task") {
      if (text === "") {
        dispatch(taskActions.getAll())
      }
      else
        dispatch(taskActions.searchTask(text))
    }
    if (type === "stored") {
      if (text === "")
        filterTitle(" ")
      else
        filterTitle(text)
    }

  };
  const onChange = (e) => {
    const value = e.target.value;
    setText(value)
  }

  const dispatch = useDispatch();

  return (
    <Form className="mt-4" onSubmit={onSubmit} >
      <Form.Group id="keywords" >
        <Row>
          <Col>
            <InputGroup >
              <Form.Control className="border-0" type="text"
                placeholder={text}
                name='keyword'
                onChange={onChange} />
            </InputGroup>
          </Col>

          <Col> <Button type='submit'>Tìm kiếm</Button>
          </Col>
        </Row>


      </Form.Group>
    </Form>
  );
};

export default SearchForm;