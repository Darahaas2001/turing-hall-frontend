import { combineReducers } from 'redux';
import { actions } from '../Interface';
const getChat = (state = [], action: actions) => {
	if (action.type === 'ADD_CHAT') {
		return [...state, action.payload];
	}
	return state;
};

const user = (state = {}, action: actions) => {
	if (action.type === 'USER_DATA') {
		return action.payload;
	}
	return state;
};

export default combineReducers({
	getChat,
	user,
});
