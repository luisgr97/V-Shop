import React from 'react'
import { UncontrolledCollapse } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

import '../../estilos/client-purchases.css'

const Factura = (props) =>{
    return(
        <div>
             <ListGroupItem id={`toogler${props.indice}`} action>
            Factura N°12548
            </ListGroupItem>
        <UncontrolledCollapse toggler={`#toogler${props.indice}`}>
        <div className="order-details">
            <div className="order-summary">
                <div className="order-col">
                    <div><strong>PRODUCTOS</strong></div>
                    <div><strong>VALOR</strong></div>
                </div>
                <div className="order-products">
                    <div className="order-col">
                        <div>1x Product Name Goes Here</div>
                        <div>$980.00</div>
                    </div>
                    <div className="order-col">
                        <div>2x Product Name Goes Here</div>
                        <div>$980.00</div>
                    </div>
                </div>
                <div className="order-col">
                    <div><strong>TOTAL PAGADO</strong></div>
                    <div><strong className="order-total">$2940.00</strong></div>
                </div>
            </div>           
            {/*<a href="#" className="primary-btn order-submit">Place order</a>*/}
        </div>
        </UncontrolledCollapse>
        </div>
    )
}
const Purchase = () =>{
    const arreglo = [1,2,3,4,5,6]
    return(
        <ListGroup className="listaCompras">
            {arreglo.map((indice) => (
                <Factura key={indice} indice={indice}/>
            ))}
        
        </ListGroup>
    )
}

export default Purchase;