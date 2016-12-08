// libs
import React from 'react';
// components
import {Link} from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import styles from '../index.css';

export default function TopNavNotAuthenticated() {
  return (<div className={styles.container}>
    <div className={styles.items}>
      <Link to="/login" className={styles.item} activeClassName={styles.active}>
        <MenuItem primaryText="Login" />
      </Link>
    </div>
  </div>);
}
