import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import MessageInput from '../MessageInput'
import socket from '../../service/socket'
import './ChatRoom.scss';

const ChatRoom = () => {
  // const { id } = useParams();
  // console.log(id)
  return (
    <h1>Welcome to chat room</h1>
  )
}

export default ChatRoom