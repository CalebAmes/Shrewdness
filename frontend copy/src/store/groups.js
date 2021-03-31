const SET_GROUP = 'groups/setGroup';
const ADD_GROUP = 'groups/addGroup';
const REMOVE_GROUP = 'groups/removeGroup';

const setGroup = (group) => ({
  type: SET_GROUP,
  group,
})

const addGroup = (group) => ({
  type: ADD_GROUP,
  group,
})

const removeGroup = () => ({
  type: REMOVE_GROUP,
})

export const getGroup = () => async (dispatch) => {
  const res = await fetch('/api/groups');
  const data = await res.json();
  dispatch(setGroup(data.group));
  return res;
}

export const createGroup = (group) => async (dispatch) => {
  const { name, avatar, description, } = group;
  const res = await fetch ('/api/groups', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name, 
      avatar, 
      description,
    })
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(addGroup(data.group));
    return data;
  }
}

export const deleteGroup = () => async (dispatch) => {
  const res = await fetch ('/api/groups', {
    method: 'DELETE',
  });
  dispatch(removeGroup());
  return res;
}

function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case ADD_GROUP:
      newState = { ...state };
      newState['group'] = action.group;
      return newState;
    case SET_GROUP:
      newState = {};
      action.group.forEach(item => {
        newState[item.id] = item;
      });
      return newState;
    case REMOVE_GROUP:
      return { ...state, group: null };
    default: return state;
  }
}

export default reducer