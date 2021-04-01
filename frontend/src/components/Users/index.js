import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';


const Users = () => {
  const dispatch = useDispatch();
  const usersList = useSelector(state => state.users)
  const socket = io()

  const users = Object.values(usersList)

  socket.on('message', message => {
    console.log(message)
  })


  return (
    <>
    <h1>These are our users testing testing</h1>
    <div className='usersDiv'>
      <ul>
        { users.map(user => (
          <li key={user?.id} >{user?.username}</li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default Users