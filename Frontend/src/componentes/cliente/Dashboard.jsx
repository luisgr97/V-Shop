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
    this.changeUserState = this.changeUserState.bind(this)
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

  changeUserState(){
    console.log("funciona la mona")
    let confirmar = window.confirm("ATENCIÓN! Esta a punto de desactivar su cuenta, por ende" +
    " ya NO tendra acceso a la misma, NO podra editar sus comentarios y No podra "+
    "ver sus compras realizadas. Para reactivarla debe llenar el "+
    "formulario en la seccion contacto, solicitando la reactivacion de su cuenta. \n\n"+
    "¿ESTA SEGURO QUE DESEA DESACTIVAR SU CUENTA?");

    if(!confirmar){
      return null
    }
    const mensaje = {
        estado: 0,
        id_usuario: this.props.idCliente
    }
    axios.post('http://localhost:4000/usuario/change-state', mensaje)
    .then(response =>{
        if(response.data.error){
            alert(response.data.message)
        }else{
            alert("Se actualizo el estado con exito")  
            localStorage.removeItem('token-login')
            window.location.reload()          
        }
    }).catch(err=>(
        alert("Por favor intentelo mas tarde")
    ))
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
              <Sidebar 
              pathname = {location.pathname}
              changeUserState = {this.changeUserState}
              />
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