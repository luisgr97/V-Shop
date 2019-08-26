/* Por el momento solo se tiene el login como ejemplo */
import React from 'react'
import Footer from './Footer'
import Producto from './Producto'
/*
Los componentes con estado deben ser clases
vea un ejemplo de componente sin estado en el
footer o header
*/
import imagen from '../../product01.png'

const product={
  nombre: "XBOX ONE",
  descripcion: "COnsola para jugar bien bacano",
  marca: "SONY",
  precio: "1000000",
  imagen: imagen,
  categoria: "Consolas",
  descuento: 0
};
const listaProductos = (arreglo) => (
  arreglo.map(indice => (<Producto key={indice} {...product}/>))
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