const SET_NOTIFICATION = 'notification/setNotification';
const ADD_NOTIFICATION = 'notification/addNotification';
const REMOVE_NOTIFICATION = 'notification/removeNotification';

const setNotification = (notification) => ({
  type: SET_NOTIFICATION,
  notification,
})

const addNotification = (notification) => ({
  type: ADD_NOTIFICATION,
  notification,
})

const removeNotification = (notification) => ({
  type: REMOVE_NOTIFICATION,
  notification,
})

export const getNotification = () => async (dispatch) => {
  const res = await fetch('/api/notifications');
  const data = await res.json();
  dispatch(setNotification(data.notification));
  return res;
}

export const createNotification = () => async (dispatch) => {
  const {  } = notification;
  const res = await fetch ('/api/notifications', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({

    })
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addNotification(data.notification));
    return data;
  }
}

export const deleteNotification = () => async (dispatch) => {
  const res = await fetch ('/api/notifications', {
    method: 'DELETE',
  });
  dispatch(removeNotification());
  return res;
}

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case ADD_NOTIFICATION:
      newState = { ...state };
      newState['notification'] = action.notification;
      return newState;
    case SET_NOTIFICATION:
      newState = {};
      action.notification.forEach(item => {
        newState[item.id] = item;
      });
      return newState;
    case REMOVE_NOTIFICATION:
      return { ...state, notification: null };
    default: return state;
  }
}

export default reducer