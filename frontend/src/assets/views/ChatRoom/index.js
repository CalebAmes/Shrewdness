import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGroup } from "../../store/groups";
import { getChannel } from "../../store/channels";
import { getUsers } from "../../store/users";
import { getChannelMessages } from "../../store/channelMessages";
import ChatComponent from "../../components/ChatComponent";
import MessageInput from "../../components/MessageInput";
import socket from "../../services/socket";
import { autoComplete, seedAutoComplete } from "../../services/autoComplete";
import "../../components/UserCard/UserCard.scss";
import "./ChatRoom.scss";

// this is for the electron version of this application
// import { ipcRenderer } from 'electron';

const ChatRoom = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const channelsObj = useSelector(state => state.channels);
  const channelMessagesObj = useSelector(state => state.channelMessages);
  const users = useSelector(state => state.users);
  const user = useSelector(state => state.session.user);
  const { id } = useParams();
  const currentChannelId = parseInt(id, 10);
  const channel = channelsObj[currentChannelId];
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  const rawMessages = Object.values(channelMessagesObj);
  const msgs = rawMessages?.filter(
    message => message?.channelId === currentChannelId
  );

  const scroll = () => {
    if (scrollRef.current?.firstChild) {
      scrollRef.current.firstChild.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollValue = () => {
    if (document.querySelector(".chatMessages")) {
      const div = document.querySelector(".chatMessages");
      const height = div.scrollTop;
      return height;
    }
  };

  useEffect(
    () => {
      dispatch(getGroup());
      dispatch(getChannel());
      dispatch(getUsers());

      const fetchMessages = async id => {
        const data = await fetch(`/api/channelMessages/${id}`)
          .then(res => res.json())
          .catch(err => console.error(err));
        return data.channelMessage;
      };

      fetchMessages(id)
        .then(res => {
          setMessages(res);
        })
        .then(() => setIsLoaded(true))
        .then(() => scroll());

      seedAutoComplete();

      socket.on(`chat_message_${id}`, async msg => {
        await fetchMessages(id).then(res => {
          setMessages(res);
        });
        if (user.id === msg.userId) {
          scroll();
        }

        // this is for the electron version of this application
        // ipcRenderer.send('notify', msg);
      });

      socket.on(`edit_channel_${id}`, async () => {
        await fetchMessages(id).then(res => {
          setMessages(res);
        });
      });
    },
    [id, dispatch]
  );

  useEffect(
    () => {
      scroll();
    },
    [isLoaded, id]
  );

  return (
    <>
      {isLoaded &&
        user && (
          <div className="chatPage">
            <div className="messageContainer" ref={scrollRef}>
              {messages.map(msg => (
                <ChatComponent
                  key={msg.id}
                  channelId={id}
                  message={msg}
                  users={users}
                  scrollValue={scrollValue}
                  currentUserId={user.id}
                />
              ))}
            </div>
            <MessageInput
              user={user}
              channelId={id}
              channelName={channel?.name}
              autoComplete={autoComplete}
            />
          </div>
        )}
      {!user && <Redirect to="/" />}
    </>
  );
};

export default ChatRoom;
