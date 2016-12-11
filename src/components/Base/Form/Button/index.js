// libs
import React, {PropTypes} from 'react';

export default function Button({children, type, disabled, onClick}) {
  return (<button
    className="btn btn-default"
    type={type}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>);
}
Button.propTypes = {
  children: PropTypes.any.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
