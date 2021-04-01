import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import './users.scss'

const Users = () => {
  const dispatch = useDispatch();
  const usersList = useSelector(state => state.users)
  const socket = io('http://localhost:5000')

  const users = Object.values(usersList)

  const addChat = (e) => {
    e.preventDefault();
    
    //getting the message from the dom
    const msg = e.target.elements.msg.value;

    // emitting the message to the server
    socket.emit('chatMessage', msg)
  }
  const chatMessagesList = document.querySelector('.chatMessages')
  
  socket.on('message', text => {


    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('.chatMessagesList').appendChild(el);
    //make the page scroll down when you get a message
    chatMessagesList.scrollTop = chatMessagesList.scrollHeight;
  })

  return (
    <>
    <h1>These are our users testing testing</h1>
    <div className='usersDiv'>
      <ul id='chatList'>
        { users.map(user => (
          <li key={user?.id} >{user?.username}</li>
        ))}
        {/* {
          socket.on('chatMessage', () => (
            <li>{chatMessage}</li>
          ))
        } */}
      </ul>
    </div>
    <div className='chatDiv'>
      <form className='chatForm' onSubmit={addChat}>
        <textarea
          type='text'
          className='chatTextarea'
          id='msg'
          required />
        <button className='sendChat button' type='submit'>...send</button>
      </form>
    </div>
    <div className='chatMessages'>
      <ul className='chatMessagesList'>
      </ul>
    </div>
    </>
  )
}

export default Users