import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import socket from '../../services/socket';
import { deleteChannelMessage, updateChannelMessage } from '../../store/channelMessages';
import UserCard from '../UserCard';
import './ChatComponent.scss';

const ChatComponent = ({ message, channelId, currentUserId, users, scrollValue }) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [card, setCard] = useState(false);
	const [height, setHeight] = useState(0);
	const [messageEditor, setMessageEditor] = useState(false);
	const [hover, setHover] = useState(false);

	const userId = message.userId;
	const user = users[userId];
	let messageImg;

	const closeCard = async () => {
		const scroll = await scrollValue();
		setHeight(scroll);
		setCard(!card);
	};

	const deleteMessage = async (id) => {
		await dispatch(deleteChannelMessage(id));
		socket.emit('edit', channelId);
	};

	const editMessage = async (newMessage, id) => {
		if (newMessage !== message.messageText) {
			await dispatch(updateChannelMessage(newMessage, id));
			socket.emit('edit', channelId);
		}
		setMessageEditor(!messageEditor);
	};

	const EditMessage = ({ func }) => {
		const [value, setValue] = useState(message.messageText);
		const keyPress = (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				func(value, message.id);
			}
		};
		return (
			<div className="editMessageInputDiv">
				<textarea
					maxLength="140"
					onChange={(e) => setValue(e.target.value)}
					onKeyPress={keyPress}
					value={value}
					className="messageInputTextarea"
				>
					{message.messageText}
				</textarea>
			</div>
		);
	};

	if (message.messageImg) messageImg = message.messageImg;

	return (
		<>
			<div className="chatComponentDiv" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
				<div className="post">
					<img src={user?.avatar} className="avatar" onClick={closeCard} />
					<div className="postMessage">
						<div className="postInfo">
							<div className="messageOrigin" onClick={closeCard}>
								{user?.username}
							</div>
							<div className="messageTime">
								{message.createdAt === message.updatedAt && <p>{message.updatedAt}</p>}
								{message.createdAt !== message.updatedAt && <p>edited at {message.updatedAt}</p>}
								{card && <UserCard user={user} closeCard={closeCard} height={height} />}
							</div>
							{user?.id === currentUserId && hover && (
								<div className="editMessage">
									<div className="deleteMessageButton" onClick={() => deleteMessage(message.id)}>
										<i className="fas fa-trash-alt" />
									</div>
									<div className="editMessageButton" onClick={() => editMessage()}>
										<i className="fas fa-edit" />
									</div>
								</div>
							)}
						</div>
						{!messageEditor && (
							<>
								<div className="messageText">
									<p>{message.messageText}</p>
								</div>
								<div className="messageImgDiv">
									{messageImg && (
										<>
											<div className="divImage" onClick={() => setOpen(!open)}>
												<img src={messageImg} className="messageImg" />
											</div>
										</>
									)}
								</div>
							</>
						)}
						{messageEditor && <EditMessage func={editMessage} />}
					</div>
				</div>
			</div>
			{open && (
				<>
					<div className="modal">
						<div className="modal-background" onClick={() => setOpen(!open)} />
						<img src={messageImg} className="modal-content" />
					</div>
				</>
			)}
		</>
	);
};

export default ChatComponent;
