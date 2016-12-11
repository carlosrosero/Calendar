// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {submit} from 'redux-form';
// components
import Button from 'components/Base/Form/Button';
import Modal from 'components/Base/Modal';
import EventQuickCreateForm from 'components/Modules/EventQuickCreateForm';

class EventQuickCreateModal extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    onHide: PropTypes.func.isRequired,
    // injected
    submit: PropTypes.func.isRequired,
  };
  state = {show: false};

  submitForm = () => {
    this.props.submit('eventQuickCreateForm');
  }

  render() {
    const {start, end, show} = this.props;
    return (<Modal
      show={show}
      onHide={this.props.onHide}
    >
      <div>
        <EventQuickCreateForm onCreated={this.props.onHide} start={start} end={end} />

        <div>
          <Button onClick={this.props.onHide}>Cancel</Button>
          <Button onClick={this.submitForm}>Submit</Button>
        </div>
      </div>
    </Modal>);
  }
}

export default connect(null, {
  submit,
})(EventQuickCreateModal);
