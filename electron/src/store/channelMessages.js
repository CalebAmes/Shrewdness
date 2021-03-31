const SET_MESSAGE = 'channelMessage/setMessage';
const ADD_MESSAGE = 'channelMessage/addMessage';
const REMOVE_MESSAGE = 'channelMessage/removeMessage';

const setMessage = (channelMessage) => ({
  type: SET_MESSAGE,
  channelMessage,
})

const addMessage = (channelMessage) => ({
  type: ADD_MESSAGE,
  channelMessage,
})

const removeMessage = () => ({
  type: REMOVE_MESSAGE,
})

export const getChannelMessages = () => async (dispatch) => {
  const res = await fetch('http://localhost:5000/api/channelMessages');
  const data = await res.json();
  dispatch(setMessage(data.channelMessage));
  return res;
}

export const createChannelMessage = (channelMessage) => async (dispatch) => {
  const { channelId, userId, messageText, messageImg } = channelMessage;
  const res = await fetch ('http://localhost:5000/api/channelMessages', {
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
    dispatch(addMessage(data.channelMessage));
    return data;
  }
}

export const deleteChannelMessage = () => async (dispatch) => {
  const res = await fetch ('http://localhost:5000/api/channelMessages', {
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
      newState['channelMessage'] = action.channelMessage;
      return newState;
    case SET_MESSAGE:
      newState = {};
      action.channelMessage.forEach(item => {
        newState[item.id] = item;
      });
      return newState;
    case REMOVE_MESSAGE:
      return { ...state, channelMessage: null };
    default: return state;
  }
}

export default reducer;