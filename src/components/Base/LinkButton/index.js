// libs
import React, {PropTypes} from 'react';
// components
import {Link} from 'react-router';

export default function LinkButton({children, href}) {
  return <Link to={href} className="btn btn-default" role="button">{children}</Link>;
}
LinkButton.propTypes = {
  children: PropTypes.any.isRequired,
  href: PropTypes.string,
};
LinkButton.defaultProps = {
  isLink: false,
};
