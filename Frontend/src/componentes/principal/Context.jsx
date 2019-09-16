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
            waveEffect: false,
            count: 0
        }
        this.addProduct = this.addProduct.bind(this)
        this.precioTotal = this.precioTotal.bind(this)
        this.eliminarProducto= this.eliminarProducto.bind(this)

    }

    componentDidMount(){
        if(localStorage.getItem('productos')){
          this.setState({
            productos: JSON.parse(localStorage.getItem('productos')),
            count: this.state.count++
          })
        }
      }

    shouldComponentUpdate(nextProps, nextState){
      return this.state.count !== nextState.count
    }

    componentDidUpdate(){
      console.log("Se ejecuta el didupdate", this.state.productos)
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
      this.setState({
        productos: this.state.productos.filter(producto => producto.id !== e.target.value  ),
        count: this.state.count++
       
     });             
    }

    addProduct(mensaje){
        let product = this.state.productos
        product.push(mensaje)
        this.setState({
            productos : product,
            waveEffect: true,
            count: this.state.count++
        }, ()=>{
          window.setTimeout(() => {
            this.setState({
              waveEffect: false,
              count: this.state.count++
            })
          }, 900)
        })
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