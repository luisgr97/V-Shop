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
      response.data.data.clave=""
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

    if(this.state.loading){
      return(
        <Loading />
      )
    }else{
      return (
        <Container className="client-ctn">
          <br/>
          <Row>
            <Col xs="3">
              <Sidebar pathname = {location.pathname}/>
            </Col>
            <Col xs="9">
              
              <Route path={`/cliente/${clientRoutes[0].id}`} 
                render={()=>(
                  <Datos actualizar={true} 
                  idUser={this.props.idCliente}
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