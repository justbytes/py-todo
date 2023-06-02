import React, {useState, useEffect} from 'react'
import axios from 'axios'

// Import react-boostrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'

// Import components
import Modal from './components/Modal'

function App() {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [todoList, setTodoList] = useState([])
  const [modal, setModal] = useState(false)
  const [activeItem, setActiveItem] = useState({
    title: "",
    description: "",
    completed: false,
  })

  useEffect(() => {
    refreshList()
  }, [])

  const refreshList = () => {
    axios.get("/api/todos/").then((res) => setTodoList(res.data)).catch((err) => console.log(err));
  }
  const toggle = () => {
    setModal(!modal)
  }
  const handleSubmit = (item) => {
    console.log({...item});
    toggle()
    if (item.id) {
      axios.put(`/api/todos/${item.id}/`, {...item}).then((res) => refreshList())
      return
    }
    axios.post(`/api/todos/`, {...item}).then((res) => refreshList())
  }
  const handleDelete = (item) => {
    axios.delete(`/api/todos/${item}/`).then((res) => refreshList())
  }
  const createItem = () => {
    const item = { title: '', description: '', completed: false}
    setActiveItem(item)
    setModal(!modal)
  }

  const editItem = (item) => {
    setActiveItem(item)
    setModal(!modal)
  }
  const displayCompleted = (status) => {
    setViewCompleted(status)
  }
  const renderTabList = () => {
    return (
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link active={viewCompleted} onClick={() => displayCompleted(true)}>
            Complete
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={viewCompleted} onClick={() => displayCompleted(false)}>
            Incomplete
          </Nav.Link>
        </Nav.Item>
      </Nav>
    )
  }

  const renderItems = () => {
    const newItems = todoList.filter(
      (item) => item.completed === viewCompleted
    )
    return newItems.map((item) => (
      <li key={item.id} className='list-group-item d-flex justify-content-between align-items-center'>
        <span className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`} title={item.description}>
          {item.title}
        </span>
        <span>
          <Button variant='secondary' className='mr-2' onClick={() => editItem(item)}>Edit</Button>
          <Button variant='danger' onClick={(e) => handleDelete(item.id)}>Delete</Button>
        </span>
      </li>
    ))
  }

  return (
    <Container>
      <h1 className='text-uppercase text-center my-4'>Todo app</h1>
      <Row>
        <Col md={6} sm={10} className='mx-auto p-0'>
          <Card className='p-3'>
            <div className='mb-4'>
              <Button variant='primary' onClick={createItem}>Add Todo</Button>
            </div>
              {renderTabList()}
              <ul className='list-group list-group-flush border-top-0'>
                {renderItems()}
              </ul>
            
          </Card>
        </Col>
      </Row>
      {modal && (
        <Modal show={modal} onHide={toggle} activeItem={activeItem} onSave={handleSubmit} />
      )}
    </Container>
  )


}

export default App