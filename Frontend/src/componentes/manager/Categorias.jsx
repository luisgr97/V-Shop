import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'


const categorias = [
    {
      "id_categoria": 1,
      "nombre_categoria": "EQUIPOS DE COMPUTO",
      "linkimagen": null,
      "subcategoria": [
        {
          "id_subcategoria": 1,
          "nombre_subcategoria": "DESKTOP",
          "linkimagen": null,
          "id_categoria": 1
        },
        {
          "id_subcategoria": 2,
          "nombre_subcategoria": "GAMER O DE ALTO REDIMIENTO",
          "linkimagen": null,
          "id_categoria": 1
        },
        {
          "id_subcategoria": 3,
          "nombre_subcategoria": "PORTATILES",
          "linkimagen": null,
          "id_categoria": 1
        }
      ]
    },
    {
      "id_categoria": 2,
      "nombre_categoria": "DISPOSITIVOS MOVILES",
      "linkimagen": null,
      "subcategoria": [
        {
          "id_subcategoria": 4,
          "nombre_subcategoria": "GAMA ALTA",
          "linkimagen": null,
          "id_categoria": 2
        },
        {
          "id_subcategoria": 5,
          "nombre_subcategoria": "GAMA MEDIA",
          "linkimagen": null,
          "id_categoria": 2
        },
        {
          "id_subcategoria": 6,
          "nombre_subcategoria": "GAMA BAJA",
          "linkimagen": null,
          "id_categoria": 2
        }
      ]
    },
    {
      "id_categoria": 3,
      "nombre_categoria": "CONSOLAS DE VIDEO JUEGOS",
      "linkimagen": null,
      "subcategoria": [
        {
          "id_subcategoria": 7,
          "nombre_subcategoria": "CONSOLAS TRADICIONALES",
          "linkimagen": null,
          "id_categoria": 3
        },
        {
          "id_subcategoria": 8,
          "nombre_subcategoria": "CONSOLAS PORTATILES",
          "linkimagen": null,
          "id_categoria": 3
        },
        {
          "id_subcategoria": 9,
          "nombre_subcategoria": "ARCADES",
          "linkimagen": null,
          "id_categoria": 3
        }
      ]
    },
    {
      "id_categoria": 4,
      "nombre_categoria": "SMART WIDGETS",
      "linkimagen": null,
      "subcategoria": [
        {
          "id_subcategoria": 10,
          "nombre_subcategoria": "SMART TIME",
          "linkimagen": null,
          "id_categoria": 4
        },
        {
          "id_subcategoria": 11,
          "nombre_subcategoria": "SMART HOME",
          "linkimagen": null,
          "id_categoria": 4
        },
        {
          "id_subcategoria": 12,
          "nombre_subcategoria": "SMART LIVE",
          "linkimagen": null,
          "id_categoria": 4
        }
      ]
    },
    {
      "id_categoria": 5,
      "nombre_categoria": "ZONA MULTIMEDIA",
      "linkimagen": null,
      "subcategoria": [
        {
          "id_subcategoria": 13,
          "nombre_subcategoria": "PROYECTORES DE VIDEO",
          "linkimagen": null,
          "id_categoria": 5
        },
        {
          "id_subcategoria": 14,
          "nombre_subcategoria": "CONSOLAS DE SONIDO",
          "linkimagen": null,
          "id_categoria": 5
        },
        {
          "id_subcategoria": 15,
          "nombre_subcategoria": "SISTEMAS DE GRABACIÓN MULTIMEDIA",
          "linkimagen": null,
          "id_categoria": 5
        }
      ]
    }
  ]

  
class Categorias extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newTag: "",
            modTagName: "",
            idModTagName: "", 
            newSubTag: "",
            categorias: [
                {
                    nombre: ""
                }
            ],
            modSubTagName: "",
            idModSubTagName: "",
            subCategorias: [
                {
                    nombre: ""
                }
            ]
        }
        this.getCategorias = this.getCategorias.bind(this)
        this.crearCategoria = this.crearCategoria.bind(this)
        this.actualizarCategoria = this.actualizarCategoria.bind(this)
        this.borrarCategoria = this.borrarCategoria.bind(this)
        this.getSubCategorias = this.getSubCategorias.bind(this)
        this.crearSubCategoria = this.crearSubCategoria.bind(this)
        this.actualizarSubCategoria = this.actualizarSubCategoria.bind(this)
        this.borrarSubCategoria = this.borrarSubCategoria.bind(this)
        this.onChange = this.onChange.bind(this) 
        this.onSelect = this.onSelect.bind(this)
        this.onModifyChange = this.onModifyChange.bind(this)

    }

    
    getCategorias(){
        axios.get('http://localhost:4000/api/categorias')
        .then((response) => {
            //console.log(response.data.data)
            console.log(response.data.data)
            this.setState({
                categorias: response.data.data
            })
        })
    }

    getSubCategorias(){
        axios.get('http://localhost:4000/api/subcategorias')
        .then((response) => {
            //console.log(response.data.data)
            console.log(response.data.data)
            this.setState({
                subCategorias: response.data.data
            })
        })
    }


    componentDidMount(){
        this.getCategorias()
       // this.getSubCategorias()
    }

    /*
    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.categorias != nextState.categorias){
            console.log("Son diferentes")
            return true
        }else{
            this.getCategorias()
            return false
        }
      }
*/

    crearCategoria() {
        const mensaje = {
            nombre: this.state.newTag,
        }
        
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.post('http://localhost:4000/api/categorias', mensaje)
            .then((response) => {
                alert(JSON.stringify(response.data))
                this.getCategorias()
        })
    }

    actualizarCategoria() {
        const mensaje = {
            id_categoria: this.state.idModTagName,
            nombre: this.state.modTagName
        }
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.put('http://localhost:4000/api/categorias/update', mensaje)
            .then((response) => {
                alert(JSON.stringify(response.data))
                this.getCategorias()
        })
        
    }

    borrarCategoria(){
        const id_categoria = this.state.idModTagName;
        
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.delete('http://localhost:4000/api/categorias/' + id_categoria)
            .then((response) => {
                alert(JSON.stringify(response.data))
                this.getCategorias()
        })
    }

    crearSubCategoria() {
        const mensaje = {
            nombre: this.state.newSubTag,
            id_categoria: this.state.idNuevoNombre
        }
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.post('http://localhost:4000/api/subcategorias', mensaje)
            .then((response) => {
                alert(JSON.stringify(response.data))
                this.getSubCategorias()
        })
    }

    actualizarSubCategoria() {
        const id_subcategoria =  this.state.idModSubTagName;
        const mensaje = {
            nombre: this.state.modSubTagName
        }
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.put('http://localhost:4000/api/subcategorias/' + id_subcategoria, mensaje)
            .then((response) => {
                alert(JSON.stringify(response.data))
                this.getSubCategorias()
        })        
    }

    borrarSubCategoria(){
        const id_subcategoria = this.state.idModSubTagName;
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.delete('http://localhost:4000/api/subcategorias/' + id_subcategoria)
            .then((response) => {
                alert(JSON.stringify(response.data))
                this.getSubCategorias()
        })
    }

    onChange = input => e =>{ 
        this.setState({ [input]: e.target.value});
    } 

    onModifyChange = input => e =>{ 
        const { modificarProducto } = {...this.state};
        const currentState = modificarProducto;
        currentState[input] = e.target.value
        this.setState({
            modificarProducto: currentState    
        });
    }

    onSelect(e) {         
        this.setState({modificarProducto: this.state.categorias[[e.target.value]]})
    }   
    
    render() {
        const categorias = this.state.categorias;
        const subCategorias = this.state.subCategorias;
        //console.log(categorias)
        return (
            <div className="categorias">
                <div id="espacio" />
                <h2>Gestion de Categorias</h2>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Crear categoria</Label>
                        <Input type="text" name="email" id="crearCategoria" 
                        placeholder="nombre de la categoria" 
                        onChange = {this.onChange('newTag')}/>
                        <Button color="primary" onClick={this.crearCategoria}>Crear</Button>{' '}
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Modificar categoria</Label>
                        <Input type="select" name="select" id="exampleSelect"
                        onChange={this.onChange('idModTagName')}>
                        {categorias.map((indice, index) => 
                        <option key={index} 
                        value={indice.id_categoria}>{indice.nombre}</option>)}
                        </Input>
                        <Input type="text" name="email" id="modificarCategoria" 
                        onChange={this.onChange('modTagName')}placeholder="Nuevo nombre" />
                        <Button color="primary" onClick={this.actualizarCategoria}>Modificar</Button>{' '}
                        <Button color="danger" onClick={this.borrarCategoria}>Eliminar</Button>{' '}
                    </FormGroup>

                </Form>
                <br />
                <h2>Gestion de Subcategorias</h2>
                <Form>
                    <FormGroup>
                        <Label for="exampleEmail">Crear Subcategoria</Label>
                        <Input type="select" name="select" id="exampleSelect"
                        onChange={this.onChange('idModTagName')}>
                        {categorias.map((indice, index) => 
                        <option key={index} 
                        value={indice.id_categoria}>{indice.nombre}</option>)}
                        </Input>
                        <Input type="text" name="email" id="crearCategoria" 
                        placeholder="nombre de la subcategoria" 
                        onChange = {this.onChange('newSubTag')}/>
                        <Button color="primary" onClick={this.crearSubCategoria} >Crear</Button>{' '}
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleEmail">Modificar subcategoria</Label>
                        <Input type="select" name="select" id="exampleSelect"
                        onChange={this.onChange('idModSubTagName')}>
                        {subCategorias.map((indice, index) => 
                        <option key={index} 
                        value={indice.id_subcategoria}>{indice.nombre}</option>)}
                        </Input>
                        <Input type="text" name="email" id="modificarCategoria" 
                        placeholder="Nuevo nombre" 
                        onChange = {this.onChange('modSubTagName')}/>
                        <Button color="primary" onClick={this.actualizarSubCategoria}>Modificar</Button>{' '}
                        <Button color="danger" onClick={this.borrarSubCategoria}>Eliminar</Button>{' '}

                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default Categorias;