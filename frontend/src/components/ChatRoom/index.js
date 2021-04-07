import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getGroup } from '../../store/groups';
import { getChannel } from '../../store/channels';
import { getChannelMessages } from '../../store/channelMessages'
import MessageInput from '../MessageInput';
import socket from '../../service/socket';
import './ChatRoom.scss';
import '../UserCard/UserCard.scss';

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
      await dispatch(getChannelMessages());
      setIsLoaded(true);
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

  const socketRes = (msg) => {
    setHello(msg)
    scroll()
  }

  const scroll = () => {
    const messagePad = document.getElementById('messagePad')
    messagePad?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollValue = () => {
    if (document.querySelector('.chatMessages')){
      const div = document.querySelector('.chatMessages')
      const height = div.scrollTop
      // console.log(div)
      // console.log(height)
      return height
    }
  }

  return (
    <>{ isLoaded && user &&
      <>
        <div className='chatMessages' onClick={ scrollValue }>
          {msgs.map((msg) => (

            <ChatComponent message={msg} users={users} scrollValue={ scrollValue } currentUserId={user.id} />
          ))}
          <div id='messagePad'>{hello}</div>
        </div>
        <MessageInput user={user} channelId={id} channelName={channel.name} />
      </>
    }{
      !user && 
      <h1>Please log in to join a chat room</h1>
    }
    </>
  )
}

export function ChatComponent ({ message, users, scrollValue }) {
  const [open, setOpen] = useState(false)
  const [card, setCard] = useState(false)
  const [height, setHeight] = useState(0)
  const userId = message.userId;
  const user = users[userId]
  let messageImg;

  const closeCard = async () => {
    const div = document.querySelector('.post');
    const scroll = await scrollValue();
    setHeight(scroll);
    // console.log(height)
    setCard(!card)
  }

  if (message.messageImg) messageImg = message.messageImg;

  return (
    <>
      <div className='chatComponentDiv'>
        <div className='post'>
          <img src={user?.avatar} className='avatar' onClick={ closeCard } />
          <div className='postMessage'>
            <div className='postInfo'>
              <div className='messageOrigin' onClick={ closeCard }>
                { user?.username }
              </div>
              <div className='messageTime'>
                { message.updatedAt }
                { card && 
                  <UserCard user={ user } closeCard={ closeCard } height={ height } />
                }
              </div>
            </div>
            <div className='messageText'>
              { message.messageText }
            </div>
          <div className='messageImgDiv'>
            { messageImg &&
            <>
              
              <div className='divImage' onClick={() => setOpen(!open)}>
                <img src={messageImg} className='messageImg'/>
              </div>
            </>
            }
          </div>
          </div>
        </div>
      </div>
      { open &&
      <>
        <div class="modal">
        <div className="modal-background" onClick={() => setOpen(!open)} />
          <img src={messageImg} class="modal-content"/>
        </div>
      </>
      }
    </>
  )

}

export function UserCard ({ user, closeCard, height }) {
  console.log(height)
  const y = 100
  const styles = { 
    transform: `translateY(-${height}px)` 
};
  return (
    <div className='userCard' style={styles}>
      <div className='cardBackground' onClick={ closeCard }></div>
      <div className='topCard'>
        <img src={ user.avatar } className='cardImg'/>
        <h3>{ user.username }</h3>
      </div>
      <div className='bottomCard'></div>
    </div>
  )
}

export default ChatRoom
