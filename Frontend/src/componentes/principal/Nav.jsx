import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default class Example extends React.Component {
  render() {
    return (
      <nav id="navigation">
        <Nav >
          <NavItem>
            <NavLink href="#">Todos</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Consolas</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Camaras</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Computadores</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Robotica</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">Smartphones</NavLink>
          </NavItem>
          
        </Nav>
        </nav>
    );
  }
}