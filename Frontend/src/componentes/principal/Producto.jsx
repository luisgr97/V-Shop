import React from 'react'
import {Link} from 'react-router-dom'

import '../../estilos/producto.css'

const Producto = (props) =>{
    return(
        
        <div className="product">
            <Link to="/">
            <div className="product-img">
            <img src={props.imagen} className="App-logo" alt="logo" />
                <div className="product-label">
                    <span className="sale">-{props.descuento}%</span>
                    <span className="new">NEW</span>
                </div>
            </div>
            <div className="product-body">
                <p className="product-category">{props.categoria}</p>
                <h3 className="product-name">{props.nombre}</h3>
                <h4 className="product-price">${props.precio} <del className="product-old-price">$990.00</del></h4>
                <div className="product-rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                </div>                
            </div>
            <div className="add-to-cart">
                <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> al carrito</button>
            </div>
            </Link>
        </div>

    )
}

export default Producto;