import React from 'react'
import Axios from 'axios';

import { Table, Input } from 'reactstrap';

import Loading from '../principal/Loading'

class Inventory extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loadingProducts: true,
            loadingDiscounts: true,
            viewProduct: "",
            idDiscount: "",
            editProduct: "",
            newCantidad: "",
            catalogo: [],
            discounts: []
        }
        this.resetAll = this.resetAll.bind(this)
        this.getProducts = this.getProducts.bind(this)
        this.getDiscount = this.getDiscount.bind(this)
        this.updateProduct = this.updateProduct.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
        this.onSelectToView = this.onSelectToView.bind(this)
        this.closeOnSelectToView = this.closeOnSelectToView.bind(this)
        this.onChange = this.onChange.bind(this)
        this.changeProduct = this.changeProduct.bind(this)
    }

    resetAll(){
        this.setState({
            viewProduct: "",
            idDiscount: "",
            editProduct: "",
            newCantidad: "",
        })
    }

    getProducts(){
        Axios.get('http://localhost:4000/api/catalogos/inventario/getProductosHomePageByCatalogo/2')
        .then((response) => {
          if(response.data.error){
            alert(response.data.message)
          }else{
            this.setState({
              catalogo: response.data,
              loadingProducts: false,              
            })
          }
        })
      }

    getDiscount(){
        Axios.get('http://localhost:4000/api/descuentos/get-current')
        .then((response) => {
            if(response.data.error){
                alert(response.data.message)
            }else{
                this.setState({
                    discounts: response.data,    
                    loadingDiscounts: false         
                })
            }
        })
    }

    componentDidMount(){
        this.getProducts()
        this.getDiscount()
    }

    updateProduct(){        
        const mensaje = {
            cantidad_en_inventario: this.state.newCantidad,
            id_descuento: this.state.idDiscount
        }    
        Axios.put('http://localhost:4000/api/catalogos/inventario/update/'+this.state.editProduct+'/'+this.props.idSede, mensaje)
        .then(response => {
            if(response.data.error){
                alert(response.data.message)
            }else{
                alert(response.data.message)
                this.resetAll()
                this.getProducts()
                this.getDiscount()
            }
        })    
    }

    deleteProduct(){  
        let value = window.confirm("¿Esta seguro que desea eliminar este producto?")
        if(value){
            Axios.delete('http://localhost:4000/api/catalogos/inventario/delete/'+this.state.editProduct+'/'+this.props.idSede)
            .then(response => {
                if(response.data.error){
                    alert(response.data.message)
                }else{
                    alert(response.data.message)
                    this.resetAll()
                    this.getProducts()
                    this.getDiscount()
                }
            })   
        }      
    }

    onSelectToView(e){
        this.setState({
            viewProduct: this.state.catalogo[parseInt(e.target.value)].producto.id_producto,
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
    
    changeProduct(e){
        console.log(typeof(this.state.catalogo[parseInt(e.target.value)].producto.id_producto))
        this.setState({
            editProduct: this.state.catalogo[parseInt(e.target.value)].producto.id_producto,
            newCantidad: this.state.catalogo[parseInt(e.target.value)].cantidad_en_inventario,
            idDiscount: this.state.catalogo[parseInt(e.target.value)].descuento.id_descuento

        })
    }

    render(){
        if(this.state.loadingProducts || this.state.loadingDiscounts){
            return <Loading/>
        }
        return(
            <div id="inventory-ctn">
                <h2>Gestión del inventario</h2>
            <Table>
            <thead>
            <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Descuento</th>
                <th>Existencias</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>

                {this.state.catalogo.map((product, i) => (
                    <React.Fragment key={`producto${i}`}>
                    <tr>
                    <th scope="row">{i+1}</th>
                    <td>{product.producto.nombre_producto}</td>
                    <td>{product.producto.precio}</td>
                    <td>
                        {this.state.editProduct===product.producto.id_producto?
                            <Input type="select" name="idDiscount"
                            className="discount" value={this.state.idDiscount}
                            onChange={this.onChange('idDiscount')}>

                            {this.state.discounts.map((discount, index) => 
                                <option key={`discount${index}`} 
                                    value={discount.id_descuento}>
                                {discount.descripcion}
                                </option>
                            )}
                            </Input>  :
                            product.descuento.descripcion
                        }
                    </td>
                    <td>
                        {this.state.editProduct===product.producto.id_producto? 
                        <Input type="number" min="0" name="existencias" 
                            onChange = {this.onChange('newCantidad')}
                            className="existencias" value={this.state.newCantidad}
                        /> : product.cantidad_en_inventario
                        }
                    
                    </td>
                    <td>
                    {this.state.viewProduct === product.producto.id_producto? 
                        <button   
                        onClick={this.closeOnSelectToView}                                                                                      
                        className="fa fa-eye-slash comment-delete"/>
                        :  
                        <button value={i}  
                        onClick={this.onSelectToView}                                                                                      
                        className="fa fa-eye comment-edit"/>
                    }
                    {this.state.editProduct === product.producto.id_producto? 
                        <React.Fragment><button  value={i}
                        onClick={this.updateProduct}                                                                                      
                        className="fa fa-check comment-check"/>
                        <button  value={i}
                        onClick={this.deleteProduct}                                                                                      
                        className="fa fa-trash comment-delete"/>
                        </React.Fragment>
                        :  
                        <button value={i}
                        onClick={this.changeProduct}                                                                                      
                        className="fa fa-plus comment-edit"/>
                    }
                    </td>
                </tr>
                {this.state.viewProduct === product.producto.id_producto? 
                <tr>
                        <td colSpan="6">
                            <div id="img-container">
                            <br/>        
                            {product.producto.imagenes.map((imagen, index) => (
                                <div key={`imgProduct${index}`} className="img-ctn">                                                                 
                                    <img alt={`imagen${index}`}  
                                    src={`http://localhost:4000/${imagen.ruta}`}/>
                                </div>
                            ))}                        
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