// libs
import React, {PropTypes} from 'react';

export default function FormGroupInput({input, label, type, meta: {touched, error, warning}}) {
  return (<div className="form-group">
    <input {...input} placeholder={label} type={type} className="form-control" />
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>);
}
FormGroupInput.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};
