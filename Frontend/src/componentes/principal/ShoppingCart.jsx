import React from 'react';
import {Link} from 'react-router-dom'
import Checkout from './Checkout'
import { ProductContext, ProductContextConsumer } from './Context'

import {
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown  
} from "reactstrap";

import '../../estilos/shopping-cart.css'

export default class ShoopingCart extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      openModal: false,
    }
    this.handleOnBuyClik = this.handleOnBuyClik.bind(this)
  }

  handleOnBuyClik(){
    this.setState({
      openModal: !this.state.openModal
    })
  }

  componentDidUpdate(){
    console.log("Se actulaizdo esta monda")
  }
  render() {

    //Componenete consumidor con estado
    const {productos, precioTotal, waveEffect} = this.context;
    const numPorductos = productos.length
    return (
      <div className="carrito">                                
        <i className="fa fa-shopping-cart"></i>
        <div className={waveEffect? "qty_animated" : "qty"}>{numPorductos}</div>                                                        
                             
        <UncontrolledDropdown 
            className="option-list">
          <DropdownToggle caret nav>       
              Carrito
          </DropdownToggle>
          <DropdownMenu right className="cart-dropdown">
              <div className="cart-list">

                {productos.map((product, index) => (
                  <div className="product-widget" key={product.id+index}>
                      <div className="product-img">
                          <img src={product.imagen} alt=""/>
                      </div>
                      <div className="product-body">
                          <h3 className="product-name">
                            <Link to={`/producto/${product.id}`}>{product.nombre}</Link>
                          </h3>
                          <h4 className="product-price">${product.precio}</h4>
                          <ProductContextConsumer>
                            {({eliminarProducto}) => (
                              <button value={product.id} 
                                className="fa fa-trash product-delete" 
                                onClick={eliminarProducto}
                              />
                            )}
                          </ProductContextConsumer>
                      </div>                   
                  </div>
                ))} 
                               
              </div>
              <div className="cart-summary">
                  <small>{numPorductos}
                        {numPorductos!==1 ? 
                          " productos agregados" : 
                          " producto agregado"} 
                  </small>
                  <h5>{numPorductos? `TOTAL ${precioTotal()}`: "Carrito vacio"}</h5>
              </div>
              {numPorductos? 
                <div className="cart-btns">                   
                    <div onClick={this.handleOnBuyClik}>Comprar    <i className="fa fa-arrow-circle-right"></i></div>
                </div>: ""
              }
              
          </DropdownMenu>
        </UncontrolledDropdown>
        <Checkout 
          switchModal = {this.handleOnBuyClik} 
          openModal={this.state.openModal}
        />
      </div> 
    );
  }
}

ShoopingCart.contextType = ProductContext; 
