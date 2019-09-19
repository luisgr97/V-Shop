import React from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2';

import { Table, UncontrolledCollapse, ListGroup, ListGroupItem  } from 'reactstrap';

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
            birtgDay:[]
        }
        this.getSeller = this.getSeller.bind(this)
        this.getLowSeller = this.getLowSeller.bind(this)
        this.getBestClients = this.getBestClients.bind(this)
        this.getBirthDayCustomers = this.getBirthDayCustomers.bind(this)
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

    componentDidMount(){
        this.getSeller()
        this.getLowSeller()
        this.getBestClients()
        this.getBirthDayCustomers()
    }

    render(){
       
console.log(template)

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

                    <ListGroupItem>Clientes que mas compran               
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

                    </ListGroup>                

             </div>

        )
    }
}

export default Reporte;