// libs
import React, {PropTypes} from 'react';

export default function FormGroupInput({input, label, type, meta: {touched, error, warning}}) {
  return (<div className="form-group">
    <label className="col-sm-2 control-label">{label}</label>
    <div className="col-sm-10">
      <input {...input} placeholder={label} type={type} className="form-control" />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>);
}
FormGroupInput.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
};
