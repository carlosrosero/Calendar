/* eslint react/prefer-stateless-function: "off" */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';
// components
import TopNav from 'components/Base/TopNav';
import injectTapEventPlugin from './InjectTapEventPlugin';
import styles from './App.css';

require('bootstrap/dist/css/bootstrap.css');
// require('bootstrap/dist/css/bootstrap-theme.css');
require('normalize.css');
require('./normalizes-overwrites.css');

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  componentWillMount() {
    injectTapEventPlugin();
  }

  render() {
    return (
      <div>
        <TopNav />
        <div className={cn('container', styles.container)}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

function select() {
  return {
  };
}

export default connect(select, {
})(App);
