import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as Constants from '../utils/Constants';
import { isUserAuthenticated } from '../utils/Helpers';
import ListItemUnansweredQuestion from './ListItemUnansweredQuestion';
import ListItemAnsweredQuestion from './ListItemAnsweredQuestion';

function Dashboard(props) {
    // If user not authenticated, redirect it to authentication component
    if (!props.isAuthenticated) {
        return <Redirect to={
            {
                pathname: Constants.PATH_TO_SIGN_IN,
            }
        } />
    }
    const { showAnsweredQuestions, answeredQuestions, unansweredQuestions } = props;
    const activeTabClass = 'button-colored';
    const inactiveTabClass = 'button-outlined';
    return (
        <div className='dashboard-container container-width-medium'>
            <div className='dashboard-questions-tab-container'>
                <Link
                    className={`${showAnsweredQuestions ? inactiveTabClass : activeTabClass} dashboard-questions-tab dashboard-questions-tab-first`}
                    to={Constants.PATH_TO_UNANSWERED_QUESTIONS}
                >
                    Unanswered Questions
                    </Link>
                <Link
                    className={`${showAnsweredQuestions ? activeTabClass : inactiveTabClass} dashboard-questions-tab dashboard-questions-tab-last`}
                    to={Constants.PATH_TO_ANSWERED_QUESTIONS}
                >
                    Answered Questions
                    </Link>
            </div>
            <div className='section-outlined-round-corners dashboard-questions-list'>
                {
                    showAnsweredQuestions
                        ? <AnsweredQuestions questions={answeredQuestions} />
                        : <UnAnsweredQuestions questions={unansweredQuestions} />
                }
            </div>
        </div>
    );
}

function UnAnsweredQuestions({ questions }) {
    if (questions.length === 0) {
        return (
            <div className='dashboard-empty-list'>
                <h3 className='dashboard-empty-list-head'>Congratulations</h3>
                <p className='dashboard-empty-list-body'>You have answered all questions.</p>
                <Link
                    className='button-outlined'
                    to={Constants.PATH_TO_ANSWERED_QUESTIONS}
                >
                    View Answered Questions
                </Link>
            </div>
        );
    } else {
        return questions.map((question) =>
            <ListItemUnansweredQuestion
                key={question.id}
                id={question.id}
            />
        );
    }
}

function AnsweredQuestions({ questions }) {
    if (questions.length === 0) {
        return (
            <div className='dashboard-empty-list'>
                <h3 className='dashboard-empty-list-head'>Oops</h3>
                <p className='dashboard-empty-list-body'>You have not answered any question.</p>
                <Link
                    className='button-outlined'
                    to={Constants.PATH_TO_UNANSWERED_QUESTIONS}
                >
                    See Questions
                </Link>
            </div>
        );
    } else {
        return questions.map((question) =>
            <ListItemAnsweredQuestion
                key={question.id}
                id={question.id}
            />
        );
    }
}

function mapStateToProps({ authenticatedUser, users, questions }, props) {
    const isAuthenticated = isUserAuthenticated(authenticatedUser);
    // Check for user authentication
    if (!isAuthenticated) {
        return {
            isAuthenticated,
        };
    } else {
        let answeredQuestions = Object.keys(users[authenticatedUser].answers);
        let unansweredQuestions = Object.keys(questions).filter((id) => !answeredQuestions.includes(id));
        return {
            isAuthenticated,
            showAnsweredQuestions: props.location.search.includes(Constants.PATH_TO_ANSWERED_QUESTIONS_PARAMS),
            answeredQuestions: answeredQuestions.map((id) => questions[id]).sort((a, b) => b.timestamp - a.timestamp),
            unansweredQuestions: unansweredQuestions.map((id) => questions[id]).sort((a, b) => b.timestamp - a.timestamp),
        };
    }
}

export default connect(mapStateToProps)(Dashboard);
