const SET_USER_GROUP = 'userGroups/setUserGroup';
const ADD_USER_GROUP = 'userGroups/addUserGroup';
const REMOVE_USER_GROUP = 'userGroups/removeUserGroup';

const setUserGroup = (userGroup) => ({
  type: SET_USER_GROUP,
  userGroup,
})

const addUserGroup = (userGroup) => ({
  type: ADD_USER_GROUP,
  userGroup,
})

const removeUserGroup = () => ({
  type: REMOVE_USER_GROUP,
})

export const getUserGroup = () => async (dispatch) => {
  const res = await fetch('/api/userGroups');
  const data = await res.json();
  dispatch(setUserGroup(data));
  return res;
}

export const createUserGroup = ( userGroups ) => async (dispatch) => {
  const { userId, groupId, } = userGroups;
  const res = await fetch ('/api/userGroups', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      userId, groupId,
    })
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addUserGroup(data.userGroup));
    return data;
  }
}

export const deleteUserGroup = () => async (dispatch) => {
  const res = await fetch ('/api/userGroups', {
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
      newState['userGroup'] = action;
      return newState;
    case SET_USER_GROUP:
      newState = action.userGroup;
      return newState.userGroup;
    case REMOVE_USER_GROUP:
      return { ...state, userGroup: null };
    default: return state;
  }
}

export default reducer
