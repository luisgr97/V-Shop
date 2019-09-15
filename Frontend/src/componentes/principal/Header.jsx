import React from 'react'
import {Link} from 'react-router-dom'
import UserList from './UserList'
import Cart from './ShoppingCart'

import logo from '../../imagenes/logo-white.png'
import '../../estilos/header.css'

const Header = (props) => {
    console.log("header")
    return(        
        <div id="header">
        <div className="container">
            <div className="row">
                <div className="col-md-auto">
                    <div className="header-logo">
                    <Link className="logo" to={"/"} ><img src={logo} alt=""/></Link> 
                    </div>
                    
                </div>
                
                <div className="col">
                
                    <div className="header-search">
                        <form>                            
                            <select className="input-select">
                                <option value="0">Cali</option>                                
                                <option value="1">Medellin</option>
                            </select>
                            <input className="input" placeholder="Buscar producto"/>
                            <button className="search-btn"><i className="fas fa-search"></i> </button>
                        </form>
                    </div>
                </div>

                <div className="col-md-auto">
                    <div className="header-ctn">
                                                                                          
                        <Cart number={props.number}/>                                                                       
                        <div className="ingresarCliente">
                            <i className="fa fa-user"></i>
                            {
                                props.logueado?
                                <UserList name={props.nombre} 
                                    login={props.login}
                                /> :
                                <Link to="/login">
                                    Ingresar
                                </Link>
                            }                                                      
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Header;