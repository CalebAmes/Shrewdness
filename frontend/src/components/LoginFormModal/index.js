import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const open = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      <div className='openModal' onClick={() => setShowModal(true)}>Log In</div>
      {showModal && (
        <Modal onClose={open}>
          <LoginForm open={open} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;