import React from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { UncontrolledCollapse, Table } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

import classnames from 'classnames';
import Registro from '../principal/Registro'
import Loading from '../principal/Loading'
import Axios from 'axios';

const propiedades = {
    tipo_documento: "CC",
    numero_documento: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    fecha_de_nacimiento: "",
    correo: "",
    nick: "",
    clave: "",
  };
  


class Managers extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loading: true,
            managers: [],
            activeTab: '1',
        }
        this.getManagers = this.getManagers.bind(this)
        this.toggle = this.toggle.bind(this);
        this.changeUserState = this.changeUserState.bind(this)
    }

    getManagers(){
        Axios.get('http://localhost:4000/usuario/get-manager')
        .then(response => {
            if(response.data.error){
                alert(response.data.message)
            }else{
                this.setState({
                    managers: response.data,
                    loading: false
                })
            }
        })
    }

    componentDidMount(){
        this.getManagers()
    }

    changeUserState(value){
        const estado = this.state.managers[value].estado===1? 0 : 1;
        const mensaje = {
            estado: estado,
            id_usuario: this.state.managers[value].id_usuario
        }
        Axios.post('http://localhost:4000/usuario/change-state', mensaje)
        .then(response =>{
            if(response.data.error){
                alert(response.data.message)
            }else{
                alert("Se actualizo el estado con exito")
                this.getManagers()
            }
        }).catch(err=>(
            alert("Por favor intentelo mas tarde")
        ))
        console.log(mensaje)
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
                images: []
            });
        }
    }

    render(){
        if(this.state.loading){
            return <Loading/>
        }
        return(
            <div className="admin-productos">
                <h2>Gestión de Gerentes</h2>    


                    <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}>
                            Crear un nuevo gerente
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}>
                            Consultar gerentes
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Registro isManager={true}  
                            actualizar={false}                  
                            datos={propiedades}
                            mensaje={"REGISTRAR GERENTE"} />
                    </TabPane>

                {/**PARA Actualziar PRODUCTOS */}
                    <TabPane tabId="2"> 
                    <ListGroup className="listaCompras manager-list">
                        {this.state.managers.map((manager , i) => (
                            <React.Fragment key={`managerData${manager.id_usuario}`}>
                                <ListGroupItem id={`tooglerM${manager.id_usuario}`} action>
                                {`Gerente: ${manager.nombres} ${manager.apellidos} - CC: ${manager.numero_documento}`}
                                </ListGroupItem>
                                <UncontrolledCollapse toggler={`#tooglerM${manager.id_usuario}`}>
                                    <div className="manager-data">
                                    <Table>
                                        <thead>
                                        <tr>
                                            <th>Nombre completo</th>
                                            <th>Tipo de documento</th>
                                            <th>Numero</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{`${manager.nombres} ${manager.apellidos}`}</td>
                                            <td>{`${manager.tipo_documento}`}</td>
                                            <td>{`${manager.numero_documento}`}</td>
                                        </tr>
                                        </tbody>                                       
                                    </Table>
                                    <Table>
                                    <thead>
                                        <tr>
                                            <th>Telefono</th>
                                            <th>Dirección</th>
                                            <th>Email</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{`${manager.telefono}`}</td>
                                            <td>{`${manager.direccion}`}</td>
                                            <td>{`${manager.correo}`}</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                    <Table>
                                    <thead>
                                        <tr>
                                            <th>Fecha_de_nacimiento</th>
                                            <th>Nick</th>
                                            <th>Estado</th>
                                            <th>Sede asignada</th>
                                            <th>{manager.estado===1? "Inhabilitar" : "Habilitar"}</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{`${manager.fecha_de_nacimiento}`}</td>
                                            <td>{`${manager.nick}`}</td>
                                            <td><span className={manager.estado===1? "active" : "inactive"}>
                                                {manager.estado === 1? "activo" : "inactivo"}
                                                </span>
                                            </td>
                                            <td>{manager.catalogo === null? "Ninguna" : manager.catalogo.ciudad}</td>
                                            <td>
                                                <button onClick={() => this.changeUserState(i)}                                                 
                                                    className="fa fa-power-off comment-edit"
                                                />
                                            </td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                    </div>
                                </UncontrolledCollapse>
                            </React.Fragment>
                        ))}
                    
                    </ListGroup>
                    </TabPane>
                </TabContent>
                
            </div>
        )
    }
}


export default Managers;