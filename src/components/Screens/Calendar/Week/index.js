// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// actions
// components
import Calendar from 'components/Modules/Calendar';

class CalendarWeekPage extends React.Component {
  static propTypes = {};
  render() {
    return (<div>
      <Calendar date={this.props.date} />
    </div>);
  }
}

function select(state, ownProps) {
  return {
    date: new Date(ownProps.location.query.date)
  };
}

export default connect(select, {

})(CalendarWeekPage);
