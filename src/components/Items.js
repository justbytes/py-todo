import React from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';

function Items({
  setActiveItem,
  activeItem,
  setModal,
  modal,
  setTodoList,
  todoList,
  viewCompleted,
  setViewCompleted,
}) {
  const handleDelete = (item) => {
    axios.delete(`/api/todos/${item}/`).then((res) => refreshList());
  };

  const editItem = (item) => {
    setActiveItem(item);
    setModal(!modal);
  };

  const refreshList = () => {
    axios
      .get('/api/todos/')
      .then((res) => setTodoList(res.data))
      .catch((err) => console.log(err));
  };

  const newItems = todoList.filter((item) => item.completed === viewCompleted);
  return newItems.map((item) => (
    <li
      key={item.id}
      className="list-group-item d-flex justify-content-between align-items-center">
      <span
        className={`todo-title mr-2 ${viewCompleted ? 'completed-todo' : ''}`}
        title={item.description}>
        <h4>{item.title}</h4>
        <p>{item.description}</p>
      </span>
      <span>
        <Button variant="info" className="mr-2" onClick={() => editItem(item)}>
          Edit
        </Button>
        <Button variant="danger" onClick={(e) => handleDelete(item.id)}>
          Delete
        </Button>
      </span>
    </li>
  ));
}

export default Items;
