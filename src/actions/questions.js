import { showLoading, hideLoading } from 'react-redux-loading';
import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ANSWER_TO_QUESTION = 'ANSWER_TO_QUESTION';

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    };
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        dispatch(showLoading());
        const { authenticatedUser } = getState();
        return _saveQuestion({
            author: authenticatedUser,
            optionOneText,
            optionTwoText,
        })
            .then((question) => dispatch(addQuestion(question)))
            .catch((ex) => {
                console.warn('Error in handleAddQuestion: ', ex);
                alert('There was an error adding your question. Please try again!');
            })
            .finally(() => dispatch(hideLoading()));
    };
}

function answerToQuestion(uid, qid, answer) {
    return {
        type: ANSWER_TO_QUESTION,
        uid,
        qid,
        answer,
    };
}

export function handleAnswerToQuestion(qid, answer) {
    return (dispatch, getState) => {
        dispatch(showLoading());
        const authedUser = getState().authenticatedUser;
        return _saveQuestionAnswer({ authedUser, qid, answer })
            .then(() => dispatch(answerToQuestion(authedUser, qid, answer)))
            .catch((ex) => {
                console.warn('Error in handleAnswerToQuestion: ', ex);
                alert('There was an error saving your answer. Please try again!');
            })
            .finally(() => dispatch(hideLoading()));
    };
}
