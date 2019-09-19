import React from 'react';
import { Label, 
	Input, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	FormGroup, 
	CustomInput, 
	Collapse,
	Progress, 
	ListGroup,
	ListGroupItem,
	UncontrolledCollapse,
	Spinner } from 'reactstrap';

import Cards from '../../imagenes/credit-card.png'
import '../../estilos/checkout.css'
import Axios from 'axios';

class CartToPay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {	
			loading: false,		
			unique: true,
			uniquePayMethod: "",
			uniqueNumber: "",
			uniqueBanco: 'Bancolombia',
			cuotas: 1,
			multiple: false,
			payments: []		
		};

		//this.toggle = this.toggle.bind(this);
		this.realizarVenta = this.realizarVenta.bind(this)
		this.hadlePayMethod = this.hadlePayMethod.bind(this)
		this.handleRadioChange = this.handleRadioChange.bind(this)
		this.nestedRadioChange = this.nestedRadioChange.bind(this)
		this.addPayMethod = this.addPayMethod.bind(this)
		this.deletePayMethod = this.deletePayMethod.bind(this)
		this.onChange = this.onChange.bind(this)
		this.onNestedChange = this.onNestedChange.bind(this)
		this.otherPayMethod = this.otherPayMethod.bind(this)
	}

	realizarVenta(){
		this.setState({
			loading: true
		})
		let bancoEntidad = "Ninguno", cuotas = this.state.cuotas;
		let detalles = [], pagos =[];
		this.props.productos.forEach(product=>{
			detalles.push({
				id_producto: product.id,
				id_catalogo: 2,
				cantidad_comprada: 1,
				descuento: product.descuento,
				precio_actual: product.precio
			})
		})
		if(this.state.unique){
			if(this.state.uniquePayMethod==='efecty'){
				bancoEntidad = 'Efecty'
				cuotas = 1
			}else if(this.state.uniquePayMethod==='banco'){
				bancoEntidad = this.state.uniqueBanco
				cuotas = 1
			}
			pagos.push({
				modo_de_pago: this.state.uniquePayMethod,
				banco_entidad: bancoEntidad,
				numero_tarjeta_cuenta: this.state.uniqueNumber,
				monto_del_pago: this.props.precioTotal,
				cuotas: cuotas
			})
		}else{
			this.state.payments.forEach(pay=>{
				if(pay.uniquePayMethod==='efecty'){
					bancoEntidad = 'Efecty'
					cuotas = 1
				}else if(pay.uniquePayMethod==='banco'){
					bancoEntidad = this.state.uniqueBanco
					cuotas = 1
				}
				pagos.push({
					modo_de_pago: pay.uniquePayMethod,
					banco_entidad: bancoEntidad,
					numero_tarjeta_cuenta: pay.uniqueNumber,
					monto_del_pago: pay.monto,
					cuotas: pay.cuotas
				})
			})
		}
		const mensaje ={
			id_cliente: this.props.idCliente,
			total: this.props.precioTotal,
			detalles: detalles,
			pagos: pagos
		}
		Axios.post('http://localhost:4000/api/factura/create', mensaje)
		.then(response=> {
			if(response.data.error){
				alert(response.data.message)
			}else{
				alert(response.data.message)
				this.setState({
					loading: false
				})
			}
		}).catch(err=>(
			alert("Error al procesar el pedido")
		))
		console.log(mensaje)
	}

	//Elegir el tipo de pago, unico o particionado
	hadlePayMethod(e){
		const value = e.target.value === "unique"? true : false
		this.setState({
			unique: value,
			multiple: !value
		})
	}

	handleRadioChange = changeEvent => {
		this.setState({
			uniquePayMethod: changeEvent.target.value
		});
	}

	nestedRadioChange(e, index){
		let copy = this.state.payments
		copy[index].uniquePayMethod = e.target.value
		this.setState({
			payments: copy
		})
	}

	addPayMethod(){
		let copy = [...this.state.payments]
		let pay = {
			uniquePayMethod: "",
			uniqueNumber: "",
			uniqueBanco: 'Bancolombia',
			cuotas: 1,
			monto: 0
		}
		copy.push(pay)
		this.setState({
			payments: copy
		})
	}


	deletePayMethod(e){
		let copy = [...this.state.payments]
		copy = copy.filter((element, i) => (i!== parseInt(e.target.value)))
		
		this.setState({
			payments: copy
		})
		
	}

	onChange = input => e => {
        this.setState({ [input]: e.target.value });
	}
	
	onNestedChange(e, index, state){
		let copy = [...this.state.payments]		
		copy[index][state] = e.target.value
        this.setState({ 
			payments: copy 
		});
	}
	
	otherPayMethod(index, total){
		let mensaje = ""
		if(this.state.payments[index].uniquePayMethod===''){
		}else if(this.state.payments[index].uniquePayMethod==='credito'){
			mensaje = "Numero de la tarjeta"
		}else if(this.state.payments[index].uniquePayMethod==='debito'){
			mensaje = "Numero de tarjeta"
		}else if(this.state.payments[index].uniquePayMethod==='banco'){
			mensaje = "Numero de cuenta"
		}else{
			mensaje = "Numero de recibo"
		}
		let subTotal = total
		for(var i=0;i<this.state.payments.length; i++){
			if(i!==index){
				subTotal =  subTotal - this.state.payments[i].monto
			}
			
		}
		return(
			<div className="payment-method" >
				<FormGroup check inline>
					<CustomInput type="radio" id={`credito${index}`}
						name={`customRadio${index}`} value="credito"
						checked={this.state.payments[index].uniquePayMethod === 'credito'}
						onChange={(e)=>{this.nestedRadioChange(e, index)}}
					/>Tarjeta de Cretido
				</FormGroup>

				<FormGroup check inline>
					<CustomInput type="radio" id={`banco${index}`}
						name={`customRadio${index}`} value="banco"
						checked={this.state.payments[index].uniquePayMethod === 'banco'}
						onChange={(e)=>{this.nestedRadioChange(e, index)}}
					/>Transferencia Bancaria
				</FormGroup>

				<FormGroup check inline>
					<CustomInput type="radio" id={`debito${index}`}
						name={`customRadio${index}`} value="debito"
						checked={this.state.payments[index].uniquePayMethod === 'debito'}
						onChange={(e)=>{this.nestedRadioChange(e, index)}}
					/>Tarjeta de Debito 
				</FormGroup>

				<FormGroup check inline>
					<CustomInput type="radio" id={`efecty${index}`}
						name={`customRadio${index}`} value="efecty"
						checked={this.state.payments[index].uniquePayMethod === 'efecty'}
						onChange={(e)=>{this.nestedRadioChange(e, index)}}
					/>Efecty
				</FormGroup>
				{/*Las opciones para el pago unico*/}
				<br/><br/>
				{this.state.payments[index].uniquePayMethod==="credito"?
				<React.Fragment>
					<div className="form-group">											
						<label>
						Cuotas a pagar 
						<b className="number-cuotas" > {this.state.payments[index].cuotas}</b>
						</label>
						<input type="range" min="1" max="36" className="slider" 
						value={this.state.payments[index].cuotas} 
						onChange={(e)=>{this.onNestedChange(e, index, 'cuotas')}}/>										 
					</div>
					<div className="center">
						<img src={Cards} alt="tipos de tarjeta"/>
					</div>
					</React.Fragment> : null
				}
				
				{this.state.payments[index].uniquePayMethod==="debito"?
				<div className="center">
					<img src={Cards} alt="tipos de tarjeta"/>
				</div> : null 
				}
				{this.state.payments[index].uniquePayMethod==="efecty"?
					<React.Fragment>											
						<div className="pay-message">
							Realice una consigancion al numero: <b>VSHOP5599718456</b><br/>
							Verificaremos que el pago se realizo segun el numero de recibo
							y sus datos de usuario
						</div>																				
					</React.Fragment> : null
				}

				{this.state.payments[index].uniquePayMethod==="banco"?
					<React.Fragment>
						<FormGroup>
						<Label for="exampleSelect">Seleccione un banco</Label>
						<Input type="select" name="select" 
						value={this.state.payments[index].uniqueBanco}
						onChange={(e)=>{this.onNestedChange(e, index, 'uniqueBanco')}}>
							<option>AV Villas</option>
							<option>Bancolombia</option>
							<option>BBVA</option>
							<option>Bogota</option>
							<option>Caja Social</option>
							<option>Davivienda</option>	
							<option>Occidente</option>											
							<option>Popular</option>
						</Input>
						</FormGroup>																																							
					</React.Fragment> : null
				}

				{this.state.payments[index].uniquePayMethod!==""?
					<FormGroup>
					<Label>{mensaje}</Label>
						<Input type="text" value={this.state.payments[index].uniqueNumber} 
						onChange={(e)=>{this.onNestedChange(e, index, 'uniqueNumber')}}													
						placeholder="" />
					</FormGroup> : null
				}

				<div className="form-group">											
						<label>
						Monto						
						</label>
						<input type="range" min="1"  className="slider monto" 
						max={subTotal}
						value={this.state.payments[index].monto} 
						onChange={(e)=>{this.onNestedChange(e, index, 'monto')}} 
						disabled={this.state.payments[index].uniquePayMethod!==""? false : true}/>	
						<b className="number-cuotas" > {this.state.payments[index].monto}</b>									 
					</div>
				
			</div>

		)
	}

	render() {

		let mensaje = ""
		if(this.state.uniquePayMethod===''){
		}else if(this.state.uniquePayMethod==='credito'){
			mensaje = "Numero de la tarjeta"
		}else if(this.state.uniquePayMethod==='debito'){
			mensaje = "Numero de tarjeta"
		}else if(this.state.uniquePayMethod==='banco'){
			mensaje = "Numero de cuenta"
		}else{
			mensaje = "Numero de recibo"
		}

		let sum = 0
		this.state.payments.forEach(pay=>{
			sum += parseInt(pay.monto)
		})
		let total = this.props.precioTotal

		return (
			<div>
				
				<Modal isOpen={this.props.openModal} toggle={this.props.switchModal} id="detalle-carrito">
				{this.state.loading?		
				<React.Fragment>
					
					<div id="loading-pay">
						<div className="center">
					<Spinner style={{ width: '5rem', height: '5rem' }} color="danger"  />
					</div></div>
						
				</React.Fragment>	
						 : null
					}
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
									{this.props.productos.map((product, i)=>(
										<div key={`buy${i}`} className="order-col">
										<div><b>1</b>{` x ${product.nombre}`}</div>
										<div>{product.precio}</div>
									</div>
									))}																	
								</div>
								<div className="order-col">
									<div>Envio</div>
									<div><strong>Gratis</strong></div>
								</div>
								<div className="order-col">
									<div><strong>TOTAL</strong></div>
									<div><strong className="order-total">${total}</strong></div>
								</div>
							</div>
							
							<CustomInput type="checkbox" 
								checked={this.state.unique}
								value={"unique"} 
								id="uniquePay" onChange={this.hadlePayMethod} >
								<h4 id="one-pay">Metodo de pago unico</h4>
							</CustomInput>
							<Collapse isOpen={this.state.unique}>

								<div className="payment-method">
									<FormGroup check inline>
										<CustomInput type="radio" id="credito"
											name="customRadio" value="credito"
											checked={this.state.uniquePayMethod === 'credito'}
											onChange={this.handleRadioChange}
										/>Tarjeta de Cretido
									</FormGroup>

									<FormGroup check inline>
										<CustomInput type="radio" id="banco"
											name="customRadio" value="banco"
											checked={this.state.uniquePayMethod === 'banco'}
											onChange={this.handleRadioChange}
										/>Transferencia Bancaria
									</FormGroup>

									<FormGroup check inline>
										<CustomInput type="radio" id="debito"
											name="customRadio" value="debito"
											checked={this.state.uniquePayMethod === 'debito'}
											onChange={this.handleRadioChange}
										/>Tarjeta de Debito 
									</FormGroup>

									<FormGroup check inline>
										<CustomInput type="radio" id="efecty"
											name="customRadio" value="efecty"
											checked={this.state.uniquePayMethod === 'efecty'}
											onChange={this.handleRadioChange}
										/>Efecty
									</FormGroup>
									{/*Las opciones para el pago unico*/}
									<br/><br/>
									{this.state.uniquePayMethod==="credito"?
									<React.Fragment>
										<div className="form-group">											
											<label>
											Cuotas a pagar 
											<b className="number-cuotas" > {this.state.cuotas}</b>
											</label>
											<input type="range" min="1" max="36" className="slider" 
											value={this.state.cuotas} onChange={this.onChange('cuotas')}/>										 
										</div>
										<div className="center">
											<img src={Cards} alt="tipos de tarjeta"/>
										</div>
										</React.Fragment> : null
									}
									
									{this.state.uniquePayMethod==="debito"?
									<div className="center">
										<img src={Cards} alt="tipos de tarjeta"/>
									</div> : null 
									}
									{this.state.uniquePayMethod==="efecty"?
										<React.Fragment>											
											<div className="pay-message">
												Realice una consigancion al numero: <b>VSHOP5599718456</b><br/>
												Verificaremos que el pago se realizo segun el numero de recibo
												y sus datos de usuario
											</div>																				
										</React.Fragment> : null
									}

									{this.state.uniquePayMethod==="banco"?
										<React.Fragment>
											<FormGroup>
											<Label for="exampleSelect">Seleccione un banco</Label>
											<Input type="select" name="select" value={this.state.uniqueBanco}
											onChange={this.onChange('uniqueBanco')}>
												<option>AV Villas</option>
												<option>Bancolombia</option>
												<option>BBVA</option>
												<option>Bogota</option>
												<option>Caja Social</option>
												<option>Davivienda</option>	
												<option>Occidente</option>											
												<option>Popular</option>
											</Input>
											</FormGroup>																																							
										</React.Fragment> : null
									}

									{this.state.uniquePayMethod!==""?
										<FormGroup>
										<Label>{mensaje}</Label>
											<Input type="text" value={this.state.uniqueNumber} 
											onChange={this.onChange('uniqueNumber')}
												name="uniqueNumber" id="uniqueNumber" 
											placeholder="" />
										</FormGroup> : null
									}
									
								</div>
							</Collapse>
							

							<CustomInput type="checkbox" 
								checked={this.state.multiple} 
								value={"multiple"} id="multiplePay" 
								onChange={this.hadlePayMethod}>
								<h4 id="multiple-pay">Metodo particionado</h4>
							</CustomInput>							

								<Collapse isOpen={this.state.multiple}>
									<br/>
									<Progress color="danger" value={sum*100/total} />

									<ListGroup>

										{this.state.payments.map((pay, i) =>(
											<React.Fragment key={`newPay${i}`} >
												<ListGroupItem id={`paytoggler${i}`}>
													<button type="button" value={i} 
													className="fa fa-times img-delete delete-pay"
													onClick={this.deletePayMethod} 
													/> 
													{`Metodo de pago # ${i+1}`}
												</ListGroupItem>
												<UncontrolledCollapse toggler={`paytoggler${i}`}>
													{this.otherPayMethod(i, total)}
												</UncontrolledCollapse>
											</React.Fragment>
										))}

									</ListGroup>
										{this.state.payments.length===3?
										null :										
										<div className="center">
											<Label onClick={this.addPayMethod}
												id="load-img-button">
											<i className="fas fa-plus"></i>									
											</Label>
										</div>
										}
								</Collapse>
							<br/>
							<CustomInput type="checkbox" id="exampleCustomCheckbox" >
								He leido y acepto los terminos y condiciones
							</CustomInput>
								<div className="center">
									<button disabled={this.state.unique? 
									this.state.uniquePayMethod!==""? false : true 
									: sum!==total? true : false
									}
									onClick={this.realizarVenta} 							
									className="primary-btn order-submit">
										Realizar pedido
									</button>
								</div>
						</div>
					</ModalBody>

				</Modal>
			</div>
		);
	}
}

export default CartToPay;