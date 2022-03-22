import React, { useState } from "react";
import { Modal } from "../Modal";
import SignupForm from "./SignupForm";

function SignupFormModal({ text, fromLogin }) {
  const [showModal, setShowModal] = useState(false);
  const open = async () => {
    await setShowModal(!showModal);
  };

  return (
    <>
      <div className="openModal" onClick={open}>
        {text}
      </div>
      {showModal && (
        <Modal onClose={open}>
          <SignupForm open={open} fromLogin={fromLogin} />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
