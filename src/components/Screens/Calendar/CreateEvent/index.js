// libs
import React from 'react';
import {connect} from 'react-redux';
// actions
// components
import EventEditForm from 'components/Modules/EventEditForm';

class CreateEventPage extends React.Component {
  static propTypes = {};
  render() {
    return (<div className="container">
      <EventEditForm />
    </div>);
  }
}

function select() {
  return {
  };
}

export default connect(select, {

})(CreateEventPage);
