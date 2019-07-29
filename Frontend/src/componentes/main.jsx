/* Por el momento solo se tiene el login como ejemplo */
import React, { Component } from 'react'
import Header from './header'
import Footer from './footer'
import Producto from './producto'
/*
Los componentes con estado deben ser clases
vea un ejemplo de componente sin estado en el
footer o header
*/


const Main = (props) => {
    //Aqui podemos hacer validaciones para retonar diferentes cosas

    //El metodo retunr es necesario
    return (
      <div>
      <Header/>
      <main>
        <Producto/>
      </main>
      <Footer/>
      </div>

    );
  
}

export default Main;