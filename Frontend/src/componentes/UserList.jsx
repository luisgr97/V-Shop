import React from 'react';
import {

  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
  
} from "reactstrap";
import { Link } from 'react-router-dom'
import clientRoutes from './cliente/rutas'

export default class Example extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false
    }
    this.dropdownToggle = this.dropdownToggle.bind(this)
  }

  dropdownToggle(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
//<Route path={`/:topicId`} component={Config}/>
  render() {
    return (
      <div>
      <Dropdown isOpen={this.state.dropdownOpen} 
      toggle={e => this.dropdownToggle(e)} 
      className="clienteOpciones">
        <DropdownToggle caret nav>       
            {this.props.name}
        </DropdownToggle>
        <DropdownMenu right>
 
          <Link className="client-item" to={`/cliente/${clientRoutes[0].id}`}>
            <DropdownItem >Mi cuenta</DropdownItem>
          </Link>
          <DropdownItem onClick={() => this.props.login(0, null)}>Cerrar Sesión</DropdownItem>        
        </DropdownMenu>        
      </Dropdown>
      
      </div>
    );
  }
}
