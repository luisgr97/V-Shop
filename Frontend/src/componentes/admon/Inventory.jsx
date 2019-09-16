import React from 'react'
import Axios from 'axios';

import { Table, Input } from 'reactstrap';

import Loading from '../principal/Loading'

class Inveory extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            idproduct: "",
            editQuantity: false,
            newCantidad: "",
            catalogo: []
        }
        this.onSelectToView = this.onSelectToView.bind(this)
        this.closeOnSelectToView = this.closeOnSelectToView.bind(this)
        this.onChange = this.onChange.bind(this)
        this.changeQuantity = this.changeQuantity.bind(this)
    }

    componentDidMount(){
        Axios.get('http://localhost:4000/api/catalogos/inventario/getProductosHomePageByCatalogo/2')
        .then((response) => {
          if(response.data.error){
    
          }else{
            this.setState({
              catalogo: response.data,
              loading: false,              
            })
          }
        })
      }

    onSelectToView(e){
        this.setState({
            idproduct: this.state.catalogo[parseInt(e.target.value)].producto.id_producto,
        })
        
    }

    closeOnSelectToView(){
        this.setState({
            idproduct: "",
        })
    }

    onChange = input => e =>{ 
        this.setState({ [input]: e.target.value});
    }
    
    changeQuantity(e){
        let cantidad;
        this.state.editQuantity? cantidad="" : 
        cantidad = this.state.catalogo[parseInt(e.target.value)].cantidad_en_inventario
        this.setState({
            editQuantity: !this.state.editQuantity,
            newCantidad: cantidad
        })
    }

    render(){
        if(this.state.loading){
            return <Loading/>
        }
        return(
            <div id="inventory-ctn">
            <Table>
            <thead>
            <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Marca</th>
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
                    <td>{product.producto.marca}</td>
                    <td>{product.descuento.descuento}</td>
                    <td>
                        {this.state.editQuantity? 
                        <Input type="number" min="0" name="existencias" 
                            onChange = {this.onChange('newCantidad')}
                            className="existencias" value={this.state.newCantidad}
                        /> : product.cantidad_en_inventario
                        }
                    
                    </td>
                    <td>
                    {this.state.idproduct === product.producto.id_producto? 
                        <button   
                        onClick={this.closeOnSelectToView}                                                                                      
                        className="fa fa-eye-slash comment-delete"/>
                        :  
                        <button value={i}  
                        onClick={this.onSelectToView}                                                                                      
                        className="fa fa-eye comment-edit"/>
                    }
                    {this.state.editQuantity? 
                        <button  value={i}
                        onClick={this.changeQuantity}                                                                                      
                        className="fa fa-check comment-check"/>
                        :  
                        <button value={i}
                        onClick={this.changeQuantity}                                                                                      
                        className="fa fa-plus comment-edit"/>
                    }
                    </td>
                </tr>
                {this.state.idproduct === product.producto.id_producto? 
                <tr>
                        <td colSpan="7">
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

export default Inveory;