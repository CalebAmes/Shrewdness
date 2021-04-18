import React, { useState } from 'react';
import { Modal } from '../Modal';
import LoginForm from './LoginForm';

function LoginFormModal({ text, fromSignup }) {
	const [showModal, setShowModal] = useState(false);
	const open = () => {
		setShowModal(!showModal);
	};

	return (
		<>
			<div className="openModal" onClick={() => setShowModal(true)}>
				{text}
			</div>
			{showModal && (
				<Modal onClose={open}>
					<LoginForm open={open} fromSignup={fromSignup} />
				</Modal>
			)}
		</>
	);
}

export default LoginFormModal;
