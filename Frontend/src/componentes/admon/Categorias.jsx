import React, { Component } from 'react'
import axios from 'axios'

import Loading from '../principal/Loading'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class Categorias extends Component {
    constructor(props) {
        super(props)
        this.state = {
          loading: true,
          newTag: "",

          modTagName: "",
          idModTagName: "", 

          idTagForNewSubTag: "",
          newSubTag: "",
          
          indexForModTag: 0,
          modSubTagName: "",
          idModSubTagName: "",
          categorias: [],
        }
        this.getCategorias = this.getCategorias.bind(this)
        this.getInitialCategorias = this.getInitialCategorias.bind(this)
        this.crearCategoria = this.crearCategoria.bind(this)
        this.actualizarCategoria = this.actualizarCategoria.bind(this)
        this.borrarCategoria = this.borrarCategoria.bind(this)
        this.crearSubCategoria = this.crearSubCategoria.bind(this)
        this.actualizarSubCategoria = this.actualizarSubCategoria.bind(this)
        this.borrarSubCategoria = this.borrarSubCategoria.bind(this)
        this.onChange = this.onChange.bind(this) 
        this.onChangeParentTag = this.onChangeParentTag.bind(this)

    }

    getInitialCategorias(){
      axios.get('http://localhost:4000/api/categorias/getJoinSubCategoria')
      .then((response) => {
          this.setState({
              idModTagName: response.data[0].id_categoria,
              idModSubTagName: response.data[0].subcategoria[0].id_subcategoria,
              categorias: response.data,
              loading: false            
          })
      })
    }

    getCategorias(){
        axios.get('http://localhost:4000/api/categorias/getJoinSubCategoria')
        .then((response) => {
            this.setState({
                categorias: response.data             
            })
        })
    }

    componentDidMount(){
      this.getInitialCategorias()       
    }

    crearCategoria() {
        const mensaje = {
          nombre_categoria: this.state.newTag,
          linkimagen : "jalamelavalija.com"
        }        
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.post('http://localhost:4000/api/categorias', mensaje)
            .then((response) => {
                alert(JSON.stringify(response.data))
                this.getCategorias()
        })
    }

    actualizarCategoria() {
      const id_categoria = this.state.idModTagName
      const mensaje = {
          nombre_categoria: this.state.modTagName,
          linkimagen: "jalamelavalija.com"
      }
      //Axios se encarga de hacer solicitudes de forma sencilla
      axios.put('http://localhost:4000/api/categorias/update/' + id_categoria, mensaje)
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
          nombre_subcategoria: this.state.newSubTag,
          linkimagen: "jalamelavalija.com",
          id_categoria: this.state.idTagForNewSubTag
      }
      //Axios se encarga de hacer solicitudes de forma sencilla
      axios.post('http://localhost:4000/api/subcategorias/create', mensaje)
          .then((response) => {
              alert(JSON.stringify(response.data))
              this.getCategorias()
      })
    }

    actualizarSubCategoria() {
        const id_subcategoria =  this.state.idModSubTagName;
        const mensaje = {
          nombre_subcategoria: this.state.modSubTagName,
          linkimagen: "jalamelavalija.com",
          id_categoria: this.state.categorias[this.state.indexForModTag].id_categoria
        }
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.put('http://localhost:4000/api/subcategorias/update/' + id_subcategoria, mensaje)
            .then((response) => {
                alert(JSON.stringify(response.data))
                this.getCategorias()
        })        
    }

    borrarSubCategoria(){
        const id_subcategoria = this.state.idModSubTagName;
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.delete('http://localhost:4000/api/subcategorias/delete/' + id_subcategoria)
            .then((response) => {
                alert(JSON.stringify(response.data))
                this.getCategorias()
        })
    }

    //Captura en el estado correspondiente, el teclado
    onChange = input => e =>{
        this.setState({ [input]: e.target.value});
    } 

    onChangeParentTag = input => e =>{
        this.setState({ 
          [input]: e.target.value,
          idModSubTagName: this.state.categorias[e.target.value].subcategoria[0].id_subcategoria
        });
    }

    render() {
      if(this.state.loading){
        return(
          <Loading/>
        )
      }
      const categorias = this.state.categorias;
      return (
          <div id="admin-categorias">
              <div id="espacio" />
              <h2>Gestion de Categorias</h2>
              <Form>

                  <FormGroup>
                      <Label>Crear categoria</Label>
                      <Input type="text" name="newTag" id="newTag" 
                      placeholder="nombre de la categoria" 
                      onChange = {this.onChange('newTag')}/>
                      <Button color="primary" onClick={this.crearCategoria}>Crear</Button>{' '}
                  </FormGroup>

                  <FormGroup>
                      <Label>Modificar categoria</Label>
                      <Input type="select" name="select" id="idModTagName"
                        onChange={this.onChange('idModTagName')}>
                        {categorias.map((indice) => 
                          <option key={indice.nombre_categoria} 
                          value={indice.id_categoria}>{indice.nombre_categoria}</option>)
                        }
                      </Input>
                      <Input type="text" name="modTagName" id="modTagName" 
                        onChange={this.onChange('modTagName')}
                        placeholder="Nuevo nombre" />
                      <Button color="primary" onClick={this.actualizarCategoria}>Modificar</Button>{' '}
                      <Button color="danger" onClick={this.borrarCategoria}>Eliminar</Button>{' '}
                  </FormGroup>

              </Form>
              <br /><br />
              <h2>Gestion de Subcategorias</h2>
              <Form>
                  <FormGroup>
                      <Label>Crear Subcategoria</Label>
                      <Input type="select" name="select" id="idTagForNewSubTag"
                        onChange={this.onChange('idTagForNewSubTag')}>
                        {categorias.map((indice) => 
                          <option key={indice.nombre_categoria} 
                          value={indice.id_categoria}>{indice.nombre_categoria}</option>)
                        }
                      </Input>
                      <Input type="text" name="newSubTag" id="newSubTag" 
                        placeholder="nombre de la subcategoria" 
                        onChange = {this.onChange('newSubTag')}/>
                      <Button color="primary" onClick={this.crearSubCategoria} >Crear</Button>{' '}
                  </FormGroup>

                  <FormGroup>
                      <Label for="exampleEmail">Modificar subcategoria</Label>
                      <Input type="select" name="select" id="indexForModTag"
                        onChange={this.onChangeParentTag('indexForModTag')}>
                        {categorias.map((indice, index) => 
                          <option key={indice.nombre_categoria+index} 
                          value={index}>{indice.nombre_categoria}</option>)
                        }
                      </Input>      

                      <Input type="select" name="select" id="idModSubTagName"
                        onChange={this.onChange('idModSubTagName')}>
                        {this.state.categorias[this.state.indexForModTag].subcategoria.map((indice) => 
                          <option key={indice.nombre_subcategoria} 
                          value={indice.id_subcategoria}>{indice.nombre_subcategoria}</option>)
                        }
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