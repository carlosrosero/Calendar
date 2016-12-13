// libs
import React, {PropTypes} from 'react';
import cn from 'classnames';

export default function Button({children, type, disabled, category, onClick}) {
  return (<button
    className={cn('btn btn-default', {[`btn-${category}`]: category})}
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
  category: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
