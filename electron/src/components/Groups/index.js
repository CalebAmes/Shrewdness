import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroup } from '../../store/groups'
import { getChannel } from '../../store/channels'
import { io } from 'socket.io-client';
import './groups.scss'

const Groups = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const groupsObj = useSelector(state => state.groups);
  const channelsObj = useSelector(state => state.channels);

  const groups = Object.values(groupsObj);
  const channels = Object.values(channelsObj)

  useEffect(() => {
    dispatch(getGroup());
    dispatch(getChannel());
    setIsLoaded(true);
  }, [dispatch]);

  return (
    <>
      { isLoaded &&
        <>
          <h1>This is the groups page</h1>
          {
            groups.map(group => (
              <>
                <h3>{ group.name }</h3>
                <ul>
                  {
                    channels.filter(channel => channel.groupId == group.id).map(channel => (
                      <li>{ channel.name }</li>
                    ))
                  }
                </ul>
              </>
            ))
          }
        </>
      }
    </>
  )
}

export default Groups