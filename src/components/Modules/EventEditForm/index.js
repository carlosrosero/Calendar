// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// actions
import {createEvent, updateEvent} from 'actions/Event';
// components
import {Field, reduxForm, formValueSelector} from 'redux-form';
import * as FormGroups from 'components/Base/Form/Groups';
import Button from 'components/Base/Form/Button';
import LinkButton from 'components/Base/LinkButton';
// other
import {isValidDate} from 'helpers/DateTime';
import styles from './index.css';

class EventEditForm extends React.Component {
  static propTypes = {
    // injected by redux-form
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    // injected by mapDispatchToProps
    createEvent: PropTypes.func.isRequired,
    updateEvent: PropTypes.func.isRequired,
    // injected by mapStateToProps
    allDayValue: PropTypes.bool,
  };

  submitForm = (values) => {
    console.log('values', values);
    if (values.id) {
      this.props.updateEvent(values);
    } else {
      this.props.createEvent(values);
    }
  }

  render() {
    const {allDayValue, handleSubmit, pristine, submitting} = this.props;

    return (<form onSubmit={handleSubmit(this.submitForm)}>
      <Field name="id" component={FormGroups.Hidden} />

      <Field name="title" type="text" label="title" component={FormGroups.Input} />

      <div className="form-group clearfix">
        <Field name="start" dateOnly={allDayValue} component={FormGroups.DateTimeSelector} />
        <span className={styles.dashSeparator}>
          —
        </span>
        <Field name="end" dateOnly={allDayValue} reverse component={FormGroups.DateTimeSelector} />
      </div>

      <Field name="allDay" label="All day" component={FormGroups.Checkbox} />

      <div className="form-footer">
        <LinkButton href="/calendar">Cancel</LinkButton>
        <Button type="submit" disabled={pristine || submitting}>Submit</Button>
      </div>
    </form>);
  }
}

function validate(values) {
  const errors = {};
  console.log('values', values);
  if (!values.title) {
    errors.title = 'Required';
  }

  const isStartDateValid = isValidDate(values.start);
  if (!isStartDateValid) {
    errors.start = 'Required';
  }

  const isEndDateValid = isValidDate(values.end);
  if (!isEndDateValid) {
    errors.end = 'Required';
  }

  const startDate = new Date(values.start);
  const endDate = new Date(values.end);
  const isEndDateLessThanStart = values.allDay ? (+startDate > +endDate) : (+startDate >= +endDate);
  if (isStartDateValid && isEndDateValid && isEndDateLessThanStart) {
    errors.start = 'End date must be greater than Start date';
  }
  console.log('errors', errors);

  return errors;
}

const selector = formValueSelector('eventEditForm');
function select(state, ownProps) {
  const allDayValue = selector(state, 'allDay');
  return {
    allDayValue,
    initialValues: ownProps.event,
  };
}

export default connect(select, {
  createEvent,
  updateEvent,
})(reduxForm({
  form: 'eventEditForm',
  validate,
})(EventEditForm));
