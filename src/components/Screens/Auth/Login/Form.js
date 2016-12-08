// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// actions
import {submitLogin} from 'actions/login';
// components
import {Field, reduxForm} from 'redux-form';

class LoginForm extends React.Component {
  static propTypes = {
    isLoginPending: PropTypes.bool.isRequired,
    submitLogin: PropTypes.func.isRequired,
    // injected by redux-form
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
  }

  submitLoginForm = (values) => {
    return this.props.submitLogin(values.username, values.password);
  }

  renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  )


  render() {
    const {handleSubmit, pristine, reset, submitting, isLoginPending} = this.props;
    return (
      <form onSubmit={handleSubmit(this.submitLoginForm)}>
        <div>
          <label>Email</label>
          <div>
            <Field name="username" type="text" component={this.renderField} />
          </div>
        </div>
        <div>
          <label>Password</label>
          <div>
            <Field name="password" type="password" component={this.renderField} />
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>{isLoginPending ? 'Wait...' : 'Submit'}</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
    errors.username = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
}

function select(state) {
  return {
    isLoginPending: state.requests.auth.isLoginPending,
  };
}

export default connect(select, {
  submitLogin,
})(reduxForm({
  form: 'loginForm',
  validate,
})(LoginForm));
