const SET_MESSAGE = 'directMessage/setMessage';
const ADD_MESSAGE = 'directMessage/addMessage';
const REMOVE_MESSAGE = 'directMessage/removeMessage';

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

export const getMessage = () => async (dispatch) => {
  const res = await fetch('/api/direct-messages');
  const data = await res.json();
  dispatch(setMessage(data.message));
  return res;
}

export const createMessage = () => async (dispatch) => {
  const {  } = message;
  const res = await fetch ('/api/direct-messages', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({

    })
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addMessage(data.message));
    return data;
  }
}

export const deleteChannelMessage = () => async (dispatch) => {
  const res = await fetch ('/api/direct-messages', {
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