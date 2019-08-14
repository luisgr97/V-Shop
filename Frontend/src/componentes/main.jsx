/* Por el momento solo se tiene el login como ejemplo */
import React from 'react'
import Footer from './footer'
import Producto from './producto'
/*
Los componentes con estado deben ser clases
vea un ejemplo de componente sin estado en el
footer o header
*/


const listaProductos = (arreglo) => (
  arreglo.map(indice => (<Producto key={indice}/>))
);


const Main = (props) => {
    //Aqui podemos hacer validaciones para retonar diferentes cosas

    //El metodo retunr es necesario
    const arreglo = [1,2,3,4,5,6,7,8,9,0]
    return (
      <div>
        <main>
        {listaProductos(arreglo)}
      </main>
      <Footer/>
      </div>

    );
  
}

export default Main;