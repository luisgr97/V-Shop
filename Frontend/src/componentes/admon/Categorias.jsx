import React, { Component } from 'react'
import axios from 'axios'

import Loading from '../principal/Loading'
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';


class Categorias extends Component {
    constructor(props) {
        super(props)
        this.state = {
          loading: true,
          newTag: "",

          modTagName: "",
          indexModTagName: 0, 

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
                categorias: response.data,
            })
        })
    }

    componentDidMount(){
      this.getInitialCategorias()       
    }

    crearCategoria() {
        const mensaje = {
          nombre_categoria: this.state.newTag
        }        
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.post('http://localhost:4000/api/categorias/create', mensaje)
            .then((response) => {
                alert(response.data.message)
                this.getCategorias()
        })
    }

    actualizarCategoria() {
      const index = parseInt(this.state.indexModTagName)
      const id_categoria = this.state.categorias[index].id_categoria
      const mensaje = {
          nombre_categoria: this.state.modTagName
      }
      //Axios se encarga de hacer solicitudes de forma sencilla
      axios.put('http://localhost:4000/api/categorias/update/' + id_categoria, mensaje)
          .then((response) => {
              alert(response.data.message)
              this.getCategorias()
      })
        
    }

    borrarCategoria(){
      var confirmar = window.confirm("¿Seguro que desea eliminar la categoria?")
      if(confirmar){
        const index = parseInt(this.state.indexModTagName)
        if(this.state.categorias[index].subcategoria.length===0){
          const id_categoria = this.state.categorias[index].id_categoria;        
          //Axios se encarga de hacer solicitudes de forma sencilla
          axios.delete('http://localhost:4000/api/categorias/delete/' + id_categoria)
              .then((response) => {
                  alert(response.data.message)
                  this.getCategorias()
          })  
        }else{
          alert("La categoria contiene subcategorias, elimine " +
                "primero dichas subcategorias antes de continuar")
        }
      }    
    }

    crearSubCategoria() {
      const mensaje = {
          nombre_subcategoria: this.state.newSubTag,
          id_categoria: this.state.idTagForNewSubTag
      }
      //Axios se encarga de hacer solicitudes de forma sencilla
      axios.post('http://localhost:4000/api/subcategorias/create', mensaje)
          .then((response) => {
              alert(response.data.message)
              this.getCategorias()
      })
    }

    actualizarSubCategoria() {
        const id_subcategoria =  this.state.idModSubTagName;
        const mensaje = {
          nombre_subcategoria: this.state.modSubTagName,
          id_categoria: this.state.categorias[this.state.indexForModTag].id_categoria
        }
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.put('http://localhost:4000/api/subcategorias/update/' + id_subcategoria, mensaje)
            .then((response) => {
                alert(response.data.message)
                this.getCategorias()
        }).catch(err=>(
          alert("Error, intentelo mas tarde")
        ))
    }

    async borrarSubCategoria(){
      var confirmar = window.confirm("¿Seguro que desea eliminar la categoria?")
      if(confirmar){
        const id_subcategoria = this.state.idModSubTagName;
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.get('http://localhost:4000/api/productos/get/by-subcategory/' + id_subcategoria)
        .then(response=>{
          if(response.data.length===0){
            axios.delete('http://localhost:4000/api/subcategorias/delete/' + id_subcategoria)
            .then(response2=>{
              if(response2.data.error){
                alert(response2.data.message)
              }else{
                alert(response2.data.message)
                this.getCategorias()
              }
            })
          }else{
            alert("La Subcategoria tiene productos asociados, cambielos primero antes de continuar")
          }
        })
      }
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
                      <div className="center">
                        <Button color="primary" onClick={this.crearCategoria}>Crear</Button>{' '}
                      </div>
                  </FormGroup>

                  <FormGroup>
                      <Label>Modificar categoria</Label>
                      <Row>
                        <Col>
                        <Input type="select" name="select" id="indexModTagName"
                          onChange={this.onChange('indexModTagName')}>
                          {categorias.map((indice, i) => 
                            <option key={indice.nombre_categoria} 
                            value={i}>{indice.nombre_categoria}</option>)
                          }
                        </Input>
                        </Col>
                        <Col>
                        <Input type="text" name="modTagName" id="modTagName" 
                          onChange={this.onChange('modTagName')}
                          placeholder="Nuevo nombre" />
                        
                        </Col>
                      </Row>
                      <div className="center">
                        <Button color="primary" onClick={this.actualizarCategoria}>Modificar</Button>{' '}
                        <Button color="danger" onClick={this.borrarCategoria}>Eliminar</Button>{' '}
                      </div>
                  </FormGroup>

              </Form>
              <br /><br />
              <h2>Gestion de Subcategorias</h2>
              <Form>
                  <FormGroup>
                      <Label>Crear Subcategoria</Label>
                      <Row>
                        <Col>
                          <Input type="select" name="select" id="idTagForNewSubTag"
                            onChange={this.onChange('idTagForNewSubTag')}>
                            {categorias.map((indice) => 
                              <option key={indice.nombre_categoria} 
                              value={indice.id_categoria}>{indice.nombre_categoria}</option>)
                            }                        
                          </Input>
                        </Col>
                        <Col>
                          <Input type="text" name="newSubTag" id="newSubTag" 
                            placeholder="nombre de la subcategoria" 
                            onChange = {this.onChange('newSubTag')}/>
                        </Col>
                      </Row>
                      <div className="center">
                      <Button color="primary" onClick={this.crearSubCategoria} >Crear</Button>{' '}
                      </div>
                  </FormGroup>

                  <FormGroup>
                      <Label for="exampleEmail">Modificar subcategoria</Label>
                      <Row>
                      <Col>
                          <Input type="select" name="select" id="indexForModTag"
                            onChange={this.onChangeParentTag('indexForModTag')}>
                            {categorias.map((indice, index) => 
                              indice.subcategoria.length!==0?
                              <option key={indice.nombre_categoria+index} 
                              value={index}>{indice.nombre_categoria}</option>
                              : null
                              )
                            }
                          </Input>      
                      </Col>
                      <Col>
                        <Input type="select" name="select" id="idModSubTagName"
                          onChange={this.onChange('idModSubTagName')}>
                          {this.state.categorias[this.state.indexForModTag].subcategoria.map((indice) => 
                            <option key={indice.nombre_subcategoria} 
                            value={indice.id_subcategoria}>{indice.nombre_subcategoria}</option>)
                          }
                        </Input>
                      </Col>
                      </Row>

                      <Input type="text" name="email" id="modificarCategoria" 
                      placeholder="Nuevo nombre" 
                      onChange = {this.onChange('modSubTagName')}/>
                      <div className="center">
                        <Button color="primary" onClick={this.actualizarSubCategoria}>Modificar</Button>{' '}
                        <Button color="danger" onClick={this.borrarSubCategoria}>Eliminar</Button>{' '}
                      </div>
                  </FormGroup>
              </Form>
          </div>
      )
    }
}

export default Categorias;