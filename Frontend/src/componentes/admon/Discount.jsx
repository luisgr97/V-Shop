import React from 'react'
import axios from 'axios'
import { Container, Row, Col, Label, Button, Input, FormGroup, Table } from 'reactstrap';
import Loading from '../principal/Loading';

class Discount extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loading:true,
            name: "",
            value: "",
            initial:"",
            final: "",
            idDiscount: "",
            discounts: [],
            editName: "",
            editValue: "",
            editFinal:""
        }
        this.getDiscounts = this.getDiscounts.bind(this)
        this.createDiscount = this.createDiscount.bind(this)
        this.updateDiscount = this.updateDiscount.bind(this)
        this.editDiscount = this.editDiscount.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    getDiscounts(){
        axios.get('http://localhost:4000/api/descuentos/get')
        .then(response => {
            if(response.data.error){
                alert(response.data.message)
            }else{
                this.setState({
                    discounts: response.data,
                    loading:false
                })
            }
        })
    }


    componentDidMount(){
        this.getDiscounts()
    }

    createDiscount(){
        const mensaje = {
            descripcion: this.state.name,
            descuento:this.state.value,
            fecha_inicial: this.state.initial,
            fecha_final: this.state.final
        }        
        axios.post('http://localhost:4000/api/descuentos/create', mensaje)
        .then(response => {
            if(response.data.eror){
                alert(response.data.message)
            }else{
                alert(response.data.message)
                this.setState({
                    loading:true,                    
                })
                this.getDiscounts()
            }
        }).catch(err=> (
            alert('Intentelo mas tarde')
        ))
    }

    updateDiscount(){
        const mensaje = {
            descripcion: this.state.editName,
            descuento:this.state.editValue,
            fecha_final: this.state.editFinal
        }        
        axios.put('http://localhost:4000/api/descuentos/update/'+this.state.idDiscount, mensaje)
        .then(response => {
            if(response.data.eror){
                alert(response.data.message)
            }else{
                alert(response.data.message)
                this.getDiscounts()
            }
        }).catch(err=> (
            alert('Intentelo mas tarde')
        ))
    }

    editDiscount(e){
        const index = parseInt(e.target.value)        
        this.setState({
            idDiscount: this.state.discounts.current[index].id_descuento,
            editName: this.state.discounts.current[index].descripcion,
            editValue: this.state.discounts.current[index].descuento,
            editFinal: this.state.discounts.current[index].fecha_final
        })
    }

    onChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    render(){
        if(this.state.loading){
            return <Loading/>
        }
        return(
            <Container id="discount-ctn">
                <h2>Gestión de descuentos</h2>
                <h4>Crear un nuevo descuento</h4>
                 <Row>
                    <Col>
                        <FormGroup>
                        <Label for="nameDiscount">Nombre</Label>
                        <Input type="text" value={this.state.name} 
                         onChange={this.onChange('name')}
                            name="nameDiscount" id="nameDiscount" 
                        placeholder="Nombre del decuento" />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                        <Label for="valueDiscount">Valor del descuento</Label>
                        <Input type="number" value={this.state.value} 
                         onChange={this.onChange('value')}
                         max="1" min="0"
                        name="valueDiscount" id="valueDiscount" 
                        placeholder="Cuanto sera descontado" />
                        </FormGroup>
                    </Col>
                </Row>
                 <Row>
                    <Col>
                    <FormGroup>
                        <Label for="exampleDate">Fecha de inicio</Label>
                        <Input
                            value={this.state.initial} 
                            onChange={this.onChange('initial')}
                            type="date"
                            name="date"
                            id="exampleDate"
                            placeholder="date placeholder"
                        />
                        </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup>
                        <Label for="exampleDate">Fecha de finalización</Label>
                        <Input                        
                            value={this.state.final} 
                            onChange={this.onChange('final')}
                            type="date"
                            name="date"
                            id="exampleDate"
                            placeholder="date placeholder"
                        />
                        </FormGroup>
                    </Col>
                </Row>
                <div className="center">
                        <Button color="primary" onClick={this.createDiscount}>
                            Crear
                        </Button>{' '}
                    </div>
                    <br/>
                <h4>Descuentos inactivos</h4>

                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Descuento</th>
                        <th>Fecha en que inicio</th>
                        <th>Fecha en que finalizo</th>
                        <th>Eliminar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.discounts.expired.map((discount,i) => (            
                    <tr key={`expired${i}`} className="expired">
                        <th scope="row">{i+1}</th>
                        <td>{discount.descripcion}</td>
                        <td>{discount.descuento}</td>
                        <td>{discount.fecha_inicial}</td>
                        <td>{discount.fecha_final}</td>
                        <td>
                            <button                                
                             className="fa fa-trash comment-delete"/>
                        </td>
                    </tr>
                    ))}
                    </tbody>
                </Table>
                <br/>
                <h4>Descuentos activos</h4>

                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Descuento</th>
                        <th>Fecha incial</th>
                        <th>Fecha final</th>
                        <th>Editar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.discounts.current.map((discount,i) => (
                        discount.id_descuento===1? null :           
                        <tr key={`current${i}`} className="current">
                            <th scope="row">{i+1}</th>
                            {this.state.idDiscount===discount.id_descuento?
                                <React.Fragment>
                                    <td>
                                    <Input type="text" value={this.state.editName} 
                                        onChange={this.onChange('editName')}
                                        name="editnameDiscount" id="editnameDiscount" 
                                        placeholder="Nuevo nombre" />
                                    </td>
                                    <td>
                                    <Input type="number" value={this.state.editValue}                                         
                                            onChange={this.onChange('editValue')}
                                            name="newValue" id="newValue" 
                                            placeholder="Nuevo valor" max="1" min="0"/>
                                    </td>
                                    <td>{discount.fecha_inicial}</td>
                                    <td>
                                    <Input                        
                                        value={this.state.editFinal} 
                                        onChange={this.onChange('editFinal')}
                                        type="date"
                                        name="date"
                                        id="newFInal"
                                        placeholder="date placeholder"
                                    />  
                                    </td>
                                </React.Fragment>
                            :
                            <React.Fragment>
                                <td>{discount.descripcion}</td>
                                <td>{discount.descuento}</td>
                                <td>{discount.fecha_inicial}</td>
                                <td>{discount.fecha_final}</td>
                            </React.Fragment>
                            }
                            
                            <td>
                                {this.state.idDiscount===discount.id_descuento?
                                <button onClick={this.updateDiscount}                                                                  
                                className="fa fa-check comment-check"/> : 
                                <button value={i}
                                onClick={this.editDiscount}                                                     
                                className="fa fa-pen comment-edit" />
                                }
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default Discount;