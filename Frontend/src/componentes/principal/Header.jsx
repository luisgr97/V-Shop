import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import UserList from './UserList'
import Cart from './ShoppingCart'

import logo from '../../imagenes/logo-white.png'
import '../../estilos/header.css'

class Header extends React.Component {
    constructor(props){
        super(props)
        this.state={
            catalogs: []
        }
    }
    

    componentDidMount(){
        axios.get('http://localhost:4000/api/catalogos/get')
        .then(response => {
            if(response.data.error){
                alert(response.data.message)
            }else{
                this.setState({
                    catalogs: response.data
                })
            }
        })
    }

    render(){
        console.log("Se imprime?",this.props.idCatalog)
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
                                <select value={this.props.idCatalog} 
                                    onChange={this.props.changeCatalog} 
                                    className="input-select">
                                    {this.state.catalogs.length===0?
                                        <option value="1">Cali</option> :
                                        
                                        this.state.catalogs.map((catalog, i) => (
                                            <option key={`city${i}`} 
                                                value={catalog.id_catalogo}>
                                                {catalog.ciudad}
                                            </option>
                                        ))
                                        

                                    }
                                                                    
                                    
                                </select>
                                <input className="input" placeholder="Buscar producto"/>
                                <button className="search-btn"><i className="fas fa-search"></i> </button>
                            </form>
                        </div>
                    </div>

                    <div className="col-md-auto">
                        <div className="header-ctn">
                                                                                            
                            <Cart
                                productos={this.props.productos}
                                precioTotal={this.props.precioTotal}
                                eliminarProducto={this.props.eliminarProducto}                        
                                waveEffect={this.props.waveEffect}
                            />                                                                       
                            <div className="ingresarCliente">
                                <i className="fa fa-user"></i>
                                {
                                    this.props.logueado?
                                    <UserList name={this.props.nombre} 
                                        login={this.props.login}
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
}
export default Header;