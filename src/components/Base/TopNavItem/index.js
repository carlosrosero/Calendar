// libs
import React, {PropTypes} from 'react';
// components
import {Link} from 'react-router';
// other
import styles from './index.css';

export default function TopNavItem({label, href}) {
  return (
    <li>
      <Link to={href} className={styles.item} activeClassName={styles.active}>{label}</Link>
    </li>
  );
}
TopNavItem.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};
