import React from 'react';
import axios from 'axios'
import Loading from '../principal/Loading'

import { Col, Row, Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom'

import '../../estilos/registro.css'

class Registro extends React.Component {
    constructor(props){
        super(props)      
        this.state={
            loading: true,
            tipo: "CC",
            numero: "",
            nombre: "",
            apellidos: "",
            telefono: "",
            direccion: "",
            nacimiento: "",
            correo: "",           
            nick: "",
            clave: "",
            clave2: "",            
            redirect: false
        };
        this.getUserData = this.getUserData.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this) 
        this.enviarDatos = this.enviarDatos.bind(this)
        this.resetState = this.resetState.bind(this)
    }

    getUserData(){
        axios.get('http://localhost:4000/usuario/get/' + this.props.idUser)
        .then(response => {
            if(response.data.error){
                alert(response.data.message)
            }else{
                this.setState({
                    tipo: response.data.tipo_documento,
                    numero: response.data.numero_documento,
                    nombre: response.data.nombres,
                    apellidos: response.data.apellidos,
                    telefono: response.data.telefono,
                    direccion: response.data.direccion,
                    nacimiento: response.data.fecha_de_nacimiento,
                    correo: response.data.correo,           
                    nick: response.data.nick,
                    loading: false
                })
            }
        })
    }

    componentDidMount(){
        if(this.props.actualizar){
            this.getUserData()
        }else{
            this.setState({loading:false})
        }
        
    }

    resetState(){
        this.setState({
            numero: "",
            nombre: "",
            apellidos: "",
            telefono: "",
            direccion: "",
            nacimiento: "",
            correo: "",           
            nick: "",
            clave: "",
            clave2: "",    
        })
    }

    handleOnChange = input => e =>{ 
        this.setState({ [input]: e.target.value});
    }  

    handleRadioChange = changeEvent => {
    this.setState({
        tipo: changeEvent.target.value
    });
    }
    
    enviarDatos() {
        let mensaje = {
            tipo_documento: this.state.tipo,
            numero_documento: this.state.numero,
            nombres: this.state.nombre,
            apellidos: this.state.apellidos,   
            telefono: this.state.telefono,    
            direccion: this.state.direccion,  
            fecha_de_nacimiento: this.state.nacimiento,   
            correo: this.state.correo,
            estado: 1,
            clave: this.state.clave,
            nick: this.state.nick,
            tipo_usuario: "Cliente",
        }
        if(this.props.actualizar){
            // Si es una actualizacion
            axios.put('http://localhost:4000/usuario/update/' + this.props.idUser, mensaje)
            .then((response) => {
                alert("Se actualizaron los datos con exito")
            })
            .catch(err=>{
                alert("Intentelo mas tarde registro")
            })
        }else{
            // Si es una creacion
            if(this.props.isManager){
                mensaje.tipo_usuario = "Gerente"
            }
            axios.post('http://localhost:4000/usuario/create', mensaje)
            .then((response) => {
                if(response.data.error){
                    alert(response.data.message)
                }else{
                    alert("Usuario creado con exito")
                    if(this.props.isManager){
                        this.resetState()
                    }else{
                        this.setState({ redirect:true })
                    } 
                }                               
            })
            .catch(err=>{
                alert("Intentelo mas tarde registro")
            })
        }
       
    }

    render() {
        if(this.props.actualizar){
            if(this.state.loading){
                return <Loading/>
            }
        }
       
        const actualizar = this.props.actualizar

        if(this.state.redirect){
            return(<Redirect to="/login"/>)
        }

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
                                disabled={
                                    actualizar?
                                    this.state.tipo==='CC'? true : false :
                                    false
                                }
                            />
                        </FormGroup>
                        
                        <FormGroup check inline>
                            <CustomInput type="radio" id="ti" name="customRadio" label="TI" value="TI"                       
                                checked={this.state.tipo === 'TI'}
                                onChange={this.handleRadioChange}
                                disabled={
                                    actualizar?
                                    this.state.tipo==='CC'? true : false :
                                    false
                                }
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
                                disabled={actualizar}
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
                                disabled={actualizar}
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
                                valid={this.state.clave.length>5}
                                onChange = {this.handleOnChange('clave')}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="password">Confirmar Contraseña *</Label>
                            <Input type="password" name="password2" id="password2" placeholder="repetir clave"                             
                            valid={this.state.clave.length>5?
                                this.state.clave===this.state.clave2?
                                true: false :
                                false
                                }                            
                                invalid={this.state.clave!==this.state.clave2} 
                                onChange={this.handleOnChange('clave2')}
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
                            <Input type="text" id="telefono" placeholder="Numero telefonico..." 
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
                                disabled={actualizar}
                            />
                        </FormGroup>
                    </Col>
                    
                </Row>
                <br />
                <div>                         
                    <div className="center">
                        <Button color="danger" onClick={this.enviarDatos}>
                        {this.props.mensaje}
                        </Button>
                    </div>
                                            
                </div>
                {actualizar ?
                null : this.props.mensaje==="REGISTRAR GERENTE"?
                        null :
                        <div className="mensajito">
                            <br/>
                            <span>¿Ya tiene cuenta? <Link to={"/login"} >inicia sesión</Link></span>
                        </div>
                }
                                
            </Form>
        );
    }
}

export default Registro;