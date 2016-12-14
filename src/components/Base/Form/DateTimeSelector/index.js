// libs
import React, {PropTypes} from 'react';
import moment from 'moment';
import cn from 'classnames';
// components
import TimeSelector from 'components/Base/Form/TimeSelector';
import DatePicker from 'react-datepicker';
// other
import styles from './index.css';
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
    const newState = this.getNewStateFromProps(this.props);
    if (newState) {
      this.setState(newState);
    }
  }

  componentWillReceiveProps(nextProps) {
    const newState = this.getNewStateFromProps(nextProps);
    if (newState) {
      this.setState(newState, () => {
        // call onBlur callback to ask the form to perform validaion with changed data
        this.handleBlur(nextProps);
      });
    }
  }

  getNewStateFromProps = (props) => {
    const {value} = props;
    if (moment(value).isValid()) {
      const dateTime = moment(value);
      const time = dateTime.format('HH:mm');
      return {dateTime, date: dateTime, time};
    }
    return null;
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
    // TODO: disable past dates
    const controls = [
      <DatePicker
        key="1"
        showWeekNumbers
        locale="en-gb"
        className={cn('form-control input-sm', styles.datePickerInput)}
        selected={this.state.date}
        onChange={this.handleDateSelected}
        onBlur={() => { this.handleBlur(this.props); }}
      />,
    ];
    if (!dateOnly) {
      controls.push(<TimeSelector
        key="2"
        value={time}
        className={styles.timeSelector}
        onChange={this.handleTimeSelected}
        onBlur={() => { this.handleBlur(this.props); }}
      />);
    }

    return (<span>
      {reverse ? controls.reverse() : controls}
    </span>);
  }
}

export default DateTimeSelector;
