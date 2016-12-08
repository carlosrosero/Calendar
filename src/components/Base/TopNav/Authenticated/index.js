// libs
import React, {PropTypes} from 'react';
// components
import TopNavItem from 'components/Base/TopNavItem';
import styles from '../index.css';

export default function TopNavAuthenticated(/* {user, signOut} */) {
  return (<nav className="navbar navbar-default navbar-fixed-top">
    <div className="container-fluid">
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav navbar-right">
          <TopNavItem href="/calendar/week" label="Dashboard" />
          <TopNavItem href="/help" label="Help" />
        </ul>
      </div>
    </div>
  </nav>);
}

TopNavAuthenticated.propTypes = {
  user: PropTypes.object.isRequired,
  // signOut: PropTypes.func.isRequired,
};
