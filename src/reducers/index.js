import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import users from './users';
import questions from './questions';
import authenticatedUser from './authenticatedUser';

export default combineReducers({
    users,
    questions,
    authenticatedUser,
    loadingBar: loadingBarReducer,
});
