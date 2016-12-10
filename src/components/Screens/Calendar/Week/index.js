// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// actions
// components
import Calendar from 'components/Modules/Calendar';

class CalendarWeekPage extends React.Component {
  static propTypes = {
    defaultDate: PropTypes.instanceOf(Date).isRequired,
  };

  render() {
    return (<div>
      <Calendar date={this.props.defaultDate} />
    </div>);
  }
}

function select(state, ownProps) {
  console.log('ownProps', ownProps);
  const {date} = ownProps.location.query;
  return {
    defaultDate: date ? new Date(date) : new Date(),
  };
}

export default connect(select, {

})(CalendarWeekPage);
