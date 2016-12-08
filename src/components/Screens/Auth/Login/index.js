// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
// actions
// components
import LoginForm from './Form';
import styles from './index.css';

class LoginPage extends React.Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(newProps) {
    this.redirectIfLogged(newProps);
  }

  componentWillMount() {
    this.redirectIfLogged(this.props);
  }

  redirectIfLogged(props) {
    if (props.userId) {
      this.props.push('/dashboard');
    }
  }

  // handleSubmit = (values) => {
  //   console.log('cfdfd', values);
  // }

  render() {
    return (
      <div>
        <div className={styles.container}>
          <h3>Login</h3>
          <LoginForm />
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    userId: state.auth ? state.auth.userId : null,
  };
}

export default connect(select, {
  push,
})(LoginPage);
