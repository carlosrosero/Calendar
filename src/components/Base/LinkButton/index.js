// libs
import React, {PropTypes} from 'react';
import cn from 'classnames';
// components
import {Link} from 'react-router';

export default function LinkButton({children, href, className}) {
  return <Link to={href} className={cn('btn btn-default', className)} role="button">{children}</Link>;
}
LinkButton.propTypes = {
  children: PropTypes.any.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
};
LinkButton.defaultProps = {
  isLink: false,
};
