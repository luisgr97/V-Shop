import React from 'react'
import logo from '../logo2a.png'
import {Link} from 'react-router-dom'
import Example from './userList'
import Cart from './shoppingCart'
import {Button} from 'reactstrap'
import producto from '../product01.png'

const Header = (props) => {
    return(
        <div id="header">
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="header-logo">
                    <Link className="logo" to={"/"} ><img src={logo} alt=""/></Link> 
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="header-search">
                        <form>
                            <select className="input-select">
                                <option value="0">Categorias</option>
                                <option value="1">Computadores</option>
                                <option value="1">Celulares</option>
                            </select>
                            <input className="input" placeholder="Buscar producto"/>
                            <button className="search-btn">Buscar</button>
                        </form>
                    </div>
                </div>

                <div className="col-md-3 clearfix">
                    <div className="header-ctn">
                        
                        <div className="carrito">                                
                            <i className="fa fa-shopping-cart"></i>
                            <div className="qty">3</div>                                                        
                                <Cart/>                          
                        </div>                            

                        <div className="ingresarCliente">
                            <i className="fa fa-user"></i>
                            {
                                props.logueado?
                                <Example/> :
                                <Link to="/cliente">
                                    Ingresar
                                </Link>
                            }                                                      
                        </div>
                        
                        <div className="menu-toggle">
                            <a href="#">
                                <i className="fa fa-bars"></i>
                                <span>Menu</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Header;