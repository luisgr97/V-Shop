import React from 'react'
import {Redirect} from 'react-router-dom'

import { Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';
import Loading from '../principal/Loading'
import Axios from 'axios';

class Sedes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loadingManager: true,
            loadingCatalog: true,
            managers: [],
            catalogs: [],
            nameCatalog: "",
            idManagerInCharge: "",
            city: "",
        }
        this.onChange = this.onChange.bind(this)
        this.crearCatalogo = this.crearCatalogo.bind(this)
        this.getAvailableManagers = this.getAvailableManagers.bind(this)
    }

    getAvailableManagers(){
        Axios.get('http://localhost:4000/usuario/usuariosdisponibles')
        .then(response => {
            if(response.data.length === 0){
                alert("No hay gerentes disponibles, por favor cree uno")
                this.setState({
                    managers: [],
                    loadingManager: false
                })
            }else{
                this.setState({
                    managers: response.data,
                    loadingManager: false,
                    idManagerInCharge: response.data[0].id_usuario
                })
            }

        }).catch(err => ( alert("Intentelo mas tarde")))
    }

    getCatalogos(){
        Axios.get('http://localhost:4000/usuario/usuariosdisponibles')
        .then(response => {
            if(response.data.length === 0){
                alert("No hay gerentes disponibles, por favor cree uno")
                this.setState({
                    catalogs: [],
                    loadingManager: false
                })
            }else{
                this.setState({
                    catalogs: response.data,
                    loadingManager: false,
                })
            }

        }).catch(err => ( alert("Intentelo mas tarde")))
    }

    componentDidMount(){
        this.getAvailableManagers()
    }

    crearCatalogo(){
        let mensaje = {
            ciudad: this.state.city,
            id_gerente: this.state.idManagerInCharge,
            nombre_catalogo: this.state.nameCatalog
        }
        Axios.post('http://localhost:4000/api/catalogos/create', mensaje)
        .then(response => {
            if(response.data.error){
                alert("Error en la creacion, intentelo de nuevo")
            }else{
                alert(response.data.message)
                this.setState({
                    loadingManager: true,
                    managers: [],
                    nameCatalog: "",
                    idManagerInCharge: "",
                    city: "",
                })
                this.getAvailableManagers()
            }
        }).catch(err => (alert("Intentelo mas tarde")))
    }

    //Captura en el estado correspondiente, el teclado
    onChange = input => e => {
        this.setState({ [input]: e.target.value });
    }


    render() {
        if(this.state.loadingManager){
            return <Loading/>
        }
        console.log(this.state.managers.length)
        if(this.state.managers.length===0){
            return <Redirect to="gerentes"/>
        }
        return (
            <div id="admin-catalogo">
                <h2>Gestion de Catalogos</h2>
                <h4>Crear un nuevo catalogo</h4>
                <br/>
                <Form>
                    <Row>
                        <Col xs={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Ciudad del catalogo</Label>
                                <Input type="text" name="cityCatalog" id="cityCatalog" 
                                    placeholder="Ciudad" 
                                    onChange={this.onChange('city')}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Nombre del catalogo</Label>
                                <Input type="text" name="nameCatalog" id="nameCatalog" 
                                    placeholder="Nombre" 
                                    onChange={this.onChange('nameCatalog')}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Label>Asignar un Gerente</Label>
                    <Input type="select" name="select" id="idManagerInCharge"
                        onChange={this.onChange('idManagerInCharge')}>
                        {this.state.managers.map((gerente) =>
                            <option key={`manager${gerente.id_usuario}`}
                                value={gerente.id_usuario}>
                                {`${gerente.nombres} ${gerente.apellidos} - cc ${gerente.numero_documento}`}
                            </option>)
                        }
                    </Input>
                    <div className="center">
                        <Button color="primary" onClick={this.crearCatalogo}>Crear</Button>{' '}
                    </div>
                </Form>
                <br/><br/>
                <h4>Modificar catalogo existente</h4>
                <br/>
                <Form>
                    <Row>
                        <Col xs={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Ciudad del catalogo</Label>
                                <Input type="text" name="cityCatalog" id="cityCatalog" 
                                    placeholder="Ciudad" 
                                    onChange={this.onChange('city')}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Nombre del catalogo</Label>
                                <Input type="text" name="nameCatalog" id="nameCatalog" 
                                    placeholder="Nombre" 
                                    onChange={this.onChange('nameCatalog')}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Label>Asignar un Gerente</Label>
                    <Input type="select" name="select" id="idManagerInCharge"
                        onChange={this.onChange('idManagerInCharge')}>
                        {this.state.managers.map((gerente) =>
                            <option key={`manager${gerente.id_usuario}`}
                                value={gerente.id_usuario}>
                                {`${gerente.nombres} ${gerente.apellidos} - cc ${gerente.numero_documento}`}
                            </option>)
                        }
                    </Input>
                    <div className="center">
                        <Button color="primary" onClick={this.crearCatalogo}>Modificar</Button>{' '}
                    </div>
                </Form>
            </div>
        )
    }
}

export default Sedes;