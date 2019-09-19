import React from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2';

import { Table, UncontrolledCollapse, ListGroup, Button,
    ListGroupItem, Col, FormGroup, Label, Input, Row  } from 'reactstrap';

var options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0
        }    
      }]
    }
  };

let template = {
    labels: [],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        backgroundColor: 'rgba(192,75,75,0.4)',      
        data: []
      }
    ]
  };

class Reporte extends React.Component {
    constructor(props){
        super(props)
        this.state={
            lowSeller: {},
            seller: {},
            bestClients: {},
            birtgDay:[],
            rangeSold: template,
            initDate: "",
            finalDate: "",
            products: [],
            rangeProduts: template,
            idProduct: ""
        }
        this.getProdcuts = this.getProdcuts.bind(this)
        this.getSeller = this.getSeller.bind(this)
        this.getLowSeller = this.getLowSeller.bind(this)
        this.getBestClients = this.getBestClients.bind(this)
        this.getBirthDayCustomers = this.getBirthDayCustomers.bind(this)
        this.getSoldRange = this.getSoldRange.bind(this)
        this.getProductSoldRange = this.getProductSoldRange.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
    }

    getProdcuts(){
        axios.get('http://localhost:4000/api/productos/get')
        .then((response) => {
            if(response.data.error){
                alert(response.data.message)
            }           
            this.setState({
                products: response.data,
            })
        }).catch(err=>(
            alert("Error al carga productos, recargue la pagina")
        ))
    }

    getSeller(){
        let labels = [], data = [];
        axios.get('http://localhost:4000/reportes/getMasVendidos/')
        .then(response=>{
            response.data.data.forEach(prodcut => {
                labels.push(prodcut.nombre_producto)
                data.push(parseInt(prodcut.total_ventas))
            }) 
            let copy = JSON.parse(JSON.stringify(template))
            copy.datasets[0].label = 'Productos mas vendidos'
            copy.labels = labels            
            copy.datasets[0].data = data
            this.setState({
                seller: copy
            })
            
        })
    }

    getLowSeller(){
        let labels = [], data = [];
        axios.get('http://localhost:4000/reportes/getMenosVendidos/')
        .then(response=>{
            response.data.data.forEach(prodcut => {
                labels.push(prodcut.nombre_producto)
                data.push(parseInt(prodcut.total_ventas))
            }) 
            let copy = JSON.parse(JSON.stringify(template))
            copy.datasets[0].label = 'Productos menos vendidos'
            copy.labels = labels            
            copy.datasets[0].data = data
            this.setState({
                lowSeller: copy
            })
            
        })
    }

    getBestClients(){
        let labels = [], data = [];
        axios.get('http://localhost:4000/reportes/getMejoresClientes/')
        .then(response=>{
            response.data.forEach(client => {
                labels.push(client.nombres)
                data.push(parseInt(client.total_compras))
            }) 
            var copy = JSON.parse(JSON.stringify(template))
            copy.datasets[0].label = 'Clientes que mas compran'
            copy.labels = labels            
            copy.datasets[0].data = data
            console.log(copy)          
            this.setState({
                bestClients: copy
            })
            
        })
    }

    getBirthDayCustomers(){
        axios.get('http://localhost:4000/reportes/getBirthDayUsers/')
        .then(response=>{
            this.setState({
                birtgDay: response.data.data
            })            
        })
    }

    getSoldRange(){       
        if(this.state.initDate==="" || this.state.finalDate===""){
            alert("Fecha invalida")
            return null
        }
        let labels = [], data = [];
        let mensaje={
            since: this.state.initDate,
            until: this.state.finalDate
        }
        axios.post('http://localhost:4000/reportes/getVentasMesTienda/', mensaje)
        .then(response=>{
            console.log(response.data)
            response.data.forEach(sold => {
                labels.push(sold.fecha)
                data.push(parseInt(sold.ventas_dia))
            }) 
            var copy = JSON.parse(JSON.stringify(template))
            copy.datasets[0].label = 'Ventas'
            copy.labels = labels            
            copy.datasets[0].data = data
            this.setState({
                rangeSold: copy
            })  
            console.log(this.state.rangeSold)          
        })
        
    }


    getProductSoldRange(){       
        if(this.state.initDate==="" || this.state.finalDate===""){
            alert("Fecha invalida")
            return null
        }
        let labels = [], data = [];
        let mensaje={
            since: this.state.initDate,
            until: this.state.finalDate,
            id_producto: this.state.idProduct
        }
        axios.post('http://localhost:4000/reportes/getVentasMesTienda/', mensaje)
        .then(response=>{
            console.log(response.data)
            response.data.forEach(sold => {
                labels.push(sold.fecha)
                data.push(parseInt(sold.ventas_dia))
            }) 
            var copy = JSON.parse(JSON.stringify(template))
            copy.datasets[0].label = 'Ventas'
            copy.labels = labels            
            copy.datasets[0].data = data
            this.setState({
                rangeProduts: copy
            })  
            console.log(this.state.rangeSold)          
        })
        
    }
    componentDidMount(){
        this.getProdcuts()
        this.getSeller()
        this.getLowSeller()
        this.getBestClients()
        this.getBirthDayCustomers()
    }

    handleOnChange = input => e =>{ 
        this.setState({ [input]: e.target.value});
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
                        <div className="chart-ctn">    
                            <Bar  
                            options={options}                         
                            data={this.state.seller} />
                        </div>   
                    </UncontrolledCollapse>

                    <ListGroupItem>Productos menos vendidos                
                        <button  id="toggler2"                                          
                        className="fa fa-eye comment-edit"
                        />                                    
                    </ListGroupItem>

                    <UncontrolledCollapse toggler="toggler2">     
                    <div className="chart-ctn">    
                        <Bar  
                        options={options}                         
                        data={this.state.lowSeller} />
                        </div>
                    </UncontrolledCollapse> 

                    <ListGroupItem>Clientes que mas compran               
                        <button  id="toggler3"                                          
                        className="fa fa-eye comment-edit"
                        />                                    
                    </ListGroupItem>

                    <UncontrolledCollapse toggler="toggler3">     
                    <div className="chart-ctn">    
                        <Bar  
                        options={options}                         
                        data={this.state.bestClients} />
                        </div>
                    </UncontrolledCollapse> 

                    <ListGroupItem>Clientes que cumplen años este mes               
                        <button  id="toggler4"                                          
                        className="fa fa-eye comment-edit"
                        />                                    
                    </ListGroupItem>

                    <UncontrolledCollapse toggler="toggler4">     
                    {this.state.birtgDay.length===0?
                        <p>No hay usuarios cumpleañeros</p>
                        :
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Documento</th>
                                <th>Telefono</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.state.birtgDay.map((client, i)=>(
                                <tr key={`bdclient${i}`}>
                                    <th scope="row">{i+1}</th>
                                    <td>{client.nombres}</td>
                                    <td>{client.apellidos}</td>
                                    <td>{client.numero_documento}</td>
                                    <td>{client.telefono}</td>
                                </tr>
                                ))}
                                                        
                            </tbody>
                        </Table>
                    }
                    </UncontrolledCollapse>

                    <ListGroupItem>Ventas por fecha               
                        <button  id="toggler5"                                          
                        className="fa fa-eye comment-edit"
                        />                                    
                    </ListGroupItem> 
                    <UncontrolledCollapse toggler="toggler5">  
                    {true?
                    <React.Fragment>                        
                        <br/>
                        <FormGroup>
                            <Row>
                        <Col md={5}>                        
                    
                        <Label for="exampleDate">Fecha de inicio</Label>
                        <Input
                            type="date"
                            name="date"
                            id="fechaI"
                            placeholder="date placeholder"
                            value={this.state.initDate} 
                            onChange = {this.handleOnChange('initDate')}                           
                        />
                    
                    </Col>
                    
                    <Col md={5}>                                        
                        <Label for="exampleDate">Fecha de final</Label>
                        <Input
                            type="date"
                            name="date"
                            id="fechaF"
                            placeholder="fecha final"
                            value={this.state.finalDate} 
                            onChange = {this.handleOnChange('finalDate')}                           
                        />
                    </Col>

                    <Col md={2}>
                    <Button color="primary" onClick={this.getSoldRange}>Obtener</Button>{' '} 
                    </Col>
                    </Row>
                    </FormGroup>
                    {this.state.rangeSold.datasets[0].data.length!==0?
                        <Bar options={options}                         
                        data={this.state.rangeSold} 
                        /> : <h5>No hay productos que mostrar</h5>
                    }
                    </React.Fragment> : null
                    }
                    </UncontrolledCollapse> 


                    <ListGroupItem>Ventas de un producto especifico               
                        <button  id="toggler6"                                          
                        className="fa fa-eye comment-edit"
                        />                                    
                    </ListGroupItem> 
                    <UncontrolledCollapse toggler="toggler6">  
                    {true?
                    <React.Fragment>                        
                        <br/>
                        <FormGroup>
                            <Row>
                        <Col md={3}>                        
                    
                        <Label for="exampleDate">Fecha de inicio</Label>
                        <Input
                            type="date"
                            name="date"
                            id="fechaI"
                            placeholder="date placeholder"
                            value={this.state.initDate} 
                            onChange = {this.handleOnChange('initDate')}                           
                        />
                    
                    </Col>
                    
                    <Col md={3}>                                        
                        <Label for="exampleDate">Fecha de final</Label>
                        <Input
                            type="date"
                            name="date"
                            id="fechaF"
                            placeholder="fecha final"
                            value={this.state.finalDate} 
                            onChange = {this.handleOnChange('finalDate')}                           
                        />
                    </Col>

                    <Col md={4}>
                    <Input type="select" name="select" id="idProduct"
                        onChange={this.handleOnChange('idProduct')}>
                        {this.state.products.map((indice, i) => 
                          <option key={`prot${i}}`} 
                          value={indice.id_producto}>{indice.nombre_producto}</option>)
                        }
                      </Input>
                      </Col>
                    <Col md={1}>
                    <Button color="primary"  id="idProductBTN" onClick={this.getProductSoldRange}>Obtener</Button>{' '} 
                    </Col>
                    </Row>
                    </FormGroup>
                    {this.state.rangeProduts.datasets[0].data.length!==0?
                        <Bar options={options}                         
                        data={this.state.rangeProduts} 
                        /> : <h5>No hay datos mostrar</h5>
                    }
                    </React.Fragment> : null
                    }
                    </UncontrolledCollapse> 
                    </ListGroup>                

             </div>

        )
    }
}

export default Reporte;