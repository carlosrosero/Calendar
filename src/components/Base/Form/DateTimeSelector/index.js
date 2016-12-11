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
    dateOnly: PropTypes.bool,
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

  componentWillReceiveProps(nextProps) {
    // call onBlur callback to ask the form to perform validaion with changed data
    this.handleBlur(nextProps);
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

    const {dateOnly} = this.props;
    this.props.onChange(dateOnly ? dateStr : dateTimeStr);
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

  handleBlur = (props) => {
    const {dateTime, date} = this.state;
    const {dateOnly} = props;

    if (!dateOnly && dateTime) {
      // both date and time are required
      this.props.onBlur(dateTime.format('YYYY-MM-DD HH:mm'));
    } else if (dateOnly && date) {
      // date only is required
      this.props.onBlur(date.format('YYYY-MM-DD'));
    } else {
      // both date and time are required but they were not selected
      this.props.onBlur(null);
    }
  }

  render() {
    const {time} = this.state;
    const {reverse, dateOnly} = this.props;
    console.log('dateOnly', dateOnly);
    // TODO: disable past dates
    const controls = [
      <div className="col-xs-6" key="1">
        <DatePicker
          showWeekNumbers
          locale="en-gb"
          className="form-control input-sm"
          selected={this.state.date}
          onChange={this.handleDateSelected}
          onBlur={() => { this.handleBlur(this.props); }}
        />
      </div>,
    ];
    if (!dateOnly) {
      controls.push(<div className="col-xs-4" key="2">
        <TimeSelector value={time} onChange={this.handleTimeSelected} onBlur={() => { this.handleBlur(this.props); }} />
      </div>);
    }

    return (<div className="row">
      {reverse ? controls.reverse() : controls}
    </div>);
  }
}

export default DateTimeSelector;
