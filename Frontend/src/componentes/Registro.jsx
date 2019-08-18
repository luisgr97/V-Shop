import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import { Link } from 'react-router-dom'


import '../estilos/registro.css'
import axios from 'axios'

class Registro extends React.Component {
    constructor(props){
        super(props)        
        this.state={
            tipo: props.tipo,
            numero: props.numero,
            nombre: props.nombre,
            apellidos: props.apellidos,
            telefono: props.telefono,
            direccion: props.direccion,
            correo: props.correo,
            clave: props.clave,            
            nacimiento: props.nacimiento,
            nick: props.nick
        };
        this.handleOnChange = this.handleOnChange.bind(this) 
        this.enviar = this.enviar.bind(this)

    }

    componentWillMount(){
        console.log("Se renderizo una sola vez")
    }
    handleOnChange = input => e =>{ 
        this.setState({ [input]: e.target.value});
      }  

    handleRadioChange = changeEvent => {
    this.setState({
        tipo: changeEvent.target.value
    });
    }
    
    enviar() {
        const mensaje = {
            documento: this.state.tipo,
            numero: this.state.numero,
            nombre: this.state.nombre,
            apellidos: this.state.apellidos,            
            clave: this.state.clave,
            direccion: this.state.direccion,
            nacimiento: this.state.nacimiento,
            cumpleanios: this.state.cumpleanios,
            correo: this.state.correo
        }
    
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.post('http://localhost:4000/usuario/create', mensaje)
        .then((response) => {
          alert(JSON.stringify(response.data))
        })
    }

    render() {
        return (            
            <Form className="registro">                
                <Row form >                
                    <Col md={6}>
                    <Label for="numero">Tipo de documento *</Label>
                    <br/><br/>
                    <div className="center">
                        <FormGroup check inline>
                            <CustomInput type="radio" id="cc" name="customRadio" label="CC" value="CC"
                                checked={this.state.tipo === 'CC'}
                                onChange={this.handleRadioChange}
                            />
                        </FormGroup>
                        
                        <FormGroup check inline>
                            <CustomInput type="radio" id="ti" name="customRadio" label="TI" value="TI"                       
                                checked={this.state.tipo === 'TI'}
                                onChange={this.handleRadioChange}
                            />

                        </FormGroup>   
                        </div>                 
                    </Col>                    
                    <Col md={6}>
                        <FormGroup>
                            <Label for="numero">Numero *</Label>
                            <Input type="text" id="numero" placeholder="Su identificacion..." 
                                value={this.state.numero}  
                                onChange = {this.handleOnChange('numero')} 
                                disabled={this.props.noRegistro}
                            />
                        </FormGroup>
                    </Col>
                    
                    <Col md={6}>
                        <FormGroup>
                            <Label for="nombre">Nombre *</Label>
                            <Input type="text" id="nombre" placeholder="Su nombre" 
                                value={this.state.nombre}  
                                onChange = {this.handleOnChange('nombre')}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="apellidos">Apellidos *</Label>
                            <Input type="text" id="apellidos" placeholder="Su apellido" 
                                value={this.state.apellidos}                            
                                onChange = {this.handleOnChange('apellidos')}
                            />
                        </FormGroup>
                    </Col>
                    
                    <Col md={6}>
                        <FormGroup>
                            <Label for="password">Apodo *</Label>
                            <Input type="text" id="apodo" placeholder="nick de usuario" 
                                value={this.state.nick}  
                                onChange = {this.handleOnChange('nick')}
                                disabled={this.props.noRegistro}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="correo">Correo *</Label>
                            <Input type="email" name="email" id="correo" placeholder="correo electronico" 
                                value={this.state.correo}  
                                onChange = {this.handleOnChange('correo')}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="password">Contraseña *</Label>
                            <Input type="password" name="password" id="password" placeholder="clave de acceso" 
                                value={this.state.clave}  
                                onChange = {this.handleOnChange('clave')}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="password">Confirmar Contraseña *</Label>
                            <Input type="password" name="password2" id="password2" placeholder="repetir clave" 
                                value={this.state.clave}  
                                onChange = {this.handleOnChange('clave')}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label for="direccion">Direccion *</Label>
                    <Input type="text" name="direccion" id="direccion" placeholder="Ej: Cra 28 N 23-B4" 
                        value={this.state.direccion}  
                        onChange = {this.handleOnChange('direccion')}
                    />
                </FormGroup>
                <Row form>   
                <Col md={6}>
                        <FormGroup>
                            <Label for="numero">Telefono *</Label>
                            <Input type="text" id="telefono" placeholder="Su identificacion..." 
                                value={this.state.telefono}  
                                onChange = {this.handleOnChange('telefono')}
                            />
                        </FormGroup>
                    </Col>               
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleDate">Fecha de nacimiento</Label>
                            <Input
                                type="date"
                                name="date"
                                id="fechaN"
                                placeholder="date placeholder"
                                value={this.state.nacimiento} 
                                onChange = {this.handleOnChange('nacimiento')}
                                disabled={this.props.noRegistro}
                            />
                        </FormGroup>
                    </Col>
                    
                </Row>
                <br />
                {this.props.noRegistro ?
                    <div>                         
                        <div className="center">
                            <Button color="danger" onClick={this.enviar}>
                                ACTUALIZAR
                            </Button>
                        </div>
                                               
                    </div> :
                    <div>
                        <div className="center">
                            <Button color="danger" onClick={this.enviar}>
                                REGISTRARME
                            </Button>
                        </div>
                        <br />
                        <div className="mensajito">
                            <span>¿Ya tiene cuenta? <Link to={"/login"} >inicia sesión</Link></span>
                        </div>
                    </div>
                }               
            </Form>
        );
    }
}

export default Registro;