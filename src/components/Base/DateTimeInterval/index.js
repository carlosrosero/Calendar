// libs
import React, {PropTypes} from 'react';
import moment from 'moment';
import 'twix';

export default function DateTimeInterval({start, end}) {
  const range = moment(start).twix(end);
  return <span>{range.format()}</span>;
}
DateTimeInterval.propTypes = {
  start: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]).isRequired,
  end: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment),
  ]).isRequired,
};
