import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import * as Constants from '../utils/Constants';
import { handleAuthenticatedUser } from '../actions/authenticatedUser';

function Navigation(props) {
    return (
        <div className='nav-container'>
            <div className='nav-navigation-container'>
                <nav className='nav'>
                    <ul>
                        <li>
                            <NavLink
                                to={Constants.PATH_TO_DASHBOARD}
                                activeClassName='active'
                                exact
                            >
                                Home
                    </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={Constants.PATH_TO_NEW_QUESTION}
                                activeClassName='active'
                            >
                                New Question
                    </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={Constants.PATH_TO_LEADER_BOARD}
                                activeClassName='active'
                            >
                                Leader Board
                    </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            {props.user != null && (
                <div className='nav-user-container'>
                    <img
                        src={props.user.avatarURL}
                        alt={`Avatar of ${props.user.name}`}
                        className='nav-user-avatar' />
                    <b className='nav-user-name'>{props.user.name}</b>
                    <button
                        className='button-outlined nav-user-button-sign-out'
                        onClick={() => handleLogout(props)}
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
}

function handleLogout(props) {
    props.dispatch(handleAuthenticatedUser(Constants.SIGNED_OUT_USER));
}

function mapStateToProps({ authenticatedUser, users }) {
    return {
        user: authenticatedUser ? users[authenticatedUser] : null,
    };
}

export default withRouter(connect(mapStateToProps)(Navigation));
