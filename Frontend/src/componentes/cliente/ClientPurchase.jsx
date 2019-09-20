import React from 'react'
import { UncontrolledCollapse } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

import '../../estilos/client-purchases.css'

const Factura = (props) =>{
    console.log("haver", props)
    return(        
        <div>
            <ListGroupItem id={`toogler${props.id_factura}`} action>
            {`Factura N° ${props.id_factura}`}
            </ListGroupItem>
            <UncontrolledCollapse toggler={`#toogler${props.id_factura}`}>
            <div className="order-details">
                <div className="order-summary">
                    <div className="order-col">
                        <div><strong>PRODUCTOS</strong></div>
                        <div><strong>VALOR</strong></div>
                    </div>
                    <div className="order-products">
                        
                    {props.detalle_facturas.map((indice, index) => (
                            <div className="order-col" key={indice.num_detalle+index}>
                                <div>
                                    <b>{`${indice.cantidad_comprada}`}</b>
                                    {` x  ${indice.producto.nombre_producto}`}
                                    <span className="bill-city">{` de ${indice.catalogo.ciudad}`}
                                    {` con ${indice.descuento*100}% de descuento`}</span>
                                </div>
                            <div>{indice.precio_actual}</div>
                        </div>
                        ))}                
                    </div>
                    <div className="order-col">
                        <div><strong>TOTAL PAGADO</strong></div>
                        <div><strong className="order-total">${props.total}</strong></div>
                    </div>
                </div>           
            </div>
            </UncontrolledCollapse>
        </div>        
    )
}
const Purchase = (props) =>{
    return(
        <ListGroup className="listaCompras">
            {props.bills.map((indice) => (
                <Factura key={indice.fecha+indice.id_factura} 
                {...indice}/>
            ))}
        
        </ListGroup>
    )
}

export default Purchase;