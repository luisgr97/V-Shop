import React from 'react'
import axios from 'axios'
import { Table, UncontrolledCollapse, ListGroup, ListGroupItem  } from 'reactstrap';

class Reporte extends React.Component {
    constructor(props){
        super(props)
        this.state={
            lowSeller: [],
            seller: [],
            lesTen: []
        }
        this.getSeller = this.getSeller.bind(this)
        this.getLowSeller = this.getLowSeller.bind(this)
        this.getLesTen = this.getLesTen.bind(this)
    }


    getSeller(){
        axios.get('http://localhost:4000/reportes/getMasVendidosPorSede/' + this.props.idSede)
        .then(response=>{
            this.setState({
                seller: response.data.data
            })
        })
    }

    getLowSeller(){
        axios.get('http://localhost:4000/reportes/getMenosVendidosPorSede/' + this.props.idSede)
        .then(response=>{
            this.setState({
                lowSeller: response.data.data
            })
        })
    }

    getLesTen(){
        axios.get('http://localhost:4000/reportes/getProductLessTen/' + this.props.idSede)
        .then(response=>{
            console.log(response.data)

            this.setState({
                lesTen: response.data.data
            })
        })
    }

    componentDidMount(){
        this.getSeller()
        this.getLowSeller()
        this.getLesTen()
    }

    render(){
        return(
            <div id="reportes-ctn">
                <h2>Reportes</h2>
                <ListGroup>
                <ListGroupItem>Productos mas vendidos
                <button  id="toggler1"                                          
                    className="fa fa-eye comment-edit"
                />
                </ListGroupItem>
                    <UncontrolledCollapse toggler="toggler1">        
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Producto</th>
                                <th>Total ventas</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.state.seller.map((product, i)=>(
                                     <tr key={`seller${i}`}>
                                     <th scope="row">{i+1}</th>
                                     <td>{product.nombre_producto}</td>
                                     <td>{product.total_ventas}</td>
                                 </tr>
                                ))}                                                       
                            </tbody>
                        </Table>           
                    </UncontrolledCollapse> 

                    <ListGroupItem>Productos menos vendidos                
                    <button  id="toggler2"                                          
                    className="fa fa-eye comment-edit"
                    />                                    
                    </ListGroupItem>                    
                    <UncontrolledCollapse toggler="toggler2">        
                    <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Producto</th>
                                <th>Total ventas</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.state.lowSeller.map((product, i)=>(
                                     <tr key={`seller${i}`}>
                                     <th scope="row">{i+1}</th>
                                     <td>{product.nombre_producto}</td>
                                     <td>{product.total_ventas}</td>
                                 </tr>
                                ))}                                                       
                            </tbody>
                        </Table>   
                    </UncontrolledCollapse> 

                    <ListGroupItem>Productos con bajas existencias                
                    <button  id="toggler3"                                          
                    className="fa fa-eye comment-edit"
                    />                                    
                    </ListGroupItem>                    
                    <UncontrolledCollapse toggler="toggler3">        
                    <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Marca</th>
                                <th>Cantidad</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.state.lesTen.map((product, i)=>(
                                     <tr key={`les${i}`}>
                                     <th scope="row">{i+1}</th>
                                     <td>{product.nombre_producto}</td>
                                     <td>{product.precio}</td>
                                     <td>{product.marca}</td>
                                     <td>{product.inventario_catalogo_productos[0].cantidad_en_inventario}</td>
                                 </tr>
                                ))}                                                       
                            </tbody>
                        </Table>   
                    </UncontrolledCollapse> 
                </ListGroup>
            </div>
        )
    }
}

export default Reporte;