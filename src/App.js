import { useEffect, useState } from 'react';
import './App.css';
import { db } from './config/firebase';
import { getDocs, collection, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Button, Card, Container, Modal, Navbar } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Route, Routes } from 'react-router-dom';
import QuillComponent from './Components/QuillComponent';
import DocumentCard from './Components/DocumentCard';
import AddDocumentModal from './Components/AddDocumentModal';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');

  const todoCollectionRef = collection(db, 'todos');

  const deleteTodo = async (id) => {
    const todoDoc = doc(db, 'todos', id);
    await deleteDoc(todoDoc);
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  const getTodoList = async () => {
    const data = await getDocs(todoCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setTodoList(filteredData);
  };

  const postData = async () => {
    try {
      const newDocRef = await addDoc(todoCollectionRef, {
        title: todoTitle,
        description: '',
      });
      const newTodo = { title: todoTitle, description: '', id: newDocRef.id };
      setTodoList([...todoList, newTodo]);
      handleClose();
      toast.success('Document added successfully', { autoClose: 2000 });
    } catch (error) {
      console.error('Error adding document:', error);
      toast.error('An error occurred while adding the document');
    }
  };

  const updateTodo = async (id, newTitle) => {
    const todoDoc = doc(db, 'todos', id);
    await updateDoc(todoDoc, { title: newTitle });
    const updatedList = todoList.map((todo) => {
      if (todo.id === id) {
        todo.title = newTitle;
      }
      return todo;
    });
    setTodoList(updatedList);
    setEditingTodo(null);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    getTodoList();
  }, []);
  const gradientStyle = {
    width: '100%',
    height:'100vh',
    background: 'rgb(134,218,255)',
    background: 'linear-gradient(90deg, rgba(134,218,255,1) 0%, rgba(255,255,255,1) 100%, rgba(255,255,255,1) 100%)'
  };
  const body = {
    background:'black',
    color:'white'
  }
  useEffect(() => {
    // Select other elements you want to apply dark mode to
    const appElements = document.querySelectorAll('.app-element');
  
    if (darkMode) {
      document.body.classList.add('dark-mode');
      // Apply dark mode styles to other elements
      appElements.forEach((element) => {
        element.classList.add('dark-mode');
      });
    } else {
      document.body.classList.remove('dark-mode');
      // Remove dark mode styles from other elements
      appElements.forEach((element) => {
        element.classList.remove('dark-mode');
      });
    }
  }, [darkMode]);
  

  return (
    <div style={darkMode ?body:gradientStyle}>
      <Navbar className={`bg-${darkMode ? 'dark' : 'primary'} w-100`} style={{ width: '100%',height:'12vh'}}>
        <Container>
          <Navbar.Brand>
              <div className='d-flex'>            <i className={`fa-solid fa-file-signature text-${darkMode ? 'light' : 'light'}`}></i> <h1 className={`text-${darkMode ? 'light' : 'light'}`}>Add Skill</h1></div>
          </Navbar.Brand>
          <i className={`fa-solid ${darkMode ? 'fa-sun' : 'fa-moon'} fs-2 text-light`} onClick={toggleDarkMode}></i>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/quil/:id" element={<QuillComponent />} />
      </Routes>
      <div className='d-flex w-100 align-items-center justify-content-center flex-column mt-5'>
        <button className={`btn ${darkMode ? 'btn-outline-light':'btn-outline-primary'} p-2`} onClick={handleShow}><i className="fa-solid fa-plus me-2"></i>Add Document</button>
            <div className='d-flex justify-content-center p-5'>
              {todoList.map((todo) => (
                <DocumentCard
                  key={todo.id}
                  todo={todo}
                  editingTodo={editingTodo}
                  editingTitle={editingTitle}
                  setEditingTodo={setEditingTodo}
                  setEditingTitle={setEditingTitle}
                  updateTodo={updateTodo}
                  deleteTodo={deleteTodo}
                  darkMode={darkMode}
                />
              ))}
            </div>
        <AddDocumentModal
          show={show}
          handleClose={handleClose}
          todoTitle={todoTitle}
          setTodoTitle={setTodoTitle}
          postData={postData}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
export default App;