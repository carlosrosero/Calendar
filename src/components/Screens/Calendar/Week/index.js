// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
// actions
import {fetchAllEvents} from 'actions/Event';
// components
import Calendar from 'components/Modules/Calendar';

class CalendarWeekPage extends React.Component {
  static propTypes = {
    defaultDate: PropTypes.instanceOf(Date).isRequired,
    events: PropTypes.array.isRequired,
    // injected by mapDispatchToProps
    fetchAllEvents: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchAllEvents(fetchAllEvents);
  }

  render() {
    const {events, defaultDate} = this.props;
    return (<div>
      <Calendar events={events} date={defaultDate} />
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
})(CalendarWeekPage);
