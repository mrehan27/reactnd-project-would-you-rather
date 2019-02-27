import { showLoading, hideLoading } from 'react-redux-loading';
import { randomIntFromInterval } from '../utils/Helpers';

export const SET_AUTHENTICATED_USER = 'SET_AUTHENTICATED_USER';

function setAuthenticatedUser(id) {
    return {
        type: SET_AUTHENTICATED_USER,
        id,
    };
}

export function handleAuthenticatedUser(id) {
    return (dispatch) => {
        let user = id;
        dispatch(showLoading());
        setTimeout(() => {
            dispatch(setAuthenticatedUser(user));
            dispatch(hideLoading());
        }, randomIntFromInterval(1000, 3000));
    };
}
