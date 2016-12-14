// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// actions
import {createEvent} from 'actions/Event';
// components
import {Field, reduxForm} from 'redux-form';
import DateTimeInterval from 'components/Base/DateTimeInterval';
import * as FormGroups from 'components/Base/Form/Groups';

class EventQuickCreateForm extends React.Component {
  static propTypes = {
    // own props
    onCreated: PropTypes.func.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    // injected by redux-form
    handleSubmit: PropTypes.func.isRequired,
    // injected by mapStateToProps
    submitStatus: PropTypes.string.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    // event created successfully
    if ((this.props.submitStatus !== nextProps.submitStatus) && (nextProps.submitStatus === 'success')) {
      this.props.onCreated();
    }
  }

  render() {
    const {start, end, handleSubmit} = this.props;

    return (<form onSubmit={handleSubmit} className="form">
      <Field name="title" type="text" label="title" component={FormGroups.Input} />

      <DateTimeInterval start={start} end={end} />
      <Field name="start" component={FormGroups.Hidden} />
      <Field name="end" component={FormGroups.Hidden} />
    </form>);
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }

  return errors;
}

function select(state, ownProps) {
  return {
    submitStatus: state.requests.events.status,
    initialValues: {
      start: ownProps.start,
      end: ownProps.end,
    },
  };
}

export default connect(select, {
})(reduxForm({
  form: 'eventQuickCreateForm',
  validate,
  onSubmit: (values, dispatch) => {
    dispatch(createEvent(values, false));
  },
})(EventQuickCreateForm));
