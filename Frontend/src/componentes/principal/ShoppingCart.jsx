import React from 'react';
import {Link} from 'react-router-dom'
import Checkout from './Checkout'

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

  render() {
    //Componenete consumidor con estado
    const {productos, waveEffect, eliminarProducto} = this.props;
    const precioTotal = this.props.precioTotal()
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
                          {product.descuento!==0?
                            <h4 className="product-discount">Descuento de {product.descuento*100}%</h4> : null
                          }
                                                                       
                          <h4 className="product-price">${product.precio}</h4>                          
                              <button value={product.id} 
                                className="fa fa-trash product-delete" 
                                onClick={eliminarProducto}
                              />
                            
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
                  <h5>{numPorductos? `TOTAL ${precioTotal}`: "Carrito vacio"}</h5>
              </div>
              {numPorductos? 
              this.props.logueado?
              <div className="cart-btns">                   
                  <div onClick={this.handleOnBuyClik}>Comprar    <i className="fa fa-arrow-circle-right"></i></div>
                </div>
                : 
                <div className="cart-btns">                   
                    <Link to="/login">
                      <div>Comprar    <i className="fa fa-arrow-circle-right"></i></div>
                    </Link>
                </div>
                 : ""
              }
              
          </DropdownMenu>
        </UncontrolledDropdown>
        <Checkout 
          idCliente={this.props.idCliente}
          precioTotal = {precioTotal}
          productos = {productos}
          switchModal = {this.handleOnBuyClik} 
          openModal={this.state.openModal}
        />
      </div> 
    );
  }
}
