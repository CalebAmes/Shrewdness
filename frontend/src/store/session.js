import { csrFetch } from './csrf.js';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

export const login = ({ credential, password }) => async (dispatch) => {
  const res = await csrFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password })
  });
  dispatch(setUser(res.data.user));
  return res;
};

export const restoreUser = () => async (dispatch) => {
  const res = await csrFetch('/api/session');
  dispatch(setUser(res.data.user));
  return res;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password, bio, avatar } = user;
  const formData = new FormData();
  formData.append('username', username)
  formData.append('email', email)
  formData.append('bio', bio)
  formData.append('password', password)

  if (avatar) formData.append('avatar', avatar);

  const res = await csrFetch('/api/users', {
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    body: formData,
  });

  dispatch(setUser(res.data.user));
  return res;
};

export const logout = () => async (dispatch) => {
  const response = await csrFetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      newState = Object.assign({}, state, { user: null });
      return newState;
    default:
      return state;
  }
}

export default reducer;
