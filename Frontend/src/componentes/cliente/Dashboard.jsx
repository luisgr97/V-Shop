import React, {Component} from 'react'
import { Route, Redirect, BrowserRouter } from 'react-router-dom'
import axios from 'axios'

import Sidebar from '../Sidebar'
import { Container, Row, Col } from 'reactstrap';
import Datos from '../Registro'
import Comments from './Comments'
import Purchase from './ClientPurchase'
import Loading from '../Loading'

import clientRoutes from './rutas'

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

class Cliente extends Component {
  constructor(props){
    super(props)
    this.state = {
      cliente: {
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
      },
      loading: true
    }
  };

  componentDidMount(){
    console.log("willmpount1")
    axios.get('http://localhost:4000/usuario/get/' + this.props.idCliente)
    .then((response) => {
      response.data.data.clave=""
      console.log(response.data.data)
      this.setState({
        cliente:response.data.data,
        loading: false
      })
      console.log("willmpount2",this.state.cliente)
    })
    .catch(err=>{
        alert("Intentelo mas tarde cliente")
    })
  }

  render(){
    const {location} = this.props
    const datos = this.state.cliente
    console.log("Estos son los datos",datos)
    /*    
    {clientRoutes.map((ruta) => (
      <Route key={ruta.id} 
      path={`/cliente/${ruta.id}`} 
      render={()=>(
        <ruta.component noRegistro={true} 
        {...this.state.cliente}/>
      )}/>
  ))}*/
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
                datos={this.state.cliente}/>
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
  }
 


export default Cliente