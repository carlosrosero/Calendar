// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
// components
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment);

const events = [{
  'title': 'All Day Event',
  'allDay': true,
  'start': new Date(),
  'end': new Date()
},
{
  'title': 'Long Event',
  'start': new Date(2016, 11, 7),
  'end': new Date(2016, 11, 7)
}];

class Calendar extends React.Component {
  static propTypes = {};

  state = {date: new Date()};

  handleNavigate = (date) => {
    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    this.props.push(`/calendar/week?date=${dateStr}`);
  }

  render() {
    const {date} = this.props;
    return (
      <BigCalendar
        events={events}
        view="week"
        views={['week']}
        startAccessor="start"
        endAccessor="endDate"
        date={date}
        onNavigate={this.handleNavigate}
    />);
  }
}

function select() {
  return {
  };
}

export default connect(select, {
  push
})(Calendar);
