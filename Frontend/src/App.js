import React, {Component} from 'react';
import { BrowserRouter, Route, Redirect, Link, Switch } from 'react-router-dom'
import { Fade } from 'reactstrap';

import Main from './componentes/Main'
import LoginAdmin from './componentes/LoginAdmin'
import Dashboard from './dashboard'
import Header from './componentes/Header'
import LoginCliente from './componentes/LoginClient'
import Regitro from './componentes/Registro'

import Categoria from './componentes/Categorias'
/*
import Arituclo from './componentes/Articulo'
*/
import Cliente from './componentes/Cliente'

//import 'bootstrap/dist/css/bootstrap.min.css';


import logo from './logo1a.png'


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
            clienteLogueado: true,
            adminLogueado: true,
            number: 2
        };
        this.handleChangeAdminLog = this.handleChangeAdminLog.bind(this)
        this.handleChangeNumber = this.handleChangeNumber.bind(this)
    }

    handleChangeAdminLog(valor){
        this.setState({
            adminLogueado: valor
        })
    }

    handleChangeNumber(valor){
        this.setState({
            number: valor
        })
    }

render(){
    
    const propiedades={
        tipo: "cc",
        numero: "",
        nombre: "",
        apellidos: "",
        telefono: "",
        direccion: "",
        correo: "",
        clave: "",        
        nacimiento: "",
        nick: "",
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

                <Route path="/admin" render={props => 
                    this.state.adminLogueado ? 
                    <Dashboard {...props}/> :
                    <Redirect to="/vs-admin"/>} 
                />

                <Route  path="/vs-admin" render={() =>
                    this.state.adminLogueado ?
                    <Redirect to="/admin"/> :
                    <LoginAdmin login={this.handleChangeAdminLog}/>
                    }>
                </Route>
            
                <Route path="/login" render={() => 
                    this.state.clienteLogueado ? 
                    <Redirect to="/"/> :
                    (<div>
                        <BlackLogo/> 
                        <Fade in={true} className="mt-3">                
                        <LoginCliente login={this.state.clienteLogueado}/>
                        </Fade>
                    </div>
                    )}>
                </Route>

                <Route path="/registro" render={() => 
                    this.state.clienteLogueado ? 
                    <Redirect to="/" /> : 
                    (<Fade in={true} className="mt-3" id="registro"> 
                        <BlackLogo/> 
                        <div id="registro-container">                    
                        <Regitro {...propiedades}
                        login={this.state.clienteLogueado} 
                        />
                        </div>
                        </Fade>
                    )}>
                </Route>
                

                <Route path="/categorias" render={() => 
                    this.state.adminLogueado ? (<div>                                    
                    <Categoria {...this.props} />                   
                    </div>) : <Redirect to="/" />}>
                </Route>
{/*
                <Route path="/productos" render={() => 
                    this.state.adminLogueado ? (<div>                                    
                    <Arituclo {...this.props} />                   
                    </div>) : <Redirect to="/" />}>
                </Route>

                    */}
                </Switch>
                    <Header number={this.state.number}  
                        logueado={this.state.clienteLogueado}                         
                    />  
                <Switch>
                    <Route exact path="/"  render={() =>(
                        <div>
                            <Fade in={true}>                               
                            <Main login={this.state.clienteLogueado} />                                    
                            </Fade>
                        </div>
                    )} >
                    </Route>

                    <Route path="/cliente" render={({location}) => 
                        this.state.clienteLogueado ? 
                        (<div>                                                                                                            
                            <Cliente {...propiedades2}
                            location = {location}
                            changeNumber = {this.handleChangeNumber}/>
                        </div>) : <Redirect to="/login" />}>
                    </Route>             
                
                    <Route render={() => (<h1>Pagina no encontrada</h1>)} />

               </Switch>
            </BrowserRouter>
        </div>
    );
}
}
export default App;