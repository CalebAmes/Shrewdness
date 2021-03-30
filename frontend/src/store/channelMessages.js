const SET_MESSAGE = 'channelMessage/setMessage';
const ADD_MESSAGE = 'channelMessage/addMessage';
const REMOVE_MESSAGE = 'channelMessage/removeMessage';

const setMessage = (message) => ({
  type: SET_MESSAGE,
  message,
})

const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message,
})

const removeMessage = (message) => ({
  type: REMOVE_MESSAGE,
  message,
})

export const getChannelMessages = () => async (dispatch) => {
  const res = await fetch('/api/channel-messages');
  const data = await res.json();
  dispatch(setMessage(data.message));
  return res;
}

export const createChannelMessage = () => async (dispatch) => {
  const { channelId, userId, messageText, messageImg } = message;
  const res = await fetch ('/api/channel-messages', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      channelId,
      userId,
      messageText,
      messageImg,
    })
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addMessage(data.message));
    return data;
  }
}

export const deleteChannelMessage = () => async (dispatch) => {
  const res = await fetch ('/api/channel-messages', {
    method: 'DELETE',
  });
  dispatch(removeMessage());
  return res;
}

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case ADD_MESSAGE:
      newState = { ...state };
      newState['message'] = action.message;
      return newState;
    case SET_MESSAGE:
      newState = {};
      action.message.forEach(item => {
        newState[item.id] = item;
      });
      return newState;
    case REMOVE_MESSAGE:
      return { ...state, message: null };
    default: return state;
  }
}

export default reducer