// libs
import React from 'react';
// components
import TopNavItem from 'components/Base/TopNavItem';
import {Navbar, Nav} from 'react-bootstrap';

export default function TopNav() {
  return (
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          Calendar App
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
