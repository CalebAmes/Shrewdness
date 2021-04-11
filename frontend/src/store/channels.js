const SET_CHANNEL = 'channel/setChannel';
const ADD_CHANNEL = 'channel/addChannel';
const REMOVE_CHANNEL = 'channel/removeChannel';

const setChannel = (channel) => ({
  type: SET_CHANNEL,
  channel,
})

const addChannel = (channel) => ({
  type: ADD_CHANNEL,
  channel,
})

const removeChannel = () => ({
  type: REMOVE_CHANNEL,
})

export const getChannel = () => async (dispatch) => {
  const res = await fetch('/api/channels/');
  const data = await res.json();
  dispatch(setChannel(data.channel));
  return res;
}

export const createChannel = (channel) => async (dispatch) => {
  const { name, groupId, } = channel;
  const res = await fetch ('/api/channels/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name,
      groupId,
    })
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addChannel(data.channel));
    return data;
  }
}

export const deleteChannel = () => async (dispatch) => {
  const res = await fetch ('/api/channels/', {
    method: 'DELETE',
  });
  dispatch(removeChannel());
  return res;
}

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case ADD_CHANNEL:
      newState = { ...state };
      newState['channel'] = action.channel;
      return newState;
    case SET_CHANNEL:
      newState = {};
      action.channel.forEach(item => {
        newState[item.id] = item;
      });
      return newState;
    case REMOVE_CHANNEL:
      return { ...state, channel: null };
    default: return state;
  }
}

export default reducer