import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Constants from '../utils/Constants';
import { handleAnswerToQuestion } from '../actions/questions';

class UnansweredQuestion extends Component {

    state = {
        selectedOption: '',
    }

    handleOptionChange = (event) => {
        this.setState({
            selectedOption: event.target.value,
        })
    }

    onSubmitAnswer = (event) => {
        event.preventDefault();
        const { dispatch, question } = this.props;
        dispatch(handleAnswerToQuestion(question.id, this.state.selectedOption))
            .then((action) => {
                this.props.history.push(`${Constants.PATH_TO_QUESTION_PART}/${action.qid}`);
            });
    }

    render() {
        const { author, question } = this.props;
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
                    <span className='list-item-divider-vertical' />
                    <div className='question-summary'>
                        <b>Would you rather</b>
                        <form className='section-form'>
                            <span
                                className='section-form-component'
                            >
                                <input
                                    type='radio'
                                    name='answer'
                                    value='optionOne'
                                    onChange={this.handleOptionChange}
                                />{question.optionOne.text}
                            </span>
                            <span
                                className='section-form-component'
                            >
                                <input
                                    type='radio'
                                    name='answer'
                                    value='optionTwo'
                                    onChange={this.handleOptionChange}
                                />{question.optionTwo.text}
                            </span>
                            <button
                                className='button-colored section-form-component section-form-action-button'
                                disabled={this.state.selectedOption.length === 0}
                                onClick={this.onSubmitAnswer}
                            >
                                Submit
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ authenticatedUser, users, questions }, { id }) {
    let question = questions[id];
    return {
        authenticatedUser,
        question,
        author: users[question.author],
    };
}

export default withRouter(connect(mapStateToProps)(UnansweredQuestion));
