// libs
import React, {PropTypes} from 'react';
// components
import Checkbox from 'components/Base/Form/Checkbox';

export default function FormGroupCheckbox({input, label}) {
  return (<div className="form-group">
    <Checkbox {...input} label={label} />
  </div>);
}
FormGroupCheckbox.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};
