import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const CustomModal = ({ activeItem, toggle, onSave }) => {
  const [item, setItem] = useState(activeItem);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setItem({ ...item, [name]: newValue });
  };

  const handleClose = () => {
    toggle();
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Todo Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={item.title}
              onChange={handleChange}
              placeholder="Enter Todo Title"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={item.description}
              onChange={handleChange}
              placeholder="Enter Todo description"
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              name="completed"
              checked={item.completed}
              label="Completed"
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => onSave(item)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
