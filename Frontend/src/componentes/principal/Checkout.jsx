import React from 'react';
import { Modal, ModalHeader, ModalBody, FormGroup, CustomInput } from 'reactstrap';

import '../../estilos/cart-list-pay.css'

class CartToPay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: this.props.openModal,
			payMetod: ""
		};

		//this.toggle = this.toggle.bind(this);
		this.handleRadioChange = this.handleRadioChange.bind(this)
	}
/*
	toggle() {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}
*/
	handleRadioChange = changeEvent => {
		this.setState({
			payMetod: changeEvent.target.value
		});
	}

	render() {
		return (
			<div>
				<Modal isOpen={this.props.openModal} toggle={this.props.switchModal} id="detalle-carrito">
					<ModalHeader toggle={this.props.switchModal}>Iniciar compra</ModalHeader>
					<ModalBody>
						<div className="col-md-12 order-details">
							<div className="section-title text-center">
								<h3 className="title">Tu pedido</h3>
							</div>
							<div className="order-summary">
								<div className="order-col">
									<div><strong>PRODUCTO</strong></div>
									<div><strong>TOTAL</strong></div>
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
									<div>Shiping</div>
									<div><strong>FREE</strong></div>
								</div>
								<div className="order-col">
									<div><strong>TOTAL</strong></div>
									<div><strong className="order-total">$2940.00</strong></div>
								</div>
							</div>
							<div className="payment-method">

								<FormGroup check inline>
									<CustomInput type="radio" id="tarjeta"
										name="customRadio" value="tarjeta"
										checked={this.state.payMetod === 'tarjeta'}
										onChange={this.handleRadioChange}
									/>Tarjeta Debito o Cretido
                        		</FormGroup>

								<FormGroup check inline>
									<CustomInput type="radio" id="banco"
										name="customRadio" value="banco"
										checked={this.state.payMetod === 'banco'}
										onChange={this.handleRadioChange}
									/>Transferencia Bancaria
                       			</FormGroup>

							</div>
							<CustomInput type="checkbox" id="exampleCustomCheckbox" >
								He leido y acepto los terminos y condiciones
							</CustomInput>

							<a onClick={this.props.switchModal} className="primary-btn order-submit">
								Realizar pedido
						</a>
						</div>
					</ModalBody>

				</Modal>
			</div>
		);
	}
}

export default CartToPay;