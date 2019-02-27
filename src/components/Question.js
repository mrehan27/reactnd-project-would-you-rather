import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as Constants from '../utils/Constants';
import UnansweredQuestion from './UnansweredQuestion';
import AnsweredQuestion from './AnsweredQuestion';

function Question(props) {
    const { question, answer } = props;
    if (question === null) {
        return (
            <div className='page-not-found'>
                <h1 className='page-not-found-head'>Question Not Found</h1>
                <p className='page-not-found-body'>The question you are looking for does not exist or have been deleted.</p>
                <Link
                    className='button-outlined'
                    to={Constants.PATH_TO_DASHBOARD}
                >
                    Go to Dashboard
                </Link>
            </div>
        );
    } else if (answer === null) {
        return <UnansweredQuestion
            id={question.id}
        />;
    } else {
        return <AnsweredQuestion
            id={question.id}
            answer={answer}
        />;
    }
}

function mapStateToProps({ authenticatedUser, users, questions }, props) {
    const { id } = props.match.params;
    let question = questions[id];
    let answer = question ? question[users[authenticatedUser].answers[question.id]] : null;
    return {
        authenticatedUser,
        question: question ? question : null,
        answer: answer ? answer : null,
        author: question ? users[question.author] : null,
    };
}

export default withRouter(connect(mapStateToProps)(Question));
