import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
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
  
  //TODO: add an api route to get just the current channels messages from the redux store to you don't have to store all of them
  const rawMessages = Object.values(channelMessagesObj);
  const msgs = rawMessages.filter(message => message.channelId == id);
  
  useEffect(() => {
    dispatch(getGroup());
    dispatch(getChannel());
    dispatch(getChannelMessages())
    setIsLoaded(true);
    // socket.emit('join_channel', format(channel, user))
    socket.on(`chat_message_${id}`, async (msg) => {
      await dispatch(getChannelMessages());
      scroll()
    })
    socket.on(`join_channel_res_${id}`, (msg) => {socketRes(msg)})
    scroll()
  }, [id]);
  
  const socketRes = (msg) => {
    console.log('socketRes')
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
      return height
    }
  }

  return (
    <>{ isLoaded && user &&
      <>
        
        <div className='chatMessages' onClick={ scrollValue }>
          {msgs.map((msg) => (

            <ChatComponent key={msg.id} message={msg} users={users} scrollValue={ scrollValue } currentUserId={user.id} />
          ))}
          <div>{hello}</div>
          <div id='messagePad'> </div>
        </div>
        <MessageInput user={user} channelId={id} channelName={channel?.name} />
      </>
    }{
      !user && 
      <Redirect to='/' />
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
    const scroll = await scrollValue();
    setHeight(scroll);
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
        <div className="modal">
        <div className="modal-background" onClick={() => setOpen(!open)} />
          <img src={messageImg} className="modal-content"/>
        </div>
      </>
      }
    </>
  )

}

export function UserCard ({ user, closeCard, height }) {
  console.log(height)
  const styles = { 
    transform: `translateY(-${height}px)` 
};
  return (
    <>
      <div className='cardBackground' onClick={ closeCard }></div>
      <div className='userCard' style={styles}>
        <div className='topCard'>
          <img src={ user.avatar } className='cardImg'/>
          <h2 className='cardText'>{ user.username }</h2>
        </div>
        <div className='bottomCard'>
          <div className='bioDiv'>
            <h1>Biography:</h1>
            <h2 className='bio'>{ user.bio }</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatRoom
