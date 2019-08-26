import React from 'react'
import {Link} from 'react-router-dom'
import { ListGroup, ListGroupItem } from 'reactstrap';
import clientRoutes from './rutas'
  
const Sidebar = (props) => {
  
        return (
          <div id="sidebar">            
            <ListGroup>
            {clientRoutes.map(({name, id}) => (
                <Link key={id} className="client-item" to={`/cliente/${id}`}>
                    <ListGroupItem  active={props.pathname.indexOf(id) > -1} action>{name}</ListGroupItem>
                </Link>
                )
              )
            }          
            <ListGroupItem id="close-acount" action>
              <i className="fa fa-exclamation-triangle"></i>
              <span>Cerrar cuenta</span>
            </ListGroupItem>                  
            </ListGroup>            
          </div>
        );
}

export default Sidebar