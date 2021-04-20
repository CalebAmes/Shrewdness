import React, { useState } from 'react';
import socket from '../../services/socket';
import { useDropzone } from 'react-dropzone';
import './MessageInput.scss';

const MessageInput = ({ user, channelId, channelName, autoComplete }) => {
	const [value, setValue] = useState('');
	const [files, setFiles] = useState([]);
	const [alert, setAlert] = useState('');
	const [autoCompleteResults, setAutoCompleteResults] = useState([]);
	const userId = user?.id;

	const valHandler = (array) => {
		const valArray = array.split(' ');
		const val = valArray[valArray.length - 1].toString();
		return val;
	};

	const keyPress = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			sendMessage();
			setValue('');
			setFiles([]);
			setAutoCompleteResults([]);
		}
		if (e.key === '/') {
			e.preventDefault();
			if (autoCompleteResults && autoCompleteResults.length !== 0) {
				fillMessage(autoCompleteResults.shift());
			} else sendAlert('"/" key binding is reserved for autocomplete fill');
		}
	};

	const fillMessage = async (word) => {
		const valueArray = value.split(' ');
		valueArray.pop();
		valueArray.push(word);
		const string = valueArray.join(' ');
		setValue(string);
		document.querySelector('.messageInputTextarea').innerHTML = value;
	};

	const sendAlert = (string) => {
		setAlert(string);
		setTimeout(() => setAlert(''), 3000);
	};

	const sendMessage = () => {
		if (value.trim() === '') return;

		let msg;

		if (files[0]) {
			msg = {
				messageText: value.trim(),
				userId,
				channelId,
				messageImg: files[0],
			};
		} else {
			msg = {
				messageText: value.trim(),
				userId,
				channelId,
				messageImg: null,
			};
		}
		socket.emit(`chatMessage`, msg);
	};

	const autoCompleteFunc = (val) => {
		const newVal = valHandler(val);
		setAutoCompleteResults(autoComplete.autocomplete(newVal));
	};

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
		maxFileSize: 3097152,
	});

	const images = files.map((file) => (
		<div key={file.name}>
			<div>
				<img src={file.preview} style={{ width: '100px' }} alt="preview" />
			</div>
		</div>
	));

	return (
		<>
			{alert && (
				<div className="alert">
					<h3 className="messageOrigin">{alert}</h3>
				</div>
			)}
			<div className="messageInputDiv">
				<div className="dropzone" {...getRootProps()}>
					<input {...getInputProps()} />
					<i className="fas fa-image fa-lg" />
				</div>
				<textarea
					maxLength="140"
					onChange={(e) => {
						autoCompleteFunc(e.target.value);
						setValue(e.target.value);
					}}
					onKeyPress={keyPress}
					value={value}
					className="messageInputTextarea"
					placeholder={`Message # ${channelName}`}
				></textarea>
				<div className="preview">
					{files[0] && (
						<div onClick={() => setFiles([])}>
							<i className="fas fa-window-close" />
						</div>
					)}
					{images}
				</div>
			</div>
			{autoCompleteResults?.length > 0 && (
				<div className="autocomplete">
					<p>Click or Press '/'</p>
					<ul className="autocompleteList">
						{autoCompleteResults?.slice(0, 10).map((word) => (
							<li key={word} onClick={() => fillMessage(word)}>
								{word}
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
};

export default MessageInput;
