import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isStoreLoading } from '../utils/Helpers';
import logo from '../assets/images//logo.svg';
import { handleAuthenticatedUser } from '../actions/authenticatedUser';

class SignIn extends Component {

    state = {
        username: '',
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value,
        });
    }

    handleLogin = (event) => {
        event.preventDefault();
        const { dispatch } = this.props;
        dispatch(handleAuthenticatedUser(this.state.username))
    }

    render() {
        const { loading, users } = this.props;
        const { username } = this.state;
        return (
            <div className='section-outlined-round-corners container-width-small'>
                <div className='section-head'>
                    <h3>Welcome to the Would You Rather App!</h3>
                    <p>Please sign in to continue</p>
                </div>
                <div className='section-body'>
                    <img src={logo} className='app-logo' alt='App Logo' />
                    <h3 className='section-text-head'>Sign In</h3>
                    <LoginForm
                        username={username}
                        users={users}
                        onUsernameChange={this.handleUsernameChange}
                        canSubmitRequest={!loading && username.length > 0}
                        submitButtonTitle='Sign In'
                        onSubmit={this.handleLogin}
                    />
                </div>
            </div>
        );
    }
}

function LoginForm(props) {
    const {
        username,
        users,
        onUsernameChange,
        canSubmitRequest,
        submitButtonTitle,
        onSubmit,
    } = props;
    return (
        <form
            className='section-form'
            onSubmit={onSubmit}
        >
            <UsernameSelector
                className='text-input section-form-component'
                placeholder='Select User'
                username={username}
                users={users}
                onChange={onUsernameChange}
            />
            <button
                className='button-colored section-form-component'
                type='submit'
                disabled={!canSubmitRequest}
            >
                {submitButtonTitle}
            </button>
        </form>
    );
}

function UsernameSelector(props) {
    return (
        <select
            className={props.className}
            onChange={props.onChange}
            value={props.username}
        >
            <option key='' value='' disabled>{props.placeholder}</option>
            {props.users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
            ))}
        </select>
    );
}

function mapStateToProps({ loadingBar, users }) {
    return {
        loading: isStoreLoading(loadingBar),
        users: Object.keys(users)
            .sort((a, b) => users[a].id.localeCompare(users[b].id))
            .map((id) => users[id]),
    };
}

export default withRouter(connect(mapStateToProps)(SignIn));
