const SET_USER_GROUP = 'userGroups/setUserGroup';
const ADD_USER_GROUP = 'userGroups/addUserGroup';
const REMOVE_USER_GROUP = 'userGroups/removeUserGroup';

const setUserGroup = (userGroups) => ({
  type: SET_USER_GROUP,
  userGroups,
})

const addUserGroup = (userGroups) => ({
  type: ADD_USER_GROUP,
  userGroups,
})

const removeUserGroup = (userGroups) => ({
  type: REMOVE_USER_GROUP,
  userGroups,
})

export const getUserGroup = () => async (dispatch) => {
  const res = await fetch('/api/user-group');
  const data = await res.json();
  dispatch(setUserGroup(data.userGroup));
  return res;
}

export const createUserGroup = () => async (dispatch) => {
  const {  } = userGroup;
  const res = await fetch ('/api/user-group', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({

    })
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addUserGroup(data.userGroup));
    return data;
  }
}

export const deleteUserGroup = () => async (dispatch) => {
  const res = await fetch ('/api/user-group', {
    method: 'DELETE',
  });
  dispatch(removeUserGroup());
  return res;
}

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case ADD_USER_GROUP:
      newState = { ...state };
      newState['userGroup'] = action.userGroup;
      return newState;
    case SET_USER_GROUP:
      newState = {};
      action.userGroup.forEach(item => {
        newState[item.id] = item;
      });
      return newState;
    case REMOVE_USER_GROUP:
      return { ...state, userGroup: null };
    default: return state;
  }
}

export default reducer