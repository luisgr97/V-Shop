import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import imagen from '../../product01.png'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ProductPage from './ProductPage'
import Cliente from '../cliente/Dashboard'



const product =[
    {
    id: "123654",
    nombre: "XBOX ONE",
    precio: 1000000,
    imagen: imagen,

  }];

  
export class Store extends React.Component{
    constructor(props){
        super(props)
        this.state={
            message: "hola",
            productos: [],
            waveEffect: false
        }
        this.addProduct = this.addProduct.bind(this)
        this.precioTotal = this.precioTotal.bind(this)
        this.eliminarProducto= this.eliminarProducto.bind(this)

    }

    componentDidMount(){
        if(localStorage.getItem('productos')){
          this.setState({
            productos: JSON.parse(localStorage.getItem('productos'))
          })
        }
      }

    componentDidUpdate(){
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
        const valor = e.target.value        
        this.setState(prevState => {
          const productos = prevState.productos.filter(producto => producto.id !== valor);
          return { productos };
        });          
    }

    addProduct(mensaje){
        let product = this.state.productos
        product.push(mensaje)
        this.setState({
            productos : product,
            waveEffect: true
        }, ()=>{
          window.setTimeout(() => {
            this.setState({
              waveEffect: false
            })
          }, 900)
        })
        console.log(this.state.productos)        
    }

    render(){
        return(
            <React.Fragment>
                <Header                     
                    nombre={this.props.nombre}
                    login={this.props.login}                                 
                    logueado={this.props.logueado} 
                    eliminarProducto = {this.eliminarProducto}   
                    waveEffect = {this.state.waveEffect} 
                    productos = {this.state.productos}   
                    precioTotal = {this.precioTotal}                
                />                                       
                <Switch>
                    

                    <Route path="/producto/:id_producto" render={() => 
                            <ProductPage/>  
                    }/>

                    <Route exact path="/" render={() =>
                        <Main addProduct={this.addProduct}/>  
                    }/>

                    <Route render={() => (<h1>Pagina no encontrada</h1>)} />

                </Switch>  
                <Footer/>  
            </React.Fragment>
        )
    }
}

export default Store;