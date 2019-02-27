import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import * as Constants from '../utils/Constants';
import { isStoreLoading } from '../utils/Helpers';
import { isUserAuthenticated } from '../utils/Helpers';
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: '',
    }

    handleOptionChange = (optionOne, optionTwo) => {
        this.setState({
            optionOne: optionOne,
            optionTwo: optionTwo,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { dispatch } = this.props;
        dispatch(handleAddQuestion(this.state.optionOne, this.state.optionTwo))
            .then(() => {
                this.props.history.push(Constants.PATH_TO_DASHBOARD);
            });
    }

    render() {
        // If user not authenticated, redirect it to authentication component
        if (!this.props.isAuthenticated) {
            return <Redirect to={
                {
                    pathname: Constants.PATH_TO_SIGN_IN,
                }
            } />
        }
        const { optionOne, optionTwo } = this.state;
        return (
            <div className='section-outlined-round-corners container-width-medium'>
                <div className='section-head'>
                    <h2>Create New Question</h2>
                </div>
                <div className='section-body new-question-body'>
                    <span className='new-question-component new-question-summary'>You can create your own question here and ask your friends to answer</span>
                    <h3 className='new-question-component'>Would you rather ...</h3>
                    <form
                        className='section-form'
                        onSubmit={this.handleSubmit}
                    >
                        <TextInputField
                            autoFocus={true}
                            value={optionOne}
                            placeholder='Enter option one text here'
                            onChange={(event) => this.handleOptionChange(event.target.value, optionTwo)}
                        />
                        <div className='section-form-component new-question-form-component question-options-divider'>
                            <span />
                            <h3>OR</h3>
                            <span />
                        </div>
                        <TextInputField
                            value={optionTwo}
                            placeholder='Enter option two text here'
                            onChange={(event) => this.handleOptionChange(optionOne, event.target.value)}
                        />
                        <button
                            className='button-colored section-form-component new-question-form-component'
                            type='submit'
                            disabled={this.props.loading || optionOne.trim().length === 0 || optionTwo.trim().length === 0}
                        >
                            Post Question
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

function TextInputField(props) {
    return (
        <input
            className='text-input section-form-component new-question-form-component'
            autoFocus={props.autoFocus}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
        >
        </input>
    );
}

function mapStateToProps({ loadingBar, authenticatedUser }) {
    const isAuthenticated = isUserAuthenticated(authenticatedUser);
    // Check for user authentication
    if (!isAuthenticated) {
        return {
            isAuthenticated,
        };
    } else {
        return {
            isAuthenticated,
            loading: isStoreLoading(loadingBar),
        };
    }
}

export default withRouter(connect(mapStateToProps)(NewQuestion));
