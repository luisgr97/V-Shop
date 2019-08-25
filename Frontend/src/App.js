import React, {Component} from 'react';
import { BrowserRouter, Route, Redirect, Link, Switch } from 'react-router-dom'
import jwt from 'jsonwebtoken'

import Header from './componentes/Header'
import Main from './componentes/Main'
import LoginCliente from './componentes/LoginClient'
import LoginAdmin from './componentes/LoginAdmin'
import Regitro from './componentes/Registro'
import Admin from './componentes/manager/Dashboard'
import Cliente from './componentes/cliente/Dashboard'

import { Fade } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './imagenes/logo-black.png'


const BlackLogo = () =>{
    return(
        <div className="header-logo-black">
            <Link className="logo" to={"/"} ><img src={logo} alt=""/></Link>                
        </div>
    )
}

//En esta parte renderizamos lo prinipal
class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            clienteLogueado: false,
            nombreCliente: "",
            idCliente: "",
            adminLogueado: true,
            number: 2
        };
        this.handleChangeLoggin = this.handleChangeLoggin.bind(this)
        this.handleChangeNumber = this.handleChangeNumber.bind(this)
    }

    componentWillMount(){
        const token = localStorage.getItem('token-login')
        if(token){  
            const nombre = jwt.verify(token, 'tugfaide').nick    
            const id = jwt.verify(token, 'tugfaide').id_usuario    
            this.setState({
                clienteLogueado: true,
                nombreCliente: nombre,
                idCliente: id
              })              
        }else{
            this.setState({
                clienteLogueado: false,
              })
        }
    }

    handleChangeLoggin(valor, usuario){
        if(valor==0){
            if(this.state.clienteLogueado){
                localStorage.removeItem('token-login')
                this.setState({
                    clienteLogueado:false,
                    nombreCliente: "",
                    idCliente: ""
                })
            }else{
                const token = {id_usuario: usuario.id_usuario, nick: usuario.nick}            
                localStorage.setItem('token-login', jwt.sign(token, 'tugfaide'))  
                this.setState({
                    clienteLogueado: true,
                    nombreCliente: usuario.nick,
                    idCliente: usuario.id_usuario
                })
            }           
        }else if(valor==1){
            this.setState({
                adminLogueado: !this.state.adminLogueado
            })
        }             
    }

    handleChangeNumber(valor){
        this.setState({
            number: valor
        })
    }

render(){
    
    const propiedades={
        tipo_documento: "CC",
        numero_documento: "",
        nombres: "",
        apellidos: "",
        telefono: "",
        direccion: "",
        fecha_de_nacimiento: "",
        correo: "",           
        nick: "",
        clave: "",
    };

    const propiedades2={
        tipo: "CC",
        numero: "12151518",
        nombre: "Esneider Manzano",
        apellidos: "Aranago",
        telefono: "4455971",
        direccion: "Cra 28 C # 54 - 123",
        correo: "esneider.manzano@correounivalle.edu.co",
        clave: "stefierrote",       
        nacimiento: "1995-10-18",
        nick: "loquendomanzano",
    };
//<Main login={this.state.clienteLogueado} />
    return (
        //En react, para dar estilos CSS usamos className en lugar de class
        <div className="App" >
            <BrowserRouter>
            <Switch>                
{/*
                <Route path="/admin" render={props => 
                    this.state.adminLogueado ? 
                    <Dashboard {...props} /> :
                    <Redirect to="/vs-admin"/>} 
                />
                */}
                <Route path="/manager" render={props => 
                    this.state.adminLogueado ? 
                    <Admin {...props}/> :
                    <Redirect to="/vs-admin"/>
                }/>

                <Route  path="/vs-admin" render={() =>
                    this.state.adminLogueado ?
                    <Redirect to="/admin"/> :
                    <LoginAdmin login={this.handleChangeAdminLog}/>
                }/>

                <Route path="/registro" render={() => 
                    this.state.clienteLogueado ? 
                    <Redirect to="/" /> : 
                    (<Fade in={true} className="mt-3" id="registro"> 
                        <BlackLogo/> 
                        <div id="registro-container">                    
                            <Regitro actualizar={false}
                            datos={propiedades}                             
                            />
                        </div>
                    </Fade>
                )}/>
                
                
                <Route path="/login" render={() => 
                    this.state.clienteLogueado ? 
                    <Redirect to="/"/> :
                    (<div>
                        <Fade in={true} className="mt-3" id="login">
                            <BlackLogo/>                                         
                            <LoginCliente login={this.handleChangeLoggin}/>
                        </Fade>
                    </div>
                )}/>

{/*
                <Route path="/productos" render={() => 
                    this.state.adminLogueado ? (<div>                                    
                    <Arituclo {...this.props} />                   
                    </div>) : <Redirect to="/" />}>
                </Route>

                    */}
        
                    <Route exact path="/"  render={() =>(
                        <div>
                            <Header number={this.state.number}
                                nombre={this.state.nombreCliente}
                                login={this.handleChangeLoggin}                                 
                                logueado={this.state.clienteLogueado}                         
                            />
                            <Fade in={true}>                                                           
                            <Main login={this.state.clienteLogueado} />                                    
                            </Fade>
                        </div>
                    )}/>

                    <Route path="/cliente" render={({location}) => 
                        this.state.clienteLogueado ? 
                        (<div> 
                            <Header number={this.state.number} 
                                nombre={this.state.nombreCliente}
                                login={this.handleChangeLoggin} 
                                logueado={this.state.clienteLogueado}                         
                             />                                                                                                           
                            <Cliente idCliente={this.state.idCliente}                                
                                location = {location}
                            />
                        </div>) : <Redirect to="/login" />
                    }/>
                
                    <Route render={() => (<h1>Pagina no encontrada</h1>)} />
                    </Switch>
            </BrowserRouter>
        </div>
    );
}
}
export default App;