// AddDocumentModal.jsx
import React from 'react';
import { Modal } from 'react-bootstrap';

const AddDocumentModal = ({ show, handleClose, todoTitle, setTodoTitle, postData }) => {
  return (
    <Modal style={{ position: 'absolute', top: '35vh' }} show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Body style={{ height: '20vh' }}>
        <div className='d-flex flex-column align-items-center justify-content-center w-100 h-100'>
          <input
            type="text"
            className='w-100 p-1 rounded'
            placeholder='Document title'
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
          />
          <button
            className='mt-3 rounded ps-5 pe-5 btn btn-primary'
            
            onClick={postData}
          >
            Add
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddDocumentModal;
