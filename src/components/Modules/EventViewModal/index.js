// libs
import React, {PropTypes} from 'react';
// components
import LinkButton from 'components/Base/LinkButton';
import Button from 'components/Base/Form/Button';
import DateTimeInterval from 'components/Base/DateTimeInterval';
import Modal from 'components/Base/Modal';
// other
import styles from './index.css';

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
        <button type="button" className="close" onClick={this.props.onHide}>
          <span>&times;</span>
        </button>
        <h4 className={styles.title}>{event.title}</h4>

        <span className="text-muted">When</span>
        <p>
          <DateTimeInterval start={event.start} end={event.end} />
        </p>

        <div className="form-footer no-bottom-padding">
          <Button onClick={this.handleRemoveClicked}>Remove</Button>
          <LinkButton href={`/calendar/event/${event.id}`}>Edit</LinkButton>
        </div>
      </div>
    </Modal>);
  }
}

export default EventViewModal;
