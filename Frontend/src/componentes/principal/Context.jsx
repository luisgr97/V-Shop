import React from 'react'
import imagen from '../../product01.png'

export const ProductContext = React.createContext();


const product =[
    {
    id: "123654",
    nombre: "XBOX ONE",
    precio: 1000000,
    imagen: imagen,

  }];

  
export class ProductoProvider extends React.Component{
    constructor(props){
        super(props)
        this.state={
            message: "hola",
            productos: [],
            waveEffect: false
        }
        this.addProduct = this.addProduct.bind(this)
        this.precioTotal = this.precioTotal.bind(this)
        this.eliminarProducto= this.eliminarProducto.bind(this)

    }

    componentDidMount(){
        if(localStorage.getItem('productos')){
          this.setState({
            productos: JSON.parse(localStorage.getItem('productos'))
          })
        }
      }

    componentDidUpdate(){
    localStorage.setItem('productos', JSON.stringify(this.state.productos))    
    }

    precioTotal(){
        let total = 0;
        for(var i=0;i<this.state.productos.length;i++){
          total += this.state.productos[i].precio
        }
        return total;
    }

    eliminarProducto = (e) =>{
        const valor = e.target.value        
        this.setState(prevState => {
          const productos = prevState.productos.filter(producto => producto.id !== valor);
          return { productos };
        });  
        
    }

    addProduct(mensaje){
        let product = this.state.productos
        product.push(mensaje)
        this.setState({
            productos : product,
            waveEffect: true
        }, ()=>{
          window.setTimeout(() => {
            this.setState({
              waveEffect: false
            })
          }, 2000)
        })
        console.log(this.state.productos)
        
    }

    render(){
        const {children} = this.props;
        return(
            <ProductContext.Provider 
                value={{
                    productos: this.state.productos,
                    precioTotal: this.precioTotal,
                    eliminarProducto: this.eliminarProducto,
                    addProduct : this.addProduct,
                    waveEffect: this.state.waveEffect
                }}>
                    {children}
            </ProductContext.Provider>
        )
    }
}

export const ProductContextConsumer = ProductContext.Consumer;