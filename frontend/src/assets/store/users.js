const SET_USER = 'users/setUser';
const REMOVE_USER = 'users/removeUser';

const setUser = (users) => ({
	type: SET_USER,
	users,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

export const getUsers = () => async (dispatch) => {
	const res = await fetch('/api/users');
	const data = await res.json();
	dispatch(setUser(data.users));
	return res;
};

export const deleteUser = () => async (dispatch) => {
	const res = await fetch('/api/users', {
		method: 'DELETE',
	});
	dispatch(removeUser());
	return res;
};

function reducer(state = {}, action) {
	let newState;
	switch (action.type) {
		case SET_USER:
			newState = {};
			action.users.forEach((item) => {
				newState[item.id] = item;
			});
			return newState;
		case REMOVE_USER:
			return { ...state, users: null };
		default:
			return state;
	}
}

export default reducer;
