import React from 'react';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
  
} from "reactstrap";
import { Link } from 'react-router-dom'
import clientRoutes from '../cliente/rutas'

const StoreList = (props) => {
    return (
        <div className="store-list"> 
            <UncontrolledDropdown className="option-list">
                <i className="fa fa-store"></i>  
                <DropdownToggle caret nav>
                Cali
                </DropdownToggle>
                <DropdownMenu right>                    
                    <DropdownItem >Mi cuenta</DropdownItem>                                        
                </DropdownMenu>
            </UncontrolledDropdown>
        </div>
    );
  }

  export default StoreList;