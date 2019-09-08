import React from 'react';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
  
} from "reactstrap";
import { Link } from 'react-router-dom'
import clientRoutes from '../cliente/rutas'

const UserList = (props) => {
    return (
      <UncontrolledDropdown className="option-list">
        <DropdownToggle caret nav>
        {props.name}
        </DropdownToggle>
        <DropdownMenu right>
            <Link className="option-item" to={`/cliente/${clientRoutes[0].id}`}>
              <DropdownItem >Mi cuenta</DropdownItem>
            </Link>
            <DropdownItem onClick={() => props.login(0, null)}>Cerrar Sesión</DropdownItem>                
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  export default UserList;