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
      title={event.title}
    >
      <div>
        <DateTimeInterval start={event.start} end={event.end} />

        <div className="form-footer no-bottom-padding">
          <Button onClick={this.handleRemoveClicked}>Remove</Button>
          <LinkButton href={`/calendar/event/${event.id}`}>Edit</LinkButton>
        </div>
      </div>
    </Modal>);
  }
}

export default EventViewModal;
