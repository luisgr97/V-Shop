import React from 'react';
import {

  Dropdown,
  DropdownToggle,
  DropdownMenu,
  
} from "reactstrap";
import producto from '../product01.png'

import '../estilos/cartList.css'

export default class Example extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      number: 0
    }
    this.dropdownToggle = this.dropdownToggle.bind(this)
  }

  dropdownToggle(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }


  render() {
    return (
      <div className="carrito">                                
                            <i className="fa fa-shopping-cart"></i>
                            <div className="qty">{this.props.number}</div>                                                        
                             
      <Dropdown isOpen={this.state.dropdownOpen} 
      toggle={e => this.dropdownToggle(e)} 
      className="clienteOpciones">
        <DropdownToggle caret nav>       
            Carrito
        </DropdownToggle>
        <DropdownMenu right className="cart-dropdown">
            <div className="cart-list">
                <div className="product-widget">
                    <div className="product-img">
                        <img src={producto} alt=""/>
                    </div>
                    <div className="product-body">
                        <h3 className="product-name"><a href="#">product name goes here</a></h3>
                        <h4 className="product-price">$980.00</h4>
                        <button className="product-delete"><i className="fa fa-trash"></i></button>
                    </div>                   
                </div>

                <div className="product-widget">
                    <div className="product-img">
                        <img src={producto} alt=""/>
                    </div>
                    <div className="product-body">
                        <h3 className="product-name"><a href="#">product name goes here</a></h3>
                        <h4 className="product-price">$980.00</h4>
                        <button className="product-delete"><i className="fa fa-trash"></i></button>
                    </div>                   
                </div>

                <div className="product-widget">
                    <div className="product-img">
                        <img src={producto} alt=""/>
                    </div>
                    <div className="product-body">
                        <h3 className="product-name"><a href="#">product name goes here</a></h3>
                        <h4 className="product-price">$980.00</h4>
                        <button className="product-delete"><i className="fa fa-trash"></i></button>
                    </div>                   
                </div>

            </div>
            <div className="cart-summary">
                <small>3 Item(s) selected</small>
                <h5>SUBTOTAL: $2.000.000</h5>
            </div>
            <div className="cart-btns">
                <a href="#">View Cart</a>
                <a href="#">Checkout    <i className="fa fa-arrow-circle-right"></i></a>
            </div>
        </DropdownMenu>
      </Dropdown>
                        </div> 





    );
  }
}
