// libs
import React, {PropTypes} from 'react';
import moment from 'moment';
// components
import TimeSelector from 'components/Base/Form/TimeSelector';
import DatePicker from 'react-datepicker';
// other
import {getTimeFromDate, isValidDate} from 'helpers/DateTime';
import 'react-datepicker/dist/react-datepicker.css';

class DateTimeSelector extends React.Component {
  static propTypes = {
    reverse: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  };
  state = {
    // 'dateTime' and 'date' can be either instance of momentjs or null
    dateTime: null,
    date: null,
    time: '',
  };

  componentWillMount() {
    const {value} = this.props;
    if (isValidDate(value)) {
      const time = getTimeFromDate(value);
      const dateTime = moment(value);
      this.setState({dateTime, date: dateTime.format('YYYY-MM-DD'), time});
    }
  }

  setDateTime = (newDate, newTimeStr) => {
    const newState = {date: newDate, time: newTimeStr};
    let dateStr = '';
    if (newDate) {
      dateStr = newDate.format('YYYY-MM-DD');
    }
    let dateTimeStr = '';
    newState.dateTime = null;
    if (dateStr && newTimeStr) {
      dateTimeStr = `${dateStr} ${newTimeStr}`;
      newState.dateTime = moment(dateTimeStr);
    }
    this.props.onChange(dateTimeStr);
    this.setState(newState);
  }

  handleDateSelected = (date) => {
    const {time} = this.state;
    this.setDateTime(date, time);
  }

  handleTimeSelected = (timeStr) => {
    const {date} = this.state;
    this.setDateTime(date, timeStr);
  }

  handleBlur = () => {
    const {dateTime} = this.state;
    if (dateTime) {
      this.props.onBlur(dateTime.format('YYYY-MM-DD HH:MM'));
    } else {
      this.props.onBlur(null);
    }
  }

  render() {
    const {time} = this.state;
    const {reverse} = this.props;
    const controls = [
      <div className="col-xs-6" key="1">
        <DatePicker
          showWeekNumbers
          locale="en-gb"
          className="form-control input-sm"
          selected={this.state.date}
          onChange={this.handleDateSelected}
          onBlur={this.handleBlur}
        />
      </div>,
      <div className="col-xs-4" key="2">
        <TimeSelector value={time} onChange={this.handleTimeSelected} onBlur={this.handleBlur} />
      </div>,
    ];

    return (<div className="row">
      {reverse ? controls.reverse() : controls}
    </div>);
  }
}

export default DateTimeSelector;
