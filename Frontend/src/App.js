import React, {Component} from 'react';
import Main from './componentes/main'
import { BrowserRouter, Route, Redirect, Link } from 'react-router-dom'
import LoginAdmin from './componentes/loginAdmin'
import Dashboard from './dashboard'
import Header from './componentes/header'
import LoginCliente from './componentes/loginClient'
import Regitro from './componentes/registroClient'
import { Fade } from 'reactstrap';
import Categoria from './componentes/categorias'
import Arituclo from './componentes/articulo'


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
            clienteLogueado: false,
            adminLogueado: true
        };
        this.handleChangeAdminLog = this.handleChangeAdminLog.bind(this)
    }

    handleChangeAdminLog(valor){
        this.setState({
            adminLogueado: valor
        })
    }

render(){
    
    const propiedades={
        tipo: "cc",
        numero: "",
        nombre: "",
        apellidos: "",
        correo: "",
        clave: "",
        direccion: "",
        nacimiento: "",
        cumpleanios: "",
        textoBoton: "REGISTRARME"
    };

    const propiedades2={
        tipo: "CC",
        numero: "12151518",
        nombre: "Esneider Manzano",
        apellidos: "Aranago",
        correo: "esneider.manzano@correounivalle.edu.co",
        clave: "stefierrote",
        direccion: "Cra 28 C # 54 - 123",
        nacimiento: "1995-10-18",
        cumpleanios: "1995-10-18",
        textoBoton: "ACTUALIZAR"
    };

    return (
        //En react, para dar estilos CSS usamos className en lugar de class
        <div className="App" >
            <BrowserRouter>
                <Route path="/admin" render={props => 
                this.state.adminLogueado ? 
               <Dashboard {...props}/> :
                <Redirect to="/vs-admin"/>} 
                />

                <Route exact path="/vs-admin" render={() =>
                    this.state.adminLogueado ?
                    <Redirect to="/admin"/> :
                    <LoginAdmin login={this.handleChangeAdminLog}/>
                    }>
                </Route>

                <Route exact path="/" render={() =>(
                    <div>
                    <Fade in={true}>
                        <Header logueado={this.state.clienteLogueado} />
                        <Main login={this.state.clienteLogueado} />
                    </Fade>
                    </div>
                )} >
                </Route>

                <Route path="/cliente" render={() => 
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

                <Route exact path="/registro" render={() => 
                    this.state.clienteLogueado ? 
                    <Redirect to="/" /> : 
                    (<Fade in={true} className="mt-3" id="registro"> 
                        <BlackLogo/>
                           
                        <Regitro {...propiedades}
                        login={this.state.clienteLogueado} 
                        />
                        </Fade>
                    )}>
                </Route>

                <Route path="/config" render={() => 
                    this.state.clienteLogueado ? (<div>                                    
                    <Header {...this.props} />
                    <Regitro {...propiedades2}/>
                    </div>) : <Redirect to="/" />}>
                </Route>

                <Route path="/categorias" render={() => 
                    this.state.adminLogueado ? (<div>                                    
                    <Categoria {...this.props} />                   
                    </div>) : <Redirect to="/" />}>
                </Route>

                <Route path="/productos" render={() => 
                    this.state.adminLogueado ? (<div>                                    
                    <Arituclo {...this.props} />                   
                    </div>) : <Redirect to="/" />}>
                </Route>
                

            </BrowserRouter>
        </div>
    );
}
}
export default App;