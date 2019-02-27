import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import * as Constants from '../utils/Constants';
import { isUserAuthenticated } from '../utils/Helpers';
import { handleInitialData } from '../actions/shared';
import Navigation from './Navigation';
import SignIn from './SignIn';
import LeaderBoard from './LeaderBoard';
import Dashboard from './Dashboard';
import NewQuestion from './NewQuestion';
import PageNotFound from './PageNotFound';
import Question from './Question';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { isAuthenticated, isInitialDataReceived, authenticatedUser, location } = this.props;
    if (!isInitialDataReceived) {
      // Render loading bar untill we receive the initial data
      return <LoadingBar />;
    }
    else if (authenticatedUser === Constants.SIGNED_OUT_USER && location.pathname !== Constants.PATH_TO_SIGN_IN) {
      // If the user recently signed out, redirect to authentication component without history props
      return <Redirect to={
        {
          pathname: Constants.PATH_TO_SIGN_IN,
        }
      } />
    }
    else if (authenticatedUser === null && location.pathname !== Constants.PATH_TO_SIGN_IN) {
      // If the user has not signed in yet, redirect to authentication component with history props to redirect it later
      return <Redirect to={
        {
          pathname: Constants.PATH_TO_SIGN_IN,
          state: { from: location },
        }
      } />
    }
    else if (isAuthenticated && location.pathname === Constants.PATH_TO_SIGN_IN) {
      // If the user has recently signed in, redirect to the mentioned component in history after clearing state with authentication component
      let from = (location.state && location.state.from) ? location.state.from : undefined;
      let search = (from && from.search) ? from.search : undefined;
      search = search ? search : '';
      let path = (from && from.pathname) ? from.pathname : undefined;
      path = path ? path + search : Constants.PATH_TO_DASHBOARD;
      return <Redirect to={
        {
          pathname: path,
          state: null,
        }
      } />
    }
    // Render the best match, use switch to render only one component at one time
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <div className='container-nav'>
              <Navigation />
            </div>
            <div className='container-nested-vertical'>
              <Switch>
                <Route
                  path={Constants.PATH_TO_SIGN_IN}
                  component={SignIn}
                />
                <Route
                  path={Constants.PATH_TO_ROOT}
                  exact
                  component={Dashboard}
                />
                <Route
                  path={Constants.PATH_TO_ANSWERED_QUESTIONS}
                  exact
                  component={Dashboard}
                />
                <Route
                  path={Constants.PATH_TO_DASHBOARD}
                  exact
                  component={Dashboard}
                />
                <Route
                  path={Constants.PATH_TO_NEW_QUESTION}
                  component={NewQuestion}
                />
                <Route
                  path={Constants.PATH_TO_LEADER_BOARD}
                  component={LeaderBoard}
                />
                <Route
                  path={Constants.PATH_TO_QUESTION}
                  component={Question}
                />
                <Route component={PageNotFound} />
              </Switch>
            </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authenticatedUser, users }) {
  return {
    isInitialDataReceived: Object.keys(users).length > 0,
    isAuthenticated: isUserAuthenticated(authenticatedUser),
    authenticatedUser,
  };
}


export default withRouter(connect(mapStateToProps)(App));
