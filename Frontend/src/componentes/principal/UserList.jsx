import React from 'react';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
  
} from "reactstrap";
import { Link } from 'react-router-dom'
import clientRoutes from '../cliente/rutas'

class UserList extends React.PureComponent {

  render(){
  console.log("tambien de renderizo el userlist")
    return (
      <UncontrolledDropdown className="option-list">
        <DropdownToggle caret nav>
        {this.props.name}
        </DropdownToggle>
        <DropdownMenu right>
            <Link className="option-item" to={`/cliente/${clientRoutes[0].id}`}>
              <DropdownItem >Mi cuenta</DropdownItem>
            </Link>
            <DropdownItem onClick={() => this.props.login(0, null)}>Cerrar Sesión</DropdownItem>                
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
}

  export default UserList;