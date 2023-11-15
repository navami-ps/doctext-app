// DocumentCard.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DocumentCard = ({ todo, editingTodo, editingTitle, setEditingTodo, setEditingTitle, updateTodo, deleteTodo,darkMode }) => {
    const carddark = {
        width: '20rem',
        margin: '20px',
        border: 'white',
        background: 'rgb(70,70,70)',
        background: 'linear-gradient(90deg, rgba(70,70,70,1) 100%, rgba(255,255,255,1) 100%)',
        color: 'white',
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)', // Add a white shadow
      };      
    const cardlight= {
        width: '20rem',
        margin: '20px',
        background: 'rgb(223,255,255)',
        background: 'linear-gradient(90deg, rgba(223,255,255,1) 100%, rgba(255,255,255,1) 100%)',
        color:'black'
    }
  return (
    <Card className='shadow' style={darkMode?carddark:cardlight} key={todo.id}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          {editingTodo === todo.id ? (
            <div>
              <input
                type="text"
                className='w-100'
                value={editingTitle || todo.title}
                onChange={(e) => setEditingTitle(e.target.value)}
              />
              <Button variant='primary' onClick={() => updateTodo(todo.id, editingTitle)}>
                Save
              </Button>
            </div>
          ) : (
            <>
              <Card.Title><h1>{todo.title}</h1></Card.Title>
              <div>
                <i
                  className="fa-regular text-warning fa-pen-to-square me-2"
                  onClick={() => {
                    setEditingTitle(todo.title);
                    setEditingTodo(todo.id);
                  }}
                ></i>
                <i
                  onClick={() => deleteTodo(todo.id)}
                  className="fa-solid fa-trash text-danger me-2"
                ></i>
              </div>
            </>
          )}
        </div>
        <Link
          style={{ textDecoration: 'none', color: 'inherit' }}
          to={`/quil/${todo.id}`}
        >
          <div style={{ widows: '100%', minHeight: '30px' }} dangerouslySetInnerHTML={{ __html: todo.description }} />
        </Link>
      </Card.Body>
    </Card>
  );
};

export default DocumentCard;