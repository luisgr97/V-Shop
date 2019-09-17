import React from 'react'
import {  Route, Redirect, Switch } from 'react-router-dom'
import { Fade } from 'reactstrap';

import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import Cliente from '../cliente/Dashboard'
import ProductPage from './ProductPage'
import Loading from './Loading'
import Axios from 'axios';

class Store extends React.Component {
    constructor(props){
        super(props)
        this.state={
            //loading: true,
            idCatalog: 2,
            productos: [],
            waveEffect: false,
            count: 0
        }
        this.changeIdCatalog = this.changeIdCatalog.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.precioTotal = this.precioTotal.bind(this)
        this.eliminarProducto= this.eliminarProducto.bind(this)
    }
/*
    componentDidMount(){
        axios.get('http://localhost:4000/api/catalogos/get')
        .then(response => {
            if(response.data.error){
                alert(response.data.message)
            }else{
                this.setState({
                    idCatalog: response.data[0].id_catalogo,
                    //loading: false
                })
            }
        })
    }
*/
/*
    shouldComponentUpdate(nextProps, nextState){
        return nextState.idCatalog !== this.state.idCatalog    
    }
*/
    componentDidMount(){
        if(localStorage.getItem('productos')){
        this.setState({
            productos: JSON.parse(localStorage.getItem('productos')),
            count: this.state.count + 1
        })
        }
    }
    
    shouldComponentUpdate(nextProps, nextState){
    return this.state.count !== nextState.count || this.props.logueado !== nextProps.logueado
    }
    



    componentDidUpdate(){
    console.log("Se ejecuta el didupdate", this.state.productos)
    localStorage.setItem('productos', JSON.stringify(this.state.productos))    
    }

    precioTotal(){
        let total = 0;
        for(var i=0;i<this.state.productos.length;i++){
        total += this.state.productos[i].precio
        }
        return total;
    }

    eliminarProducto = (e) =>{
    this.setState({
        productos: this.state.productos.filter(producto => producto.id !== e.target.value  ),
        count: this.state.count + 1
    
    });             
    }

    addProduct(mensaje){
        console.log("Se ejecuta")
        let product = this.state.productos
        product.push(mensaje)
        this.setState({
            productos : product,
            waveEffect: true,
            count: this.state.count + 1
        }, ()=>{
        window.setTimeout(() => {
            this.setState({
            waveEffect: false,
            count: this.state.count + 1
            })
        }, 900)
        })
    }


    changeIdCatalog(e){
        this.setState({
            idCatalog: e.target.value,
            count: this.state.count + 1
        })
    }


    render(){
        return(
                <Fade in={true} >
                    <Header                     
                        nombre={this.props.nombre}
                        login={this.props.login}                                 
                        logueado={this.props.logueado}   

                        idCatalog = {this.state.idCatalog}
                        changeCatalog = {this.changeIdCatalog}

                        productos={this.state.productos}
                        precioTotal={this.precioTotal}
                        eliminarProducto={this.eliminarProducto}                        
                        waveEffect={this.state.waveEffect}
                    />                                       
                    <Switch>
                        <Route path="/cliente" render={({location}) =>
                            this.props.logueado ? 
                            <Cliente location = {location}
                                idCliente={this.props.idCliente}                                                                    
                            /> : <Redirect to="/login" />
                                                            
                        }/>

                        <Route path="/producto/:id_producto" render={() => 
                            <ProductPage idCatalog={this.state.idCatalog}/>  
                        }/>

                        <Route exact path="/" render={() =>
                            <Main 
                            idCatalog={this.state.idCatalog}
                            addProduct={this.addProduct}
                            />  
                        }/>

                        <Route render={() => (<h1>Pagina no encontrada</h1>)} />
                    </Switch>  
                    <Footer/>  
                </Fade> 
        )
    }
}

export default Store;