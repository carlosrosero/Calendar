// libs
import React, {PropTypes} from 'react';
// components
import Checkbox from 'components/Base/Form/Checkbox';

export default function FormGroupCheckbox({input, label}) {
  return (<div className="form-group">
    <div className="col-sm-offset-2 col-sm-10">
      <Checkbox {...input} label={label} />
    </div>
  </div>);
}
FormGroupCheckbox.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};
