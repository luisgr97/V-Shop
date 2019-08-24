import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import Registro from '../Registro'
import WhiteLogo from '../../imagenes/logo-white.png'
import { Route, Switch, Link } from 'react-router-dom'
import adminRoutes from './rutas'
import Articulo from './Productos'

const propiedades={
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

export default class Example extends React.Component {
  render() {
    return (
      <div id="admin-zone">        
        <Nav vertical pills id="admin-sidebar">
        <img src={WhiteLogo} height="60" width="189"/>
        <div id="linea"/>
        <Link to={`/manager/${adminRoutes[0].id}` } 
          className={true? "nav-link" : "nav-link active"}>
          <NavItem>
            <i className="fa fa-university"></i>
            <span>Dashboard</span>
          </NavItem>
        </Link>

      {adminRoutes.map((ruta) => (
        <Link key={ruta.id} to={`/manager/${ruta.id}` } 
          className={true? "nav-link" : "nav-link active"}>
          <NavItem>
            <i className="fa fa-university"></i>
            <span>{ruta.name}</span>
          </NavItem>
      </Link>
      ))}
       
        <Link to="/manager/datos"
          className={true? "nav-link" : "nav-link active"}>
          <NavItem>
            <i className="fa fa-university"></i>
            <span>Mis datos</span>
          </NavItem>
        </Link>

        <Link to={`/manager/${adminRoutes[0].id}` } 
          className={true? "nav-link" : "nav-link active"}>
          <NavItem>
            <i className="fa fa-university"></i>
            <span>Cerrar cesion</span>
          </NavItem>
        </Link>
        </Nav>


        <div id="admin-main">
        <Switch> 
        {adminRoutes.map((ruta) => (
          <Route path={`/manager/${ruta.id}`} 
            render={()=>(
              <ruta.component/>
          )}/>
        ))}
          

          <Route path="/manager/datos" 
            render={()=>(
              <Registro actualizar={true} 
              datos={propiedades}
              login={true}/>
          )}/>

        </Switch> 
            
      </div>
      </div>
    );
  }
}