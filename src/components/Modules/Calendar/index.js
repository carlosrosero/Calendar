// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import $ from 'jquery';

require('fullcalendar');
require('fullcalendar/dist/fullcalendar.css');


const events = [{
  id: 1,
  title: 'All Day Event',
  allDay: true,
  start: new Date(),
  end: new Date(),
}, {
  id: 2,
  title: 'DTS STARTS',
  start: new Date(2016, 11, 9, 1, 0, 0),
  end: new Date(2016, 11, 9, 1, 30, 0),
}];

// http://codepen.io/kotazi/pen/KVoXob

class Calendar extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    // injected by mapDispatchToProps
    push: PropTypes.func.isRequired,
  };

  state = {date: new Date()};
  calendarRoot = null;

  componentDidMount() {
    const {date} = this.props;

    $(this.calendarRoot).fullCalendar({
      events,
      header: {
        left: 'today prev,next',
        center: 'title',
        right: 'agendaWeek',
      },
      defaultDate: date,
      // week starts from Monday
      firstDay: 1,
      defaultView: 'agendaWeek',
      editable: true,
      // this allows things to be dropped onto the calendar
      droppable: true,
      viewRender: this.handleViewRender,
      drop: () => {
        // is the "remove after drop" checkbox checked?
        if ($('#drop-remove').is(':checked')) {
          // if so, remove the element from the "Draggable Events" list
          $(this).remove();
        }
      },
    });
  }

  initCalendarRoot = (node) => {
    this.calendarRoot = node;
  }

 // TODO: bad name
  handleViewRender = (view) => {
    const date = view.intervalStart.format();
    this.props.push(`/calendar/week?date=${date}`);
  }

  render() {
    return <div ref={this.initCalendarRoot} />;
  }
}

function select() {
  return {
  };
}

export default connect(select, {
  push,
})(Calendar);
