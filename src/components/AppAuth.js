// libs
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import _ from 'lodash';
// actions
import {loadLoggedUser} from 'actions/user';
// components
import TopNav from 'components/Base/TopNav/NotAuthenticated';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiTheme from './MuiTheme';
import injectTapEventPlugin from './InjectTapEventPlugin';
import styles from './AppAuth.css';

require('normalize.css');

class AppAuth extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    push: PropTypes.func.isRequired,
    loadLoggedUser: PropTypes.func.isRequired,
  };

  componentWillMount() {
    injectTapEventPlugin();
    this.props.loadLoggedUser();
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps.loggedUser', nextProps.loggedUser);
    if (!_.isEmpty(nextProps.loggedUser)) {
      this.props.push('/dashboard');
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <div>
          <TopNav />
          <div className={styles.container}>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
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
  push,
})(AppAuth);
