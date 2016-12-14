// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import moment from 'moment';
import $ from 'jquery';
import _ from 'lodash';
// actions
import {removeEvent} from 'actions/Event';
// components
import EventQuickCreateModal from 'components/Modules/EventQuickCreateModal';
import EventViewModal from 'components/Modules/EventViewModal';
// other
import './index.css';

require('fullcalendar');
require('fullcalendar/dist/fullcalendar.css');

class Calendar extends React.Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    events: PropTypes.array.isRequired,
    onEventChanged: PropTypes.func.isRequired,
    // injected by mapDispatchToProps
    push: PropTypes.func.isRequired,
    removeEvent: PropTypes.func.isRequired,
  };

  state = {
    date: new Date(),
    showNewEventModal: false,
    newEventStart: '',
    newEventEnd: '',
    showEventViewModal: false,
    eventToBeViewed: null,
  };
  calendarRoot = null;
  eventFields = ['id', 'title', 'allDay', 'start', 'end', 'className', 'color', 'backgroundColor',
    'borderColor', 'textColor', 'startDay', 'isUserNotified'];

  componentDidMount() {
    const {date, events} = this.props;

    $(this.calendarRoot).fullCalendar({
      events,
      header: {
        left: 'today prev,next',
        center: 'title',
        right: '',
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
      select: this.handleDatesRangeSelected,
      eventClick: this.handleEventClick,
      eventDrop: this.handleEventChanged,
      eventResize: this.handleEventChanged,
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

  handleDatesRangeSelected = (start, end) => {
    this.setState({
      showNewEventModal: true,
      newEventStart: start.format('YYYY-MM-DD HH:mm'),
      newEventEnd: end.format('YYYY-MM-DD HH:mm'),
    });
  }

  handleEventClick = (event) => {
    this.setState({showEventViewModal: true, eventToBeViewed: event});
  }

  handleEventChanged = (event) => {
    this.fixEndDate(event);
    const evenSerialized = _.pick(event, this.eventFields);
    this.props.onEventChanged({
      ...evenSerialized,
      start: evenSerialized.start.format('YYYY-MM-DD HH:mm'),
      startDay: evenSerialized.start.format('YYYY-MM-DD'),
      end: evenSerialized.end.format('YYYY-MM-DD HH:mm'),
    });
  }

  handleNewEventModalHide = () => {
    this.setState({showNewEventModal: false, newEventStart: '', newEventEnd: ''});
  }

  handleEventViewModalHide= () => {
    this.hideEventViewModal();
  }

  handleEventRemove = (event) => {
    this.props.removeEvent(event.id);
    $(this.calendarRoot).fullCalendar('removeEvents', event.id);
    this.hideEventViewModal();
  }

  hideEventViewModal() {
    this.setState({showEventViewModal: false, eventToBeViewed: null});
  }

  /**
  Fixes Firefox issue when end date is null for events with 30-mins duration
  */
  fixEndDate(event) {
    if (!event.end) {
      event.end = moment(event.start).add(30, 'minutes').format('YYYY-MM-DD HH:mm');
    }
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
      <EventViewModal
        event={this.state.eventToBeViewed}
        show={this.state.showEventViewModal}
        onHide={this.handleEventViewModalHide}
        onRemove={this.handleEventRemove}
      />
    </div>);
  }
}

export default connect(null, {
  push,
  removeEvent,
})(Calendar);
