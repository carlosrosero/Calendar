/* eslint-disable */
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
    id: 1,
    'title': 'All Day Event',
    'allDay': true,
    'start': new Date(),
    'end': new Date()
  },{
    id: 2,
    'title': 'DTS STARTS',
    'start': new Date(2016, 11, 13, 1, 0, 0),
    'end': new Date(2016, 11, 13, 2, 0, 0)
  },
  {
    id: 3,
    'title': 'DTS ENDS',
    'start': new Date(2016, 11, 6, 0, 0, 0),
    'end': new Date(2016, 11, 13, 0, 0, 0)
  }];

//http://codepen.io/kotazi/pen/KVoXob
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
        defaultView="week"
        views={['week']}
        startAccessor="start"
        endAccessor="endDate"
        date={date}
        timeslots={1}
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
