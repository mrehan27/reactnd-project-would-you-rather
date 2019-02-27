import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FaTrophy } from 'react-icons/fa/index';
import * as Constants from '../utils/Constants';
import { isUserAuthenticated } from '../utils/Helpers';

const CATEGORY_GOLD = 0;
const CATEGORY_SILVER = 1;
const CATEGORY_BRONZE = 2;

function LeaderBoard(props) {
    // If user not authenticated, redirect it to authentication component
    if (!props.isAuthenticated) {
        return <Redirect to={
            {
                pathname: Constants.PATH_TO_SIGN_IN,
            }
        } />
    }
    const { users } = props;
    let position = 0;
    return (
        <div className='container-width-medium leaderboard-container'>
            {users.map((user) =>
                <UserSummary
                    key={user.id}
                    position={position++}
                    {...user}
                />
            )}
        </div>
    );
}

function UserSummary(props) {
    const {
        position,
        avatarURL,
        name,
        totalQuestions,
        totalAnswers,
    } = props;
    let categoryClass;
    switch (position) {
        case CATEGORY_GOLD:
            categoryClass = 'leaderboard-icon-gold';
            break;
        case CATEGORY_SILVER:
            categoryClass = 'leaderboard-icon-silver';
            break;
        case CATEGORY_BRONZE:
            categoryClass = 'leaderboard-icon-bronze';
            break;
        default:
            categoryClass = '';
    }
    return (
        <div className='leaderboard-user-container'>
            <div className='section-outlined-round-corners leaderboard-user-card-main'>
                <div className='leaderboard-cup'>
                    <FaTrophy className={`leaderboard-icon ${categoryClass}`} />
                </div>
                <div className='leaderboard-user-card'>
                    <img
                        src={avatarURL}
                        alt={`Avatar of ${name}`}
                        className='leaderboard-user-avatar' />
                    <span className='leaderboard-divider-vertical' />
                    <div className='leaderboard-user-details'>
                        <h3 className='leaderboard-user-name'>{name}</h3>
                        <span className='leaderboard-score-details-section'>
                            <span className='leaderboard-score-details-label'>Answered questions</span>
                            <span className='leaderboard-score-details-description'>{totalAnswers}</span>
                        </span>
                        <span className='leaderboard-divider-horizontal' />
                        <span className='leaderboard-score-details-section'>
                            <span className='leaderboard-score-details-label'>Created questions</span>
                            <span className='leaderboard-score-details-description'>{totalQuestions}</span>
                        </span>
                    </div>
                    <span className='leaderboard-divider-vertical' />
                    <div className='section-outlined-round-corners leaderboard-user-score-box'>
                        <span className='section-head'><b>Score</b></span>
                        <span className='leaderboard-user-score-container'>
                            <span className='leaderboard-user-score'>
                                {totalQuestions + totalAnswers}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps({ authenticatedUser, users }) {
    const isAuthenticated = isUserAuthenticated(authenticatedUser);
    // Check for user authentication
    if (!isAuthenticated) {
        return {
            isAuthenticated,
        };
    } else {
        return {
            isAuthenticated,
            users: Object.values(users)
                .map((user) => ({
                    ...user,
                    totalQuestions: user.questions.length,
                    totalAnswers: Object.values(user.answers).length,
                }))
                .sort((a, b) =>
                    (b.totalQuestions + b.totalAnswers) - (a.totalQuestions + a.totalAnswers)),
        };
    }
}

export default connect(mapStateToProps)(LeaderBoard);
