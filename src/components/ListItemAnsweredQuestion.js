import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Constants from '../utils/Constants';

function ListItemAnsweredQuestion(props) {
    const { author, question, answer } = props;
    return (
        <div className='section-outlined-round-corners question-list-item'>
            <div className='section-head text-align-start'>
                <h5 className='section-text-head'>{author.name} asks</h5>
            </div>
            <div className='section-body question-list-item-details'>
                <img
                    src={author.avatarURL}
                    alt={`Avatar of ${author.name}`}
                    className='question-list-item-user-avatar' />
                <span className='list-item-divider-vertical' />
                <div className='question-list-item-summary'>
                    <b>Would you rather</b>
                    <span className='section-component question-list-item-options'>
                        {answer.text}
                    </span>
                    <Link
                        className='button-outlined section-form-component section-form-action-button'
                        to={`${Constants.PATH_TO_QUESTION_PART}/${question.id}`}
                    >
                        View Poll
                    </Link>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps({ authenticatedUser, users, questions }, { id }) {
    let question = questions[id];
    return {
        question,
        author: users[question.author],
        answer: question[users[authenticatedUser].answers[question.id]],
    };
}

export default connect(mapStateToProps)(ListItemAnsweredQuestion);
