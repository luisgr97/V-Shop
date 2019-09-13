import React from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom'

import { Nav, NavItem } from 'reactstrap';
import Registro from '../principal/Registro'
import WhiteLogo from '../../imagenes/logo-white.png'
import adminRoutes from './rutas'

import '../../estilos/admon.css'
const propiedades = {
  tipo_documento: "CC",
  numero_documento: "",
  nombres: "",
  apellidos: "",
  telefono: "",
  direccion: "",
  fecha_de_nacimiento: "",
  correo: "",
  nick: "",
  clave: "",
};

const propiedades2={
  tipo_documento: "CC",
  numero_documento: "12151518",
  nombres: "Esneider Manzano",
  apellidos: "Aranago",
  telefono: "4455971",
  direccion: "Cra 28 C # 54 - 123",
  fecha_de_nacimiento: "1995-10-18",
  correo: "esneider.manzano@correounivalle.edu.co",
  nick: "loquendomanzano",
  clave: "",       
};

export default class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id_usuario: this.props.userId,
      nick: this.props.userNick
    }
  }
  render() {
    console.log(this.props.userId, " ", this.props.userNick)
    return (
      <div id="admin-zone">
        <Nav vertical pills id="admin-sidebar">
          <img alt="" src={WhiteLogo} height="60" width="189" />
          <div id="linea" />

          {adminRoutes.map((ruta) => (
            <Link key={ruta.id} to={`/manager/${ruta.id}`}
            className={this.props.location.pathname.indexOf(ruta.id) > -1?
            "nav-link active" : "nav-link"}>
              <NavItem>
                <i className="fa fa-university"></i>
                <span>{ruta.name}</span>
              </NavItem>
            </Link>
          ))}

          <Link to="/manager/datos"
            className={this.props.location.pathname.indexOf('datos') > -1?
              "nav-link active" : "nav-link"}>
            <NavItem>
              <i className="fa fa-university"></i>
              <span>Mis datos</span>
            </NavItem>
          </Link>

          <Link to="/manager/gerentes"
            className={this.props.location.pathname.indexOf('gerentes') > -1?
            "nav-link active" : "nav-link"}>
            <NavItem>
              <i className="fa fa-university"></i>
              <span>Gerentes</span>
            </NavItem>
          </Link>

          <Link to={`/manager/${adminRoutes[0].id}`}          
            className={true ? "nav-link" : "nav-link active"}>
            <NavItem>
              <i className="fa fa-university"></i>
              <span>Cerrar cesion</span>
            </NavItem>
          </Link>
        </Nav>


        <div id="admin-main">
          <Switch>
            {adminRoutes.map((ruta) => (
              <Route key={ruta.id} path={`/manager/${ruta.id}`}
                render={() => (
                  <ruta.component />
                )} />
            ))
            }

            <Route path="/manager/datos" render={() => (
                <Registro actualizar={true}
                  idCliente={this.props.id_usuario}
                  datos={propiedades2}
                  mensaje={"ACTUALIZAR"} />
            )}/>

            <Route path="/manager/gerentes" render={() => (
                <Registro isManager={true}  
                  actualizar={false}                  
                  datos={propiedades}
                  mensaje={"REGISTRAR GERENTE"} />
            )}/>

          </Switch>

        </div>
        <Redirect to={`/manager/${adminRoutes[0].id}`}/>
      </div>
    );
  }
}