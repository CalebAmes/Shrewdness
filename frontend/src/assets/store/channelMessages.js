const SET_MESSAGE = "channelMessage/setMessage";
const ADD_MESSAGE = "channelMessage/addMessage";
const REMOVE_MESSAGE = "channelMessage/removeMessage";

const setMessage = channelMessage => ({
  type: SET_MESSAGE,
  channelMessage
});

const addMessage = channelMessage => ({
  type: ADD_MESSAGE,
  channelMessage
});

const removeMessage = () => ({
  type: REMOVE_MESSAGE
});

export const getChannelMessages = () => async dispatch => {
  const res = await fetch("/api/channelMessages/");
  const data = await res.json();
  dispatch(setMessage(data.channelMessage));
  return res;
};

export const updateChannelMessage = (newMessage, id) => async dispatch => {
  const res = await fetch(`/api/channelMessages/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      messageText: newMessage
    })
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addMessage(data.channelMessage));
    return data;
  }
};

export const deleteChannelMessage = channelMessageId => async dispatch => {
  const res = await fetch(`/api/channelMessages/${channelMessageId}/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: channelMessageId
    })
  });
  await dispatch(removeMessage());
  return res;
};

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case ADD_MESSAGE:
      return { ...state, channelMessage: action.payload };
    case SET_MESSAGE:
      newState = {};
      action.channelMessage.forEach(item => {
        newState[item.id] = item;
      });
      return newState;
    case REMOVE_MESSAGE:
      return { ...state, channelMessage: null };
    default:
      return state;
  }
}

export default reducer;
