import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { showLoading, hideLoading } from 'react-redux-loading';
import { _getUsers, _getQuestions } from '../utils/_DATA';

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        return Promise.all([
            _getUsers(),
            _getQuestions(),
        ])
            .then(([users, questions]) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
            })
            .finally(() => dispatch(hideLoading()));
    };
}
