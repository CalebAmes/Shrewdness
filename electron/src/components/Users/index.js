import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import MessageInput from '../MessageInput'
import socket from '../../service/socket'
import './users.scss';

const Users = () => {
  const dispatch = useDispatch();
  const usersList = useSelector(state => state.users);
  const user = useSelector(state => state.session.user);
  const users = Object.values(usersList);
  
  // const chatMessagesList = document.querySelector('.chatMessages')
  useEffect(() => {
    socket.emit('join_channel')
    socket.on('message', msg => addMessage(msg))
  }, [])
  
  // const addMessage = (msg) => {
  //   // console.log(msg)
  //   const el = document.createElement('li');
  //   el.innerHTML = msg;
  //   document.querySelector('.chatMessagesList').appendChild(el);
  //   // make the page scroll down when you get a message
  //   // chatMessagesList.scrollTop = chatMessagesList.scrollHeight;
  // }


  return (
    <>
    <h1>These are our users testing testing</h1>
    <div className='usersDiv'>
      <ul id='chatList'>
        { users.map(user => (
          <li key={user?.id} >{user?.username}</li>
        ))}
      </ul>
    </div>
    <MessageInput userId={user?.id} channelId={2} />
    <div className='chatMessages'>
      <ul className='chatMessagesList'>
      </ul>
    </div>
    <Link to='/chatRoom/3'>click me.</Link>
    </>
  )
}

export default Users