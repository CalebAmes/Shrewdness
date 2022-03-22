const SET_MESSAGE = "directMessage/setMessage";
const ADD_MESSAGE = "directMessage/addMessage";
const REMOVE_MESSAGE = "directMessage/removeMessage";

const setMessage = directMessage => ({
  type: SET_MESSAGE,
  directMessage
});

const addMessage = directMessage => ({
  type: ADD_MESSAGE,
  directMessage
});

const removeMessage = () => ({
  type: REMOVE_MESSAGE
});

export const getDirectMessages = () => async dispatch => {
  const res = await fetch("/api/directMessages");
  const data = await res.json();
  dispatch(setMessage(data.directMessage));
  return res;
};

export const createDirectMessage = directMessage => async dispatch => {
  const { userOneId, userTwoId, messageText, messageImg } = directMessage;
  const res = await fetch("/api/directMessages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userOneId,
      userTwoId,
      messageText,
      messageImg
    })
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addMessage(data.directMessage));
    return data;
  }
};

export const deleteDirectMessage = () => async dispatch => {
  const res = await fetch("/api/directMessages", {
    method: "DELETE"
  });
  dispatch(removeMessage());
  return res;
};

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case ADD_MESSAGE:
      newState = { ...state };
      newState["directMessage"] = action.directMessage;
      return newState;
    case SET_MESSAGE:
      newState = {};
      action.directMessage.forEach(item => {
        newState[item.id] = item;
      });
      return newState;
    case REMOVE_MESSAGE:
      return { ...state, directMessage: null };
    default:
      return state;
  }
}

export default reducer;
