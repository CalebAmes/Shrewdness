import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGroup } from '../../store/groups';
import { getChannel } from '../../store/channels';
import { getUsers } from '../../store/users';
import { getChannelMessages } from '../../store/channelMessages';
import ChatComponent from '../../components/ChatComponent';
import MessageInput from '../../components/MessageInput';
import socket from '../../services/socket';
import { autoComplete, seedAutoComplete } from '../../services/autoComplete';
import '../../components/UserCard/UserCard.scss';
import './ChatRoom.scss';

// this is for the electron version of this application
// import { ipcRenderer } from 'electron';

const ChatRoom = () => {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const channelsObj = useSelector((state) => state.channels);
	const channelMessagesObj = useSelector((state) => state.channelMessages);
	const users = useSelector((state) => state.users);
	const user = useSelector((state) => state.session.user);
	const { id } = useParams();
	const currentChannelId = parseInt(id, 10);
	const channel = channelsObj[currentChannelId];

	const rawMessages = Object.values(channelMessagesObj);
	const msgs = rawMessages?.filter((message) => message?.channelId === currentChannelId);

	useEffect(() => {
		dispatch(getGroup());
		dispatch(getChannel());
		dispatch(getChannelMessages());
		dispatch(getUsers());
		setIsLoaded(true);
		
		seedAutoComplete();
		
		socket.on(`chat_message_${id}`, async () => {
			await dispatch(getChannelMessages());
			
			// this is for the electron version of this application
			// ipcRenderer.send('notify', msg);
			
			scroll();
		});
		
		socket.on(`edit_channel_${id}`, async () => {
			await dispatch(getChannelMessages());
		});
		
		scroll();
	}, [id, dispatch]);

	const scroll = () => {
		const messagePad = document.getElementById('messagePad');
		messagePad?.scrollIntoView({ behavior: 'smooth' });
	};

	const scrollValue = () => {
		if (document.querySelector('.chatMessages')) {
			const div = document.querySelector('.chatMessages');
			const height = div.scrollTop;
			return height;
		}
	};

	return (
		<>
			{isLoaded && user && (
				<>
					<div className="chatMessages" onClick={scrollValue}>
						<div className="messagePad"></div>
						{msgs.map((msg) => (
							<ChatComponent
								key={msg.id}
								channelId={id}
								message={msg}
								users={users}
								scrollValue={scrollValue}
								currentUserId={user.id}
							/>
						))}
						<div id="messagePad" className="messagePad"></div>
					</div>
					<MessageInput user={user} channelId={id} channelName={channel?.name} autoComplete={autoComplete} />
				</>
			)}
			{!user && <Redirect to="/" />}
		</>
	);
};

export default ChatRoom;
