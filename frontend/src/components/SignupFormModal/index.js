import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);
  const open = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      <div className='openModal' onClick={() => setShowModal(true)}>Sign Up</div>
      {showModal && (
        <Modal onClose={open}>
          <SignupForm open={open} />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;