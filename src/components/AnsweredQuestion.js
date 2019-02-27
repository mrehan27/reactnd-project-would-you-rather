import React from 'react';
import { connect } from 'react-redux';

function AnsweredQuestion(props) {
    const { author, question, answer } = props;
    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
    const options = [question.optionOne, question.optionTwo];
    return (
        <div className='section-outlined-round-corners container-width-small'>
            <div className='section-head text-align-start'>
                <h5 className='section-text-head'>{author.name} asks</h5>
            </div>
            <div className='section-body question-details'>
                <img
                    src={author.avatarURL}
                    alt={`Avatar of ${author.name}`}
                    className='question-details-user-avatar' />
                <span className='list-item-divider-vertical answered-question-divider-vertical' />
                <div className='question-summary'>
                    <h3 className='section-text-head'>Results</h3>
                    {options.map((option) =>
                        <OptionsWithResults
                            key={option.text}
                            text={option.text}
                            votes={option.votes.length}
                            totalVotes={totalVotes}
                            answer={answer}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

function OptionsWithResults(props) {
    const { text, votes, totalVotes, answer } = props;
    // Calculate results
    const weightage = parseFloat(Math.round((votes / totalVotes) * 100)).toFixed(2);
    const flex = weightage / 100;
    return (
        <div className='question-option-votes-summary'>
            {text === answer.text && (
                <div className='question-user-selected-answer' />
            )}
            <div className='section-component section-outlined-round-corners question-option-votes'>
                <span>Would you rather {text}?</span>
                <div className='question-option-votes-percentage'>
                    <span><span style={{ flex: flex }} /></span>
                    <p style={{ flex: flex }}>{weightage}%</p>
                </div>
                <b>{votes} out of {totalVotes} votes</b>
            </div>
        </div>
    );
}

function mapStateToProps({ authenticatedUser, users, questions }, { id, answer }) {
    let question = questions[id];
    return {
        authenticatedUser,
        question,
        answer,
        author: users[question.author],
    };
}

export default connect(mapStateToProps)(AnsweredQuestion);
