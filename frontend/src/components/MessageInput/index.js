import React, { useState } from 'react';
import socket from '../../service/socket'
import './message.scss';

const MessageInput = ({ user, channelId }) => {
  const [value, setValue] = useState('');
  const userId = user?.id
  const data = { user, channelId }

  const keyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
      setValue('');
    }
    // socket.emit('is_typing', data)
    
  }

  const sendMessage = () => {
    if (value.trim() === '') return;

    const msg = {
      messageText: value.trim(),
      userId,
      channelId,
    }
    socket.emit(`chatMessage`, msg)
  }

  return (
    <div className='messageInputDiv'>
      <textarea
        onChange={e => setValue(e.target.value)}
        onKeyPress={ keyPress }
        value={ value }
        className='messageInputTextarea'
        placeholder='Type your message here...'>
      </textarea>
    </div>
  )
}

export default MessageInput