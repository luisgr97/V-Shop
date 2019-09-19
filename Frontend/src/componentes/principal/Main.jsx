/* Por el momento solo se tiene el login como ejemplo */
import React from 'react'
import Nav from './Nav'
import Producto from './Producto'
import NoProdcut from '../../imagenes/no-productos.png'
/*
Los componentes con estado deben ser clases vea un ejemplo de componente sin estado en el footer o header
*/

class Main extends React.Component {
  constructor(props){
    super(props)
    this.state={
      catalogo: [],
      idTag: ""
    }
    //this.getProduts = this.getProduts.bind(this)
    this.changeIdTag = this.changeIdTag.bind(this)
  }
/*
  getProduts(){
    console.log("mi catalogo",this.props.idCatalog)
    Axios.get('http://localhost:4000/api/catalogos/inventario/getProductosHomePageByCatalogo/'+this.props.idCatalog)
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

  componentDidMount(){
    this.getProduts()
  }
*/

  changeIdTag(value){
    this.setState({
      idTag: value
    })
  }

    //El metodo render es necesario
    render(){

     //Aqui podemos hacer validaciones para retonar diferentes cosas
      return (
        <React.Fragment>
          <Nav changeIdTag={this.changeIdTag}/>
          <main>           
            

              {this.props.catalogo.length===0?
              <img id="no-product" src={NoProdcut} alt="No hay productos"/> :
              this.props.catalogo.map((product,i) => (
                <Producto key={`producto${i}`} 
                addProduct={this.props.addProduct}
                visible={this.state.idTag===""? true :
                this.state.idTag===product.producto.subcategoria.categoria.id_categoria? true : false
                }
                {...product}/>
              ))
              }

          </main>
        </React.Fragment>
      );
    
    }

}

export default Main;