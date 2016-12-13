// libs
import React, {PropTypes} from 'react';
// components
import DateTimeSelector from 'components/Base/Form/DateTimeSelector';
// other
import styles from './index.css';

export default function FormGroupDateTimeSelector({input, dateOnly, meta: {touched, error}}) {
  return (<span className={styles.wrapper}>
    <DateTimeSelector
      {...input}
      dateOnly={dateOnly}
    />
    {touched && (error && <span className={styles.error}>{error}</span>)}
  </span>);
}
FormGroupDateTimeSelector.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  dateOnly: PropTypes.bool,
};
