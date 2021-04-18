import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import { useDropzone } from 'react-dropzone';
import './SignupForm.scss';

function SignupFormPage({ open, fromLogin }) {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [files, setFiles] = useState([]);
	const [bio, setBio] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState([]);

	const { getRootProps, getInputProps } = useDropzone({
		accept: 'image/*',
		onDrop: (acceptedFiles) => {
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			return setErrors(['Confirm Password field must be the same as the Password field']);
		}
		setErrors([]);
		const response = await dispatch(
			sessionActions.signup({
				email,
				username,
				bio,
				avatar: files[0],
				password,
			})
		).catch(async (res) => {
			const data = await res.json();
			if (data?.errors) {
				return setErrors(data.errors);
			}
		});
		if (response && response.ok) return window.location.reload();
	};

	const demoLogin = () => {
		dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }));
		open();
	};

	const images = files.map((file) => (
		<div key={file.name}>
			<div>
				<img src={file.preview} style={{ width: '100px' }} alt="preview" />
			</div>
		</div>
	));

	return (
		<>
			<div className="signupDiv">
				<div className="welcome">
					<h1>Create an account</h1>
					<h2>Look at you making great decisions!</h2>
				</div>
				<form className="loginForm" onSubmit={handleSubmit}>
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<div className="labelDiv">
						<h3>Email</h3>
						<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
					</div>
					<div className="labelDiv">
						<h3>Username</h3>
						<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
					</div>
					<div className="labelDiv">
						<h3>Biography</h3>
						<input type="text" value={bio} onChange={(e) => setBio(e.target.value)} required />
					</div>
					<h3 className="avatarh3">Add an Avatar:</h3>
					<div className="addavatar">
						<div className="dropzone2" {...getRootProps()}>
							<input {...getInputProps()} />
							<i className="fas fa-image fa-lg" />
						</div>
						<div className="preview preview2">
							{files[0] && (
								<div onClick={() => setFiles([])}>
									<i className="fas fa-window-close" />
								</div>
							)}
							{images}
						</div>
					</div>
					<div className="labelDiv">
						<h3>Password</h3>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="labelDiv">
						<h3>Confirm Password</h3>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</div>
					<button type="submit">Sign Up</button>
				</form>
				<div className="registerDemo">
					<div className="toRegister">
						<p>Already an account? </p>
						{fromLogin && <div onClick={open}>Log in here</div>}
						{!fromLogin && (
							<div className="toModal">
								<LoginFormModal text={'Log in here'} fromSignup={true} />
							</div>
						)}
					</div>
					<div className="demo">
						<div onClick={demoLogin}>Demo Login</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default SignupFormPage;
