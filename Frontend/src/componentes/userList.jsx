import React from 'react';
import {

  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
  
} from "reactstrap";

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

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={e => this.dropdownToggle(e)} id="clienteOpciones">
        <DropdownToggle caret nav>       
            Mi cuenta
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem tag="a">Mis compras</DropdownItem>
          <DropdownItem tag="a">Mis comentarios</DropdownItem>
          <DropdownItem tag="a">Configurar Cuenta</DropdownItem>
          <DropdownItem tag="a">Cerrar sesion</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
