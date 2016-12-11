// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import $ from 'jquery';
import _ from 'lodash';

require('fullcalendar');
require('fullcalendar/dist/fullcalendar.css');

class Calendar extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    events: PropTypes.array.isRequired,
    // injected by mapDispatchToProps
    push: PropTypes.func.isRequired,
  };

  state = {date: new Date()};
  calendarRoot = null;

  componentDidMount() {
    const {date, events} = this.props;
    console.log('=====events', events);
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

  componentWillReceiveProps(newProps) {
    if (!_.isEqual(this.props.events, newProps.events)) {
      $(this.calendarRoot).fullCalendar('addEventSource', newProps.events);
    }
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
