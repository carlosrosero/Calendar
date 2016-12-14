// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import cn from 'classnames';
// actions
import {createEvent, updateEvent} from 'actions/Event';
// components
import {Field, reduxForm, formValueSelector} from 'redux-form';
import * as FormGroups from 'components/Base/Form/Groups';
import Button from 'components/Base/Form/Button';
import LinkButton from 'components/Base/LinkButton';
// other
import styles from './index.css';

class EventEditForm extends React.Component {
  static propTypes = {
    // injected by redux-form
    handleSubmit: PropTypes.func.isRequired,
    // injected by mapDispatchToProps
    createEvent: PropTypes.func.isRequired,
    updateEvent: PropTypes.func.isRequired,
    // injected by mapStateToProps
    allDayValue: PropTypes.bool,
  };

  submitForm = (values) => {
    if (values.id) {
      this.props.updateEvent(values);
    } else {
      this.props.createEvent(values);
    }
  }

  render() {
    const {allDayValue, handleSubmit} = this.props;

    return (<form onSubmit={handleSubmit(this.submitForm)}>
      <Field name="id" component={FormGroups.Hidden} />

      <Field name="title" type="text" label="title" component={FormGroups.Input} />

      <div className="form-group clearfix">
        <Field name="start" dateOnly={allDayValue} className="pull-left" component={FormGroups.DateTimeSelector} />
        <span className={cn(styles.dashSeparator, 'hidden-xs pull-left')}>
          —
        </span>
        <Field name="end" dateOnly={allDayValue} reverse component={FormGroups.DateTimeSelector} />
      </div>

      <Field name="allDay" label="All day" component={FormGroups.Checkbox} />

      <div className="form-footer">
        <LinkButton href="/calendar">Cancel</LinkButton>
        <Button type="submit" category="primary">Save</Button>
      </div>
    </form>);
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }

  const isStartDateValid = moment(values.start).isValid();
  if (!isStartDateValid) {
    errors.start = 'Required';
  }

  const isEndDateValid = moment(values.end).isValid();
  if (!isEndDateValid) {
    errors.end = 'Required';
  }

  const startDate = moment(values.start).toDate();
  const endDate = moment(values.end).toDate();
  const isEndDateLessThanStart = values.allDay ? (+startDate > +endDate) : (+startDate >= +endDate);
  if (isStartDateValid && isEndDateValid && isEndDateLessThanStart) {
    errors.start = 'Start date must be early than the End date';
  }

  return errors;
}

const selector = formValueSelector('eventEditForm');
function select(state, ownProps) {
  const allDayValue = selector(state, 'allDay');
  const nowDate = moment();
  const remainder = 30 - (nowDate.minute() % 30);
  const start = moment(nowDate).add(remainder, 'minutes');
  const defaultEventData = {
    title: 'Untitled event',
    start: start.format('YYYY-MM-DD HH:mm'),
    end: moment(start).add(30, 'minutes').format('YYYY-MM-DD HH:mm'),
  };
  return {
    allDayValue,
    initialValues: ownProps.event || defaultEventData,
  };
}

export default connect(select, {
  createEvent,
  updateEvent,
})(reduxForm({
  form: 'eventEditForm',
  validate,
})(EventEditForm));
