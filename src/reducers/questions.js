import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_TO_QUESTION } from '../actions/questions';

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return action.questions;

        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question,
            };

        case ANSWER_TO_QUESTION:
            const question = state[action.qid];
            const option = question[action.answer];
            return {
                ...state,
                [action.qid]: {
                    ...question,
                    [action.answer]: {
                        ...option,
                        'votes': option.votes.concat(action.uid),
                    },
                },
            };

        default:
            return state;
    }
}
