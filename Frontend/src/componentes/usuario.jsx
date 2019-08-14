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
            Some Actions   
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem tag="a">Action</DropdownItem>
          <DropdownItem tag="a">Another Action</DropdownItem>
          <DropdownItem tag="a">Something else here</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
