// libs
import React, {PropTypes} from 'react';
// components
import LinkButton from 'components/Base/LinkButton';
import Button from 'components/Base/Form/Button';
import Modal from 'components/Base/Modal';

class EventViewModal extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    event: PropTypes.object.isRequired,
    onHide: PropTypes.func.isRequired,
  };
  state = {show: false};

  render() {
    const {event, show} = this.props;
    if (!event) {
      return null;
    }

    return (<Modal
      show={show}
      onHide={this.props.onHide}
    >
      <div>
        <h3>{event.title}</h3>
        <p>From {event.start.format('YYYY-MM-DD HH:mm')} to {event.end.format('YYYY-MM-DD HH:mm')}</p>
        <div>
          <Button onClick={this.props.onHide}>Cancel</Button>
          <LinkButton href={`/calendar/event/${event.id}`}>Edit</LinkButton>
        </div>
      </div>
    </Modal>);
  }
}

export default EventViewModal;
