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
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  };
  state = {
    dateTime: null,
    time: null,
  };

  componentWillMount() {
    const {value} = this.props;
    const dateTime = new Date(value);
    if (isValidDate(dateTime)) {
      const time = getTimeFromDate(dateTime);
      this.setState({dateTime: moment(value), time});
    }
  }

  handleDateSelected = (date) => {
    this.setState({dateTime: date});

    const {time} = this.state;
    if (time) {
      const dateStr = date.format('YYYY-MM-DD');
      this.props.onChange(`${dateStr} ${time}`);
    }
  }

  handleTimeSelected = (time) => {
    this.setState({time});

    const {dateTime} = this.state;
    if (dateTime) {
      const dateStr = dateTime.format('YYYY-MM-DD');
      this.props.onChange(`${dateStr} ${time}`);
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
          selected={this.state.dateTime}
          onChange={this.handleDateSelected}
        />
      </div>,
      <div className="col-xs-4" key="2">
        <TimeSelector value={time} onChange={this.handleTimeSelected} />
      </div>,
    ];

    return (<div className="row">
      {reverse ? controls.reverse() : controls}
    </div>);
  }
}

export default DateTimeSelector;
