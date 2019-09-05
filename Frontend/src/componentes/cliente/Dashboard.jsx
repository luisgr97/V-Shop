import React, {Component} from 'react'
import { Route, Redirect } from 'react-router-dom'
import axios from 'axios'

import Sidebar from './Sidebar'
import { Container, Row, Col } from 'reactstrap';
import Datos from '../principal/Registro'
import Comments from './Comments'
import Purchase from './ClientPurchase'
import Loading from '../principal/Loading'

import clientRoutes from './rutas'
/*
const propiedades2={
  tipo: "CC",
  numero: "12151518",
  nombre: "Esneider Manzano",
  apellidos: "Aranago",
  telefono: "4455971",
  direccion: "Cra 28 C # 54 - 123",
  correo: "esneider.manzano@correounivalle.edu.co",
  clave: "stefierrote",       
  nacimiento: "1995-10-18",
  nick: "loquendomanzano",
};

const inicial={
  tipo:"CC",
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
*/
class Cliente extends Component {
  constructor(props){
    super(props)
    this.state = {
      cliente: {
      },
      loading: true
    }
  };

  componentDidMount(){
    axios.get('http://localhost:4000/usuario/getJoinFacturas/' + this.props.idCliente)
    .then((response) => {
      console.log("Es response",response)
      response.data.data.clave=""
      console.log(response.data.data)
      this.setState({
        cliente:response.data.data,
        loading: false
      })
    })
    .catch(err=>{
        alert("Intentelo mas tarde cliente")
    })
  }

  render(){
    const {location} = this.props
    const datos = this.state.cliente

    if(this.state.loading){
      return(
        <Loading />
      )
    }else{
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
                  <Datos actualizar={true} 
                  idCliente={this.props.idCliente}
                  datos={this.state.cliente}
                  mensaje={"ACTUALIZAR"}/>
              )}/>

              <Route path={`/cliente/${clientRoutes[1].id}`} 
                render={()=>(
                  <Purchase bills={this.state.cliente.facturas}/>
              )}/>

              <Route path={`/cliente/${clientRoutes[2].id}`} 
                render={()=>(
                  <Comments idCliente={this.props.idCliente}/>
              )}/>
                
            </Col>
          </Row>
          <Redirect to="/cliente/data"/>

        </Container>      
      )
    }
  }
}
 


export default Cliente