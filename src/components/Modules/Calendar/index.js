// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import $ from 'jquery';
import _ from 'lodash';
// components
import EventQuickCreateModal from 'components/Modules/EventQuickCreateModal';

require('fullcalendar');
require('fullcalendar/dist/fullcalendar.css');

class Calendar extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    events: PropTypes.array.isRequired,
    // injected by mapDispatchToProps
    push: PropTypes.func.isRequired,
  };

  state = {
    date: new Date(),
    showNewEventModal: false,
    newEventStart: '',
    newEventEnd: '',
  };
  calendarRoot = null;

  componentDidMount() {
    const {date, events} = this.props;
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
      selectable: true,
      // this allows things to be dropped onto the calendar
      droppable: true,
      viewRender: this.viewRender,
      select: (start, end) => {
        console.log('start, end', start.format('YYYY-MM-DD HH:mm'), end.format('YYYY-MM-DD HH:mm'));
        this.setState({
          showNewEventModal: true,
          newEventStart: start.format('YYYY-MM-DD HH:mm'),
          newEventEnd: end.format('YYYY-MM-DD HH:mm'),
        });
      },
      // eventMouseover(event, jsEvent, view) {
      //   new Tooltip(jsEvent, event).show();
      // },
      // eventMouseout(event, jsEvent, view) {
      //   new Tooltip(jsEvent).hide();
      // }
    });
  }

  componentWillUnmount() {
    $(this.calendarRoot).fullCalendar('destroy');
  }

  componentWillReceiveProps(newProps) {
    if (!_.isEqual(this.props.events, newProps.events)) {
      $(this.calendarRoot).fullCalendar('removeEvents');
      $(this.calendarRoot).fullCalendar('addEventSource', newProps.events);
    }
  }

  initCalendarRoot = (node) => {
    this.calendarRoot = node;
  }

  viewRender = (view) => {
    const date = view.intervalStart.format();
    this.props.push(`/calendar/week?date=${date}`);
  }

  handleNewEventModalHide = () => {
    this.setState({showNewEventModal: false, newEventStart: '', newEventEnd: ''});
  }

  render() {
    const {newEventStart, newEventEnd} = this.state;
    return (<div>
      <div ref={this.initCalendarRoot} />
      <EventQuickCreateModal
        show={this.state.showNewEventModal}
        onHide={this.handleNewEventModalHide}
        start={newEventStart}
        end={newEventEnd}
      />
    </div>);
  }
}

function select() {
  return {
  };
}

export default connect(select, {
  push,
})(Calendar);
