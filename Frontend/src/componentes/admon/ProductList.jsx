import React from 'react'
import Axios from 'axios';

import { Table } from 'reactstrap';

import Loading from '../principal/Loading'

class Inventory extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loadingProducts: true,
            viewProduct: "",
            editProduct: "",
            newCantidad: "",
            products: [],
        }
        this.resetAll = this.resetAll.bind(this)
        this.getProducts = this.getProducts.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.onSelectToView = this.onSelectToView.bind(this)
        this.closeOnSelectToView = this.closeOnSelectToView.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    resetAll(){
        this.setState({
            viewProduct: "",
            editProduct: "",
            newCantidad: "",
        })
    }

    getProducts(){
        Axios.get('http://localhost:4000/api/productos/get')
        .then((response) => {
          if(response.data.error){
            alert(response.data.message)
          }else{
            this.setState({
                products: response.data,
                loadingProducts: false,              
            })
          }
        })
      }

    componentDidMount(){
        this.getProducts()
    }

    addProduct(e){
        const mensaje = {
            id_producto: e.target.value,
            cantidad_en_inventario: 1,
            id_descuento: 1,
            id_catalogo: this.props.idSede
        }    
        Axios.post('http://localhost:4000/api/catalogos/inventario/create/', mensaje)
        .then(response => {
            if(response.data.error){
                alert(response.data.message)
            }else{
                alert(response.data.message)
                //this.resetAll()
                //this.getProducts()
            }
        })    
    }

    onSelectToView(e){
        this.setState({
            viewProduct: this.state.products[parseInt(e.target.value)].id_producto,
        })
        
    }

    closeOnSelectToView(){
        this.setState({
            viewProduct: "",
        })
    }

    onChange = input => e =>{ 
        this.setState({ [input]: e.target.value});
    }
    

    render(){
        if(this.state.loadingProducts){
            return <Loading/>
        }
        return(
            <div id="inventory-ctn">
                <h2>Agregar productos al inventario</h2>
            <Table>
            <thead>
            <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Marca</th>
                <th>Categoria</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
                {this.state.products.map((product, i) => (
                    <React.Fragment key={`producto${i}`}>
                    <tr>
                    <th scope="row">{i+1}</th>
                    <td>{product.nombre_producto}</td>
                    <td>{product.precio}</td>                   
                    <td>{product.marca}</td>
                    <td>{product.subcategoria.nombre_subcategoria}</td>
                    <td>
                    {this.state.viewProduct === product.id_producto? 
                        <button   
                        onClick={this.closeOnSelectToView}                                                                                      
                        className="fa fa-eye-slash comment-delete"/>
                        :  
                        <button value={i}  
                        onClick={this.onSelectToView}                                                                                      
                        className="fa fa-eye comment-edit"/>
                    }
                    <button value={product.id_producto}
                        onClick={this.addProduct}                                                                                      
                        className="fa fa-plus comment-edit"/>
                    </td>
                </tr>
                {this.state.viewProduct === product.id_producto? 
                <tr>
                        <td colSpan="6">
                            <div id="img-container">
                            <br/>        
                            {product.imagenes.map((imagen, index) => (
                                <div key={`imgProduct${index}`} className="img-ctn">                                                                 
                                    <img alt={`imagen${index}`}  
                                    src={`http://localhost:4000/${imagen.ruta}`}/>
                                </div>
                            ))}  
                            <p>{product.descripcion}</p>                      
                            </div>
                        </td>
                    </tr>                
                    : null}
                </React.Fragment>
                ))}          
            </tbody>
        </Table>
        </div>
        )
    }
}

export default Inventory;