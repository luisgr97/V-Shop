import React from 'react'

import { UncontrolledAlert, Table, Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap';
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

            indexCatalogModify: "",
            idEditCatalog: "",
            editName: "",
            editCity: "",
            editManager: ""

        }
        this.resetAll = this.resetAll.bind(this)
        this.onChange = this.onChange.bind(this)
        this.crearCatalogo = this.crearCatalogo.bind(this)
        this.editCatalog = this.editCatalog.bind(this)
        this.getAvailableManagers = this.getAvailableManagers.bind(this)
        this.getCatalogos = this.getCatalogos.bind(this)
        this.handleEditCatalog = this.handleEditCatalog.bind(this)
        this.closeEditCatalog = this.closeEditCatalog.bind(this)
    }

    resetAll(){
        this.setState({
            loadingManager: true,
            loadingCatalog: true,
            managers: [],
            catalogs: [],
            nameCatalog: "",
            idManagerInCharge: "",
            city: "",
            indexCatalogModify: "",
            idEditCatalog: "",
            editName: "",
            editCity: "",
            editManager: ""
        })
    }

    getAvailableManagers(){
        Axios.get('http://localhost:4000/usuario/usuariosdisponibles')
        .then(response => {            
            this.setState({
                managers: response.data,
                loadingManager: false,
                idManagerInCharge: response.data.length===0? "" : response.data[0].id_usuario
            })            
        }).catch(err => ( alert("No se cargaron los gerentes disponibles, intentelo mas tarde")))
    }

    getCatalogos(){
        Axios.get('http://localhost:4000/usuario/joinCatalog')
        .then(response => {
            if(response.data.error){
                alert(response.data.message)                
            }else{
                this.setState({
                    catalogs: response.data,
                    loadingCatalog: false,
                })
            }
        }).catch(err => ( alert("No se obtuvieron los catalogos, intentelo mas tarde")))
    }

    componentDidMount(){
        this.getAvailableManagers()
        this.getCatalogos()
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
                this.resetAll()
                this.getAvailableManagers()
                this.getCatalogos()
            }
        }).catch(err => (alert("Intentelo mas tarde")))
    }

    editCatalog(){
        let mensaje = {
            ciudad: this.state.editCity,
            id_gerente: this.state.editManager,
            nombre_catalogo: this.state.editName
        }
        Axios.put('http://localhost:4000/api/catalogos/update/' + this.state.idEditCatalog, mensaje)
        .then(response => {
            if(response.data.error){
                alert("Error en la atualizacion, intentelo de nuevo")
            }else{
                alert(response.data.message)
                this.resetAll()
                this.getAvailableManagers()
                this.getCatalogos()
            }
        }).catch(err => (alert("Intentelo mas tarde")))
    }

    //Captura en el estado correspondiente, el teclado
    onChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    handleEditCatalog(e){
        let index = parseInt(e.target.value)
        this.setState({
            indexCatalogModify: index,
            idEditCatalog: this.state.catalogs[index].catalogo.id_catalogo,
            editName: this.state.catalogs[index].catalogo.nombre_catalogo,
            editCity: this.state.catalogs[index].catalogo.ciudad,
            editManager: this.state.managers.length===0? "" : this.state.managers[0].id_usuario,
        })    
    }

    closeEditCatalog(){
        this.setState({
            indexCatalogModify: "",
            idEditCatalog: "",
            editName: "",
            editCity: "",
            editManager: "",
        })
    }

    render() {
        console.log("Se renderizo el catalogo")
        if(this.state.loadingManager || this.state.loadingCatalog){
            return <Loading/>
        }

        return (
            <div id="admin-catalogo">
                <h2>Gestion de Catalogos</h2>
                <h4>Crear un nuevo catalogo</h4>
                <br/>
                <Form>
                    {this.state.managers.length===0? 
                    <UncontrolledAlert color="danger">
                        No hay gerentes disponibles para nuevos catalogos, Por favor cree uno!
                    </UncontrolledAlert> : null 
                    }
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
                        {this.state.managers.length!==0?
                            this.state.managers.map((gerente) =>
                            <option key={`manager${gerente.id_usuario}`}
                                value={gerente.id_usuario}>
                                {`${gerente.nombres} ${gerente.apellidos} - cc ${gerente.numero_documento}`}
                            </option>) : <option>Ninguno</option>
                        }
                    </Input>
                    <div className="center">
                        <Button color="primary" 
                        disabled={this.state.managers.length===0? true : false} 
                        onClick={this.crearCatalogo}>Crear</Button>{' '}
                    </div>
                </Form>
                <br/><br/>
                <h4>Modificar catalogo existente</h4>
                <br/>
                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Ciudad</th>
                        <th>Catalogo</th>
                        <th>Encargado</th>
                        <th>Acción</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.catalogs.map((ele, i) => 
                        <React.Fragment key={`ele${i}`}>   
                        <tr id={parseInt(this.state.indexCatalogModify) === i? "seleccionado" : ""}>                     
                            <th scope="row">{i+1}</th>
                            <td>{ele.catalogo.ciudad}</td>
                            <td>{ele.catalogo.nombre_catalogo}</td>
                            <td>{`${ele.nombres} ${ele.apellidos}`}</td>
                            <td>
                            {parseInt(this.state.indexCatalogModify) === i?
                                <React.Fragment>
                                    <button value={i}
                                        onClick={this.editCatalog}                               
                                        className="fa fa-check comment-check"/>
                                    <button onClick={this.closeEditCatalog}                                   
                                        className="fa fa-times comment-delete"/>
                                </React.Fragment> :
                                <React.Fragment>
                                    <button value={i}
                                    onClick={this.handleEditCatalog}                               
                                    className="fa fa-pen comment-edit" />
                                    <button onClick={this.closeEditCatalog}                                   
                                        className="fa fa-trash comment-delete"/>
                                </React.Fragment> 
                            }                                                                
                            </td>
                        </tr>

                        {parseInt(this.state.indexCatalogModify) === i?
                            <tr>
                                <td colSpan="5"  className="editcatalog">
                                    <Form>
                                        <Row>                                   
                                            <Col xs={6}>
                                                <FormGroup>
                                                    <Label for="editcityCatalog">Ciudad del catalogo</Label>
                                                    <Input type="text" name="editcityCatalog" id="editcityCatalog" 
                                                        placeholder="Nueva ciudad" value={this.state.editCity}
                                                        onChange={this.onChange('editCity')}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col xs={6}>
                                                <FormGroup>
                                                    <Label for="editnameCatalog">Nombre del catalogo</Label>
                                                    <Input type="text" name="editnameCatalog" id="editnameCatalog" 
                                                        placeholder="Nombre" value={this.state.editName}
                                                        onChange={this.onChange('editName')}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Label>Nuevo Gerente</Label>
                                        <Input type="select" name="editManager" id="editManager"
                                            onChange={this.onChange('editManager')}>
                                            {this.state.managers.length!==0?
                                            this.state.managers.map((gerente) =>
                                                <option key={`manager${gerente.id_usuario}`}
                                                    value={gerente.id_usuario}>
                                                    {`${gerente.nombres} ${gerente.apellidos} - cc ${gerente.numero_documento}`}
                                                </option>) : <option>Ninguno</option>
                                            }
                                        </Input>                                        
                                    </Form>
                    
                                </td>                                
                            </tr> : null
                        }
                        </React.Fragment>
                        )
                    }                       
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default Sedes;