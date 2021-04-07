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
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={open}>
          <LoginForm open={open} />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;