import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getGroup } from '../../store/groups';
import { getChannel } from '../../store/channels';
import { getChannelMessages } from '../../store/channelMessages'
import MessageInput from '../MessageInput';
import socket from '../../service/socket';
import './ChatRoom.scss';


const ChatRoom = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const channelsObj = useSelector(state => state.channels);
  const channelMessagesObj = useSelector(state => state.channelMessages);
  const users = useSelector(state => state.users);
  const user = useSelector(state => state.session.user);
  const { id } = useParams();
  const channelId = id
  const channel = channelsObj[channelId];
  
  //TODO: add an api route to get just the current channels messages from the redux store to you don't have to store all of them
  const rawMessages = Object.values(channelMessagesObj);
  const msgs = rawMessages.filter(message => message.channelId == id);
  const channels = Object.values(channelsObj);

  const format = (channel, user) => {
    return {
      channel, user,
    }
  }

  useEffect(() => {
    dispatch(getGroup());
    dispatch(getChannel());
    dispatch(getChannelMessages())
    setIsLoaded(true);
    socket.on(`join_channel_res_${id}`, (msg) => socketRes(msg))
    socket.on(`chat_message_${id}`, (msg) => {newMessage(msg)})
    socket.emit('join_channel', format(channel, user))
    
  }, [dispatch]);

  const newMessage = (msg) => {
    document.querySelector('.chatMessages')
      .appendChild(<ChatComponent message={msg} users={users} currentUserId={user?.id} />)
  }

  const socketRes = (msg) => {
    const el = document.createElement('p');
    el.innerHTML = msg;
    document.querySelector('.chatMessages').appendChild(el);
    // make the page scroll down when you get a message
    // chatMessagesList.scrollTop = chatMessagesList.scrollHeight;
  }

  return (
    <>{ isLoaded && user &&
      <>
        <h1>Welcome to chat room {id}</h1>
        <div className='chatMessages'>
          {msgs.map((msg) => (
            <ChatComponent message={msg} users={users} currentUserId={user.id} />
          ))}
        </div>
        <MessageInput userId={user?.id} channelId={id} />
      </>
    }{
      !user && 
      <h1>Please log in to join a chat room</h1>
    }
    </>
  )
}

export function ChatComponent ({ message, users, currentUserId }) {
  
  return (
    <>
      <div className='chatComponentDiv'>
        <div className='message'>
          { message.messageText }
        </div>
        <div className='messageTime'>
          { message.updatedAt }
        </div>
        <div className='messageOrigin'>
          { users[currentUserId]?.username }
        </div>
      </div>
    </>
  )

}

export default ChatRoom