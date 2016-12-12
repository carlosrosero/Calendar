// libs
import React, {PropTypes} from 'react';
// components
import LinkButton from 'components/Base/LinkButton';
import Button from 'components/Base/Form/Button';
import DateTimeInterval from 'components/Base/DateTimeInterval';
import Modal from 'components/Base/Modal';

class EventViewModal extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    event: PropTypes.object.isRequired,
    onHide: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };
  state = {show: false};

  handleRemoveClicked = () => {
    this.props.onRemove(this.props.event);
  }

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

        <p>
          <DateTimeInterval start={event.start} end={event.end} />
        </p>

        <div>
          <Button onClick={this.props.onHide}>Cancel</Button>
          <Button onClick={this.handleRemoveClicked}>Remove</Button>
          <LinkButton href={`/calendar/event/${event.id}`}>Edit</LinkButton>
        </div>
      </div>
    </Modal>);
  }
}

export default EventViewModal;
