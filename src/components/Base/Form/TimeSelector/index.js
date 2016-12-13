// libs
import React, {PropTypes} from 'react';
import cn from 'classnames';
import _ from 'lodash';
// other
import styles from './index.css';

export default function TimeSelector({value, onChange, onBlur}) {
  // generate time range
  const hoursRange = _.range(0, 24);
  const minutesRange = _.range(0, 51, 30);
  const timeRange = _(hoursRange).map((hour) => {
    const hoursStr = `0${hour}`.substr(-2);
    return _.map(minutesRange, (minute) => {
      const minutesStr = `0${minute}`.substr(-2);
      return `${hoursStr}:${minutesStr}`;
    });
  }).flatten().value();

  return (<select
    className={cn('form-control input-sm', styles.select)}
    value={value}
    onChange={(event) => { onChange(event.target.value); }}
    onBlur={onBlur}
  >
    <option value="" />
    {timeRange.map((time) =>
      <option value={time} key={time}>{time}</option>
    )}
  </select>);
}
TimeSelector.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};
