import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import react-bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

// Import components
import Items from './Items';
import Modal from './Modal';

function Todo() {
  // Initialize state variables
  const [viewCompleted, setViewCompleted] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeItem, setActiveItem] = useState({
    title: '',
    description: '',
    completed: false,
  });

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    axios
      .get('/api/todos/')
      .then((res) => setTodoList(res.data))
      .catch((err) => console.log(err));
  };

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (item) => {
    console.log({ ...item });
    toggle();
    if (item.id) {
      axios
        .put(`/api/todos/${item.id}/`, { ...item })
        .then((res) => refreshList());
      return;
    }
    axios.post(`/api/todos/`, { ...item }).then((res) => refreshList());
  };

  const createItem = () => {
    const item = { title: '', description: '', completed: false };
    setActiveItem(item);
    setModal(!modal);
  };

  const displayCompleted = (status) => {
    setViewCompleted(status);
  };

  return (
    <>
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link
            active={viewCompleted}
            onClick={() => displayCompleted(true)}>
            Complete
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={viewCompleted}
            onClick={() => displayCompleted(false)}>
            Incomplete
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Container>
        <Row>
          <Col md={6} sm={10} className="mx-auto p-0">
            <Card className="p-3">
              <div className="mb-4">
                <Button variant="primary" onClick={createItem}>
                  Add Todo
                </Button>
              </div>
              <ul className="list-group list-group-flush border-top-0">
                <Items
                  setTodoList={setTodoList}
                  todoList={todoList}
                  setModal={setModal}
                  setActiveItem={setActiveItem}
                  activeItem={activeItem}
                  viewCompleted={viewCompleted}
                  setViewCompleted={setViewCompleted}
                />
              </ul>
            </Card>
          </Col>
        </Row>
        {modal && (
          <Modal
            show={modal}
            onHide={toggle}
            activeItem={activeItem}
            onSave={handleSubmit}
          />
        )}
      </Container>
    </>
  );
}

export default Todo;
