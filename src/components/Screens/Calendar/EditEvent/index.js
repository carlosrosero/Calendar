// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// actions
import {fetchAllEvents} from 'actions/Event';
// components
import EventEditForm from 'components/Modules/EventEditForm';
import Helmet from 'react-helmet';
// other
import styles from './index.css';

class EditEvent extends React.Component {
  static propTypes = {
    eventId: PropTypes.any,
    event: PropTypes.object,
    fetchAllEvents: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const {eventId} = this.props;
    if (eventId) {
      this.props.fetchAllEvents({id: eventId});
    }
  }

  render() {
    const {event} = this.props;
    const title = event ? 'Edit Event' : 'Create Event';
    return (<div className={styles.container}>
      <Helmet title={`Calendar - ${title}`} />
      <EventEditForm event={event} />
    </div>);
  }
}

function select(state, ownProps) {
  const {id} = ownProps.params;
  const eventId = (id !== 'create') ? id : null;
  const event = eventId ? state.entities.events[eventId] : null;
  return {
    eventId,
    event,
  };
}

export default connect(select, {
  fetchAllEvents,
})(EditEvent);
