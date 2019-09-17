import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import Axios from 'axios';

export default class NavTag extends React.Component {
  constructor(prosp){
    super(prosp)
    this.state = {
      tags: []
    }
  }

    componentDidMount(){
      Axios.get('http://localhost:4000/api/categorias/get')
      .then(Response=>{
        this.setState({
          tags: Response.data
        })
      }).catch(err=> (
        alert("No se puedo cargar las categorias")
      ))
    }
  

  render() {
    return (
      <nav id="navigation">
        <Nav >
        <NavItem>
            <NavLink 
            onClick={()=>this.props.changeIdTag("")} 
            href="#">Todos</NavLink>
          </NavItem>
         {this.state.tags.map((tag, i)=>(
           <NavItem key={`tag${i}`}>
            <NavLink 
            onClick={()=>this.props.changeIdTag(tag.id_categoria)} 
            href="#">{tag.nombre_categoria}           
            </NavLink>
          </NavItem>
         ))}
        </Nav>
        </nav>
    );
  }
}