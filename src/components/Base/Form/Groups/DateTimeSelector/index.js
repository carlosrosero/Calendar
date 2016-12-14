// libs
import React, {PropTypes} from 'react';
import cn from 'classnames';
// components
import DateTimeSelector from 'components/Base/Form/DateTimeSelector';
// other
import styles from './index.css';

export default function FormGroupDateTimeSelector({input, reverse, dateOnly, className, meta: {touched, error}}) {
  const showError = touched && error;
  return (<span className={cn(styles.wrapper, className, {[styles.dateOnly]: dateOnly, 'has-error': showError})}>
    <DateTimeSelector
      {...input}
      reverse={reverse}
      dateOnly={dateOnly}
    />
    {showError && (<span className={cn('text-danger', styles.error)}>{error}</span>)}
  </span>);
}
FormGroupDateTimeSelector.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  dateOnly: PropTypes.bool,
  reverse: PropTypes.bool,
  className: PropTypes.string,
};
