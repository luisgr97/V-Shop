import React from 'react';
import Main from './componentes/main'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import LoginAdmin from './componentes/login'

//En esta parte renderizamos lo prinipal
function App() {
  return (
   

    //En react, para dar estilos CSS usamos className en lugar de class
    <div className="App">

      <Router>
        <Route exact path="/wp-admin" render={() => 
            <LoginAdmin  
              //url={URL}
              //autenticado={this.state.autenticado} 
            />}>
          </Route>
          <Route exact path="/" render={() => 
            <Main  
              //url={URL}
              //autenticado={this.state.autenticado} 
            />}>
          </Route>
        
        </Router>

    </div>
  );
}

export default App;
