import React from 'react';
import {

  Dropdown,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown
  
} from "reactstrap";
import imagen from '../product01.png'
import {Link} from 'react-router-dom'

import '../estilos/cartList.css'


const product={
  id: "123654",
  nombre: "XBOX ONE",
  descripcion: "COnsola para jugar bien bacano",
  marca: "SONY",
  precio: "1000000",
  imagen: imagen,
  categoria: "Consolas",
  descuento: 0
};


export default class Example extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      number: 0,
      productos: [
        {
        id: "123654",
        nombre: "XBOX ONE",
        descripcion: "COnsola para jugar bien bacano",
        marca: "SONY",
        precio: 1000000,
        imagen: imagen,
        categoria: "Consolas",
        descuento: 0
      },
      {
        id: "13654",
        nombre: "XBOX ONE",
        descripcion: "COnsola para jugar bien bacano",
        marca: "SONY",
        precio: 1000000,
        imagen: imagen,
        categoria: "Consolas",
        descuento: 0
      },
      {
        id: "136054",
        nombre: "XBOX ONE",
        descripcion: "COnsola para jugar bien bacano",
        marca: "SONY",
        precio: 1000000,
        imagen: imagen,
        categoria: "Consolas",
        descuento: 0
      }]
    }
    this.producto = this.producto.bind(this)
    this.precioTotal = this.precioTotal.bind(this)
    this.eliminarProducto= this.eliminarProducto.bind(this)
  }

  
  componentWillMount(){
    if(localStorage.getItem('productos')){
      this.setState({
        productos: JSON.parse(localStorage.getItem('productos'))
      })
    }else{
      this.setState({
        productos: []
      })
    }
  }

  componentDidUpdate(){
    localStorage.setItem('productos', JSON.stringify(this.state.productos))
  }

  eliminarProducto = (e) =>{
    const valor = e.target.value
    this.setState(prevState => {
      const productos = prevState.productos.filter(producto => producto.id != valor);
      return { productos };
    });  
  }

  producto = (product, index) =>{
    return(
        <div className="product-widget" key={product.id}>
            <div className="product-img">
                <img src={product.imagen} alt=""/>
            </div>
            <div className="product-body">
                <h3 className="product-name">
                  <Link to={`/producto/${product.id}`}>{product.nombre}</Link>
                </h3>
                <h4 className="product-price">${product.precio}</h4>
                
                <button value={product.id} 
                  className="fa fa-trash product-delete" 
                  onClick={this.eliminarProducto}
                />
            </div>                   
        </div>
    )
  }

  precioTotal(){
    let total = 0;
    for(var i=0;i<this.state.productos.length;i++){
      total += this.state.productos[i].precio
    }
    return total;
  }

  render() {
    const numPorductos = this.state.productos.length
    return (
      <div className="carrito">                                
        <i className="fa fa-shopping-cart"></i>
        <div className="qty">{numPorductos}</div>                                                        
                             
        <UncontrolledDropdown 
        className="clienteOpciones">
          <DropdownToggle caret nav>       
              Carrito
          </DropdownToggle>
          <DropdownMenu right className="cart-dropdown">
              <div className="cart-list">
                {this.state.productos.map((producto, index) => (
                  this.producto(producto, index)
                ))}                
              </div>
              <div className="cart-summary">
                  <small>{numPorductos}
                        {numPorductos!=1 ? 
                          " productos agregados" : 
                          " producto agregado"} 
                  </small>
                  <h5>{numPorductos? `TOTAL ${this.precioTotal()}`: "Carrito vacio"}</h5>
              </div>
              {numPorductos? 
                <div className="cart-btns">
                    <a href="#">View Cart</a>
                    <a href="#">Checkout    <i className="fa fa-arrow-circle-right"></i></a>
                </div>: ""
              }
              
          </DropdownMenu>
        </UncontrolledDropdown>
      </div> 





    );
  }
}
