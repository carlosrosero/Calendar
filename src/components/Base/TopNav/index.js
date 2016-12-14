// libs
import React from 'react';
// components
import {Link} from 'react-router';
import TopNavItem from 'components/Base/TopNavItem';
import {Navbar, Nav} from 'react-bootstrap';

export default function TopNav() {
  return (
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Calendar App</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <TopNavItem href="/calendar/week" label="Calendar" />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
