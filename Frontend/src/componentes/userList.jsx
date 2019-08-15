import React from 'react';
import {

  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
  
} from "reactstrap";
import {Link, Route} from 'react-router-dom'
import Config from './registroClient'

function Topic () {
  return (
<span></span>
  )
}

const topics = [
  {
    name: 'React Router',
    id: 'react-router',
    description: 'Declarative, component based routing for React'
  },
  {
    name: 'React.js',
    id: 'reactjs',
    description: 'A JavaScript library for building user interfaces'
  },
  {
    name: 'Functional Programming',
    id: 'functional-programming',
    description: 'In computer science, functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.'
  }
]

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
      <Dropdown isOpen={this.state.dropdownOpen} toggle={e => this.dropdownToggle(e)} id="clienteOpciones">
        <DropdownToggle caret nav>       
            Mi cuenta
        </DropdownToggle>
        <DropdownMenu right>
          {topics.map(({name, id}) => (
              <DropdownItem key={id} >
                <Link to={`/${id}`}>{name}</Link></DropdownItem>
          )
          )}          
        </DropdownMenu>        
      </Dropdown>
      
      </div>
    );
  }
}
