import React from 'react'
import {Link} from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'reactstrap';
import clientRoutes from '../rutas/cliente'

var routes = [
    {
      path: "/dashboard1",
      name: "Dashboard",
      icon: "nc-icon nc-bank",
      component: "<h1>Hola mundo</h1>",
      layout: "/cliente"
    },
    {
      path: "/icons1",
      name: "Icons",
      icon: "nc-icon nc-diamond",
      component: "<h1>Hola mundo</h1>",
      layout: "/cliente"
    },
    {
      path: "/maps1",
      name: "Maps",
      icon: "nc-icon nc-pin-3",
      component: "<h1>Hola mundo</h1>",
      layout: "/cliente"
    },
    {
      path: "/notifications",
      name: "Notifications",
      icon: "nc-icon nc-bell-55",
      component: "<h1>Hola mundo</h1>",
      layout: "/admin"
    },
    {
      path: "/user-page",
      name: "User Profile",
      icon: "nc-icon nc-single-02",
      component: "<h1>Hola mundo</h1>",
      layout: "/admin"
    },
    {
      path: "/tables",
      name: "Table List",
      icon: "nc-icon nc-tile-56",
      component: "<h1>Hola mundo</h1>",
      layout: "/admin"
    },
    {
      path: "/typography",
      name: "Typography",
      icon: "nc-icon nc-caps-small",
      component: "<h1>Hola mundo</h1>",
      layout: "/admin"
    },
    {
      pro: true,
      path: "/upgrade",
      name: "Upgrade to PRO",
      icon: "nc-icon nc-spaceship",
      component: "<h1>Hola mundo</h1>",
      layout: "/admin"
    }
  ];

  
const Sidebar = (props) => {

        return (
            <div>            
            <ListGroup>
            {clientRoutes.map(({name, id}) => (
                <Link key={id} className="client-item" to={`/cliente/${id}`}>
                    <ListGroupItem tag="a" href="#" action>{name}</ListGroupItem>
                </Link>
          )
          )} 
              <ListGroupItem active tag="a" href="#" action>Cras justo odio</ListGroupItem>              
            </ListGroup>            
          </div>
                );
}

export default Sidebar