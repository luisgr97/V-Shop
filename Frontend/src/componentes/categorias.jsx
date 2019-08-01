import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'


class Categorias extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categorias: {},
            nuevaCategoria: ""
        }
        this.crearCategoria = this.crearCategoria.bind(this)
        this.onChange = this.onChange.bind(this) 

    }

    crearCategoria() {
        const mensaje = {
            categoria: this.state.nuevaCategoria,
        }
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.post('http://localhost:4001/api/categorias/', mensaje)
            .then((response) => {
                alert(JSON.stringify(response.data))
            })
    }

    modificarCategoria() {
        const mensaje = {
            clave: this.state.password,
            nick: this.state.nick
        }
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.post('http://localhost:5000/admins/login', mensaje)
            .then((response) => {
                alert(JSON.stringify(response.data))
            })
    }

    onChange = input => e =>{ 
        this.setState({ [input]: e.target.value});
      }  
    
    render() {
        return (
            <div className="categorias">
                <div id="espacio" />
                <h2>Gestion de Categorias</h2>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Crear categoria</Label>
                        <Input type="text" name="email" id="crearCategoria" 
                        placeholder="nombre de la categoria" 
                        onChange = {this.onChange('nuevaCategoria')}/>
                        <Button color="primary" onClick={this.crearCategoria}>Crear</Button>{' '}
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Modificar categoria</Label>
                        <Input type="select" name="select" id="exampleSelect">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                        <Input type="text" name="email" id="modificarCategoria" placeholder="Nuevo nombre" />
                        <Button color="primary">Modificar</Button>{' '}
                        <Button color="danger">Eliminar</Button>{' '}

                    </FormGroup>
                </Form>
                <br />
                <h2>Gestion de Subcategorias</h2>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Crear Subcategoria</Label>
                        <Input type="select" name="select" id="exampleSelect" >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                        <Input type="text" name="email" id="crearCategoria" placeholder="nombre de la categoria" />
                        <Button color="primary">Crear</Button>{' '}
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Modificar subcategoria</Label>
                        <Input type="select" name="select" id="exampleSelect">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                        <Input type="select" name="select" id="exampleSelect">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                        <Input type="text" name="email" id="modificarCategoria" placeholder="Nuevo nombre" />
                        <Button color="primary">Modificar</Button>{' '}
                        <Button color="danger">Eliminar</Button>{' '}

                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default Categorias;