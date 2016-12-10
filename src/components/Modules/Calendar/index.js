// libs
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import $ from 'jquery';

require('fullcalendar');
require('fullcalendar/dist/fullcalendar.css');


const events = [{
    'title': 'All Day Event',
    'allDay': true,
    'start': new Date(),
    'end': new Date()
  },{
    'title': 'DTS STARTS',
    'start': new Date(2016, 11, 13, 1, 0, 0),
    'end': new Date(2016, 11, 13, 2, 0, 0)
  },

  {
    'title': 'DTS ENDS',
    'start': new Date(2016, 11, 6, 0, 0, 0),
    'end': new Date(2016, 11, 13, 0, 0, 0)
  }];

//http://codepen.io/kotazi/pen/KVoXob
class Calendar extends React.Component {
  static propTypes = {};

  state = {date: new Date()};
  calendarRoot = null;

  componentDidMount() {
    const {date} = this.props;

    $(this.calendarRoot).fullCalendar({
			header: {
				left: 'today prev,next',
				center: 'title',
				right: 'agendaWeek'
			},
      defaultDate: date,
      // week starts from Monday
      firstDay: 1,
      defaultView: 'agendaWeek',
			editable: true,
      // this allows things to be dropped onto the calendar
			droppable: true,
      viewRender: this.handleViewRender,
			drop: function() {
				// is the "remove after drop" checkbox checked?
				if ($('#drop-remove').is(':checked')) {
					// if so, remove the element from the "Draggable Events" list
					$(this).remove();
				}
			}
    })
  }

  initCalendarRoot = (node) => {
    this.calendarRoot = node;
  }

 // TODO: bad name
  handleViewRender = (view) => {
    const date = view.intervalStart.format();
    this.props.push(`/calendar/week?date=${date}`);
  }

  render() {
    return <div ref={this.initCalendarRoot}></div>;
  }
}

function select() {
  return {
  };
}

export default connect(select, {
  push
})(Calendar);
