// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
// actions
import {fetchAllEvents, updateEvent} from 'actions/Event';
// components
import Calendar from 'components/Modules/Calendar';

class CalendarWeekPage extends React.Component {
  static propTypes = {
    defaultDate: PropTypes.instanceOf(Date).isRequired,
    events: PropTypes.array.isRequired,
    // injected by mapDispatchToProps
    fetchAllEvents: PropTypes.func.isRequired,
    updateEvent: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchAllEvents(fetchAllEvents);
  }

  handleEventChanged = (event) => {
    const eventBeforeChange = _.find(this.props.events, {id: event.id});
    if (eventBeforeChange) {
      const oldStartDate = new Date(eventBeforeChange.start);
      const newStartDate = new Date(event.start);
      // event's start date is in the future now, so user must get notification again
      if (newStartDate > oldStartDate) {
        event.isUserNotified = false;
      }
    }
    this.props.updateEvent(event);
  }

  render() {
    const {events, defaultDate} = this.props;
    return (<div>
      <Calendar events={events} date={defaultDate} onEventChanged={this.handleEventChanged} />
    </div>);
  }
}

function select(state, ownProps) {
  console.log('state', state.entities);
  const {date} = ownProps.location.query;
  return {
    defaultDate: date ? new Date(date) : new Date(),
    // convert iterable object into array
    events: _.map(state.entities.events, (calendarEvent) => calendarEvent),
  };
}

export default connect(select, {
  fetchAllEvents,
  updateEvent,
})(CalendarWeekPage);
