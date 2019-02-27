import { RECEIVE_USERS } from '../actions/users';
import { ADD_QUESTION, ANSWER_TO_QUESTION } from '../actions/questions';

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return action.users;

        case ADD_QUESTION:
            return {
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions: [
                        ...state[action.question.author].questions,
                        action.question.id,
                    ],
                },
            };

        case ANSWER_TO_QUESTION:
            const user = state[action.uid];
            return {
                ...state,
                [action.uid]: {
                    ...user,
                    'answers': {
                        ...user.answers,
                        [action.qid]: action.answer,
                    },
                },
            };

        default:
            return state;
    }
}
