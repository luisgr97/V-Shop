import React from 'react';
import Header from './componentes/header'
import Main from './componentes/main'
import Footer from './componentes/footer'

//En esta parte renderizamos lo prinipal
function App() {
  return (

    //En react, para dar estilos CSS usamos className en lugar de class
    <div className="App">
     <Header/>
     <Main/>
     <Footer/>
    </div>
  );
}

export default App;
