import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Users = () => {
  const dispatch = useDispatch();
  const usersList = useSelector(state => state.users)

  const users = Object.values(usersList)
  console.log(usersList)
  console.log(users)

  return (
    <>
    <h1>These are our users</h1>
    <div className='usersDiv'>
      <ul>
        { users.map(user => (
          <li>{user?.username}</li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default Users