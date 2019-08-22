import React, {Component} from 'react'
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'

import Sidebar from './Sidebar'
import { Container, Row, Col } from 'reactstrap';
import Datos from '../componentes/Registro'
import Comments from '../componentes/Comments'
import Purchase from '../componentes/ClientPurchase'


import clientRoutes from '../rutas/cliente'

const inicial={
  tipo: "CC",
  numero: "",
  nombre: "",
  apellidos: "",
  telefono: "",
  direccion: "",
  correo: "",
  clave: "",        
  nacimiento: "",
  nick: "",
};

class Cliente extends Component {
  constructor(props){
    super(props)
    this.state = {
      cliente: inicial
    }
  };

  componentDidMount(){
    axios.get('http://localhost:4000/usuario/get/' + this.props.idCliente)
    .then((response) => {
      console.log(response.data.data)
      this.setState({
        cliente: JSON.stringify(response.data.data)
      })
    })
    .catch(err=>{
        alert("Intentelo mas tarde")
    })
  }

  render(){
    const {location} = this.props
    /*    
    {clientRoutes.map((ruta) => (
      <Route key={ruta.id} 
      path={`/cliente/${ruta.id}`} 
      render={()=>(
        <ruta.component noRegistro={true} 
        {...this.state.cliente}/>
      )}/>
  ))}*/
  return (
    <Container>
      <div className="espacio"/>
      <Row>
        <Col xs="3">
          <Sidebar pathname = {location.pathname}/>
        </Col>
        <Col xs="9">
          <Route path={`/cliente/${clientRoutes[0].id}`} 
            render={()=>(
              <Datos noRegistro={true} 
              {...this.state.cliente}/>
            )}
          />

          <Route path={`/cliente/${clientRoutes[1].id}`} 
            render={()=>(
              <Purchase />
            )}
          />

          <Route path={`/cliente/${clientRoutes[2].id}`} 
            render={()=>(
              <Comments />
            )}
          />
          
        </Col>
      </Row>
      <Redirect to="/cliente/data"/>

    </Container>
    
  )
}
  }
 


export default Cliente