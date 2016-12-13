// libs
import React, {PropTypes} from 'react';
import cn from 'classnames';

export default function FormGroupInput({input, label, type, meta: {touched, error, warning}}) {
  const showError = touched && error;
  return (<div className={cn('form-group', {'has-error': showError})}>
    <input {...input} placeholder={label} type={type} className="form-control" />
    {showError && (<span className="text-danger">{error}</span>)}
  </div>);
}
FormGroupInput.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};
