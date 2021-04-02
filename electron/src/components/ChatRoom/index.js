import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getGroup } from '../../store/groups';
import { getChannel } from '../../store/channels';
import MessageInput from '../MessageInput';
import socket from '../../service/socket';
import './ChatRoom.scss';


const ChatRoom = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const channelsObj = useSelector(state => state.channels);
  const user = useSelector(state => state.session.user);
  const { id } = useParams();
  const channel = channelsObj?.id;

  useEffect(() => {
    dispatch(getGroup());
    dispatch(getChannel());
    setIsLoaded(true);
    socket.emit('join_channel', {channel, user})
    // socket.on(`message`, msg => addMessage(msg))
    socket.on(`message${id}`, msg => addMessage(msg))
  }, [dispatch]);
  
  const addMessage = (msg) => {
    const el = document.createElement('li');
    el.innerHTML = msg;
    document.querySelector('.chatMessagesList').appendChild(el);
    // make the page scroll down when you get a message
    // chatMessagesList.scrollTop = chatMessagesList.scrollHeight;
  }

  return (
    <>
      <h1>Welcome to chat room {id}</h1>
      <div className='chatMessages'>
      <ul className='chatMessagesList'>
      </ul>
      </div>
      <MessageInput userId={user?.id} channelId={id} />
    </>
  )
}

export default ChatRoom