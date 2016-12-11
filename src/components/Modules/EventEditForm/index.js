// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// actions
// components
import {Field, reduxForm} from 'redux-form';
import {FormGroupDateTimeSelector, FormGroupInput} from 'components/Base/Form/Groups';
import Button from 'components/Base/Form/Button';
import LinkButton from 'components/Base/LinkButton';
// other
import {isValidDate} from 'helpers/DateTime';

class EventEditForm extends React.Component {
  static propTypes = {
    // injected by redux-form
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  submitLoginForm = (values) => {
    console.log('values', values);
  }

  render() {
    const {handleSubmit, pristine, submitting} = this.props;

    return (<form onSubmit={handleSubmit(this.submitLoginForm)} className="form-horizontal">
      <Field name="title" type="text" label="title" component={FormGroupInput} />

      <div className="form-group">
        <label className="col-sm-2 control-label">Dates</label>
        <div className="col-sm-4">
          <Field name="startDate" component={FormGroupDateTimeSelector} />
        </div>
        <div className="col-sm-4">
          <Field name="endDate" reverse component={FormGroupDateTimeSelector} />
        </div>
      </div>

      <div>
        <LinkButton href="/calendar">Back</LinkButton>
        <Button type="submit" disabled={pristine || submitting}>Submit</Button>
      </div>
    </form>);
  }
}

function select() {
  return {
  };
}

function validate(values) {
  const errors = {};
  console.log('values', values);
  if (!values.title) {
    errors.title = 'Required';
  }

  const isStartDateValid = isValidDate(values.startDate);
  if (!isStartDateValid) {
    errors.startDate = 'Required';
  }

  const isEndDateValid = isValidDate(values.endDate);
  if (!isEndDateValid) {
    errors.endDate = 'Required';
  }

  const startDate = new Date(values.startDate);
  const endDate = new Date(values.endDate);
  // console.log('+startDate >= +endDate', +startDate, +endDate, startDate, endDate);
  if (isStartDateValid && isEndDateValid && (+startDate >= +endDate)) {
    errors.startDate = 'End date must be greater than Start date';
  }
  console.log('errors', errors);

  return errors;
}

export default connect(select, {
  // submitLogin,
})(reduxForm({
  form: 'eventEditForm',
  validate,
})(EventEditForm));
