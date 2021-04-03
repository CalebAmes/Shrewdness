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
  const [hello, setHello] = useState('')
  const channelsObj = useSelector(state => state.channels);
  const channelMessagesObj = useSelector(state => state.channelMessages);
  const users = useSelector(state => state.users);
  const user = useSelector(state => state.session.user);
  const { id } = useParams();
  const channelId = id
  const channel = channelsObj[channelId];
  const [value, setValue] = useState('');
  const userId = user?.id
  
  //TODO: add an api route to get just the current channels messages from the redux store to you don't have to store all of them
  const rawMessages = Object.values(channelMessagesObj);
  const msgs = rawMessages.filter(message => message.channelId == id);
  const channels = Object.values(channelsObj);

  
  useEffect(async () => {
    await dispatch(getGroup());
    await dispatch(getChannel());
    await dispatch(getChannelMessages())
    setIsLoaded(true);
    // socket.emit('join_channel', format(channel, user))
    socket.on(`chat_message_${id}`, async (msg) => {
      await dispatch(getChannelMessages())
      setIsLoaded(true);
      await dispatch(getChannelMessages())
      scroll()
    })
    socket.on(`join_channel_res_${id}`, (msg) => {socketRes(msg)})
    scroll()
  }, []);
  
  const keyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
      setValue('');
    }
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

  const MsgInput = ({ user, channelId }) => {


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





  const socketRes = (msg) => {
    setHello(msg)
    scroll()
  }

  const scroll = () => {
    const messagePad = document.getElementById('messagePad')
    messagePad?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>{ isLoaded && user &&
      <>
        <h1>Welcome to: {channel.name}</h1>
        <div className='chatMessages'>
          {msgs.map((msg) => (

            <ChatComponent message={msg} users={users} currentUserId={user.id} />
          ))}
          <div id='messagePad'>{hello}</div>
        </div>
        <MessageInput user={user} channelId={id} />
      </>
    }{
      !user && 
      <h1>Please log in to join a chat room</h1>
    }
    </>
  )
}

export function ChatComponent ({ message, users }) {
  const userId = message.userId;
  console.log(userId);
  console.log(users)
  const user = users[userId]
  console.log(user)
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
          { user?.username }
        </div>
      </div>
    </>
  )
}

export default ChatRoom
