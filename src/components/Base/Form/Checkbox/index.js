// libs
import React, {PropTypes} from 'react';

export default function Checkbox({label, value, onChange}) {
  return (<div className="checkbox">
    <label>
      <input type="checkbox" value={value} onChange={onChange} /> {label}
    </label>
  </div>);
}
Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
};
