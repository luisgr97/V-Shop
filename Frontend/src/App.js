import React from 'react';
import Main from './componentes/main'
import { BrowserRouter, Route } from 'react-router-dom'
import LoginAdmin from './componentes/loginAdmin'
import Dashboard from './dashboard'
import Header from './componentes/header'
import LoginCliente from './componentes/loginClient'
import Regitro from './componentes/registroClient'

//En esta parte renderizamos lo prinipal
function App() {
    return (

        //En react, para dar estilos CSS usamos className en lugar de class
        <div className="App" >

            <BrowserRouter>
                <Route path="/admin"
                    render={props => < Dashboard {...props}
                    />} />
                <Route exact path="/wp-admin"
                    render={() =>
                        <LoginAdmin
                        //url={URL}
                        //autenticado={this.state.autenticado} 
                        />
                    }>
                </Route>

                <Route exact path="/"
                    render={() =>
                        <Main
                        //url={URL}
                        //autenticado={this.state.autenticado} 
                        />
                    } >
                </Route>
                <Route path="/cliente"
                    render={() => (<div><LoginCliente /></div>)}>
                </Route>
                <Route path="/registro"
                    render={() => <Regitro />}>
                </Route>


            </BrowserRouter>
        </div>
    );
}

export default App;