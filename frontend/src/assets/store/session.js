import { csrfFetch } from './csrf.js';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

export const restoreUser = () => async (dispatch) => {
	const response = await csrfFetch('/api/session');
	const data = await response.json();
	dispatch(setUser(data.user));
	return data;
};

export const login = (user) => async (dispatch) => {
	const { credential, password } = user;
	const response = await csrfFetch('/api/session', {
		method: 'POST',
		body: JSON.stringify({
			credential,
			password,
		}),
	});
	const data = await response.json();
	dispatch(setUser(data.user));
	return data;
};

export const signup = (user) => async (dispatch) => {
	const { username, email, password, bio, avatar } = user;
	user = {
		credential: username,
		password: password,
	};
	const formData = new FormData();
	formData.append('username', username);
	formData.append('email', email);
	formData.append('bio', bio);
	formData.append('password', password);

	if (avatar) formData.append('avatar', avatar);

	const res = await csrfFetch('/api/users', {
		method: 'POST',
		headers: { 'Content-Type': 'multipart/form-data' },
		body: formData,
	});

	const data = await res.json();
	dispatch(login(user));
	return data;
};

export const logout = () => async (dispatch) => {
	const response = await csrfFetch('/api/session', {
		method: 'DELETE',
	});
	dispatch(removeUser());
	return response;
};

const initialState = { user: null };

function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			newState = Object.assign({}, state, { user: null });
			return newState;
		default:
			return state;
	}
}

export default reducer;
