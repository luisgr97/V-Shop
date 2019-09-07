/* Por el momento solo se tiene el login como ejemplo */
import React from 'react'
import Axios from 'axios';

import Footer from './Footer'
import Producto from './Producto'
import Loading from './Loading'
import { Fade } from 'reactstrap';
/*
Los componentes con estado deben ser clases vea un ejemplo de componente sin estado en el footer o header
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

class Main extends React.Component {
  constructor(props){
    super(props)
    this.state={
      loading: true,
      catalogo: []
    }
  }

  componentDidMount(){
    Axios.get('http://localhost:4000/api/catalogos/inventario/getProductosHomePageByCatalogo/1')
    .then((response) => {
      if(response.data.error){

      }else{
        this.setState({
          catalogo: response.data,
          loading: false
        })
      }
    })
  }

    //El metodo render es necesario
    render(){
     //Aqui podemos hacer validaciones para retonar diferentes cosas
      const arreglo = [1,2,3,4,5,6,7,8,9,0]
      if(this.state.loading){
        return(
          <Loading/>
        )
      }
      return (
        <Fade in={true}>
          <main>
          {this.state.catalogo.map((product,i) => (<Producto key={`producto${i}`} 
          {...product}/>))}
        </main>
        <Footer/>
        </Fade>
  
      );
    
    }

}

export default Main;