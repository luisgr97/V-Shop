import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Container, Row, Col } from 'reactstrap';

import clientRoutes from '../rutas/cliente'

const propiedades2={
  tipo: "CC",
  numero: "12151518",
  nombre: "Esneider Manzano",
  apellidos: "Aranago",
  correo: "esneider.manzano@correounivalle.edu.co",
  clave: "stefierrote",
  direccion: "Cra 28 C # 54 - 123",
  nacimiento: "1995-10-18",
  cumpleanios: "1995-10-18",
  textoBoton: "ACTUALIZAR"
}; 

function Topics ({ match }) {
  return (
    <Container>
      <div id="espacio"/>
      <Row>
        <Col xs="3">
          <Sidebar/>
        </Col>
        <Col xs="9">
          {clientRoutes.map((ruta) => (
              <Route key={ruta.id} path={`/cliente/${ruta.id}`} render={()=>(<ruta.component {...propiedades2}/>)}/>
          ))}
        </Col>
      </Row>
      <Redirect to="/cliente/data"/>

    </Container>
    
  )
}


export default Topics