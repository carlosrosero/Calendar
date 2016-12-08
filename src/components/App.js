/* eslint react/prefer-stateless-function: "off" */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import cn from 'classnames';
import _ from 'lodash';
// actions
import {loadLoggedUser} from 'actions/user';
import {submitSignOut} from 'actions/login';
// components
import TopNav from 'components/Base/TopNav/Authenticated';
import injectTapEventPlugin from './InjectTapEventPlugin';
import styles from './App.css';

require('bootstrap/dist/css/bootstrap.css');
// require('bootstrap/dist/css/bootstrap-theme.css');
require('normalize.css');
require('./normalizes-overwrites.css');

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    loggedUser: PropTypes.object.isRequired,
    loadLoggedUser: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    submitSignOut: PropTypes.func.isRequired,
  };

  componentWillMount() {
    injectTapEventPlugin();
    this.props.loadLoggedUser();
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.requested && _.isEmpty(nextProps.loggedUser)) {
    //   this.props.push('/login');
    // }
  }

  render() {
    return (
      <div>
        <TopNav user={this.props.loggedUser} signOut={this.props.submitSignOut} />
        <div className={cn('container', styles.container)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

function select(state) {
  const loggedUserId = state.auth && state.auth.userId;
  return {
    loggedUser: state.entities.users[loggedUserId] || {},
    requested: state.auth && state.auth.requested,
  };
}

export default connect(select, {
  loadLoggedUser,
  submitSignOut,
  push,
})(App);
