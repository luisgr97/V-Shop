import React, { Component } from 'react'
import { TabContent, TabPane, 
    Nav, NavItem, NavLink, 
    Col, Row, Button, Form, 
    FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'
import classnames from 'classnames';
import Loading from '../principal/Loading'


/*
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
 */
const h = [
    {
        nombre: "Camara",
        descripcion: "Una buena camara xdxdxd",
        marca: "SONY",
        precio: "150000"
    },
    {
        nombre: "Cinturon",
        descripcion: "Correa a estas gonorreas",
        marca: "Quinta paja",
        precio: "15000000"
    }
]

class Articulo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            nombre: "",
            descripcion: "",
            marca: "",
            precio: "",

            modificarProducto: [],
            categorias: [],
            
            indexTag: 0,
            idSubTag: "",
            activeTab: '1',
            
            images: [],
        	imageUrls: [],
        }
        this.getInitialCategorias = this.getInitialCategorias.bind(this)
        this.crearProducto = this.crearProducto.bind(this)

        this.onChange = this.onChange.bind(this) 
        this.onChangeParentTag = this.onChangeParentTag.bind(this)
        this.onModifyChange = this.onModifyChange.bind(this)

        this.onSelect = this.onSelect.bind(this)
        this.toggle = this.toggle.bind(this);
        this.selectFiles = this.selectFiles.bind(this)

    }

    getInitialCategorias(){
        axios.get('http://localhost:4000/api/categorias/getJoinSubCategoria')
        .then((response) => {
            if(response.data.error){
                console.log("Esto es un error de servidor")
            }else{
                console.log("Se metio no encontro")
            }
            this.setState({
                categorias: response.data,
                idSubTag: response.data[0].subcategoria[0].id_subcategoria,
                loading: false            
            })
        })
    }

    getProductos(){
        axios.get('http://localhost:4000/api/productos')
        .then((response) => {
            //console.log(response.data.data)            
            this.setState({
                subCategorias: response.data.data
            })
        })
    }

    componentDidMount(){
        this.getInitialCategorias()    
    }

    crearProducto() {
        const mensaje = {
            nombre_producto: this.state.nombre,
            descripcion: this.state.descripcion,
            marca: this.state.marca,
            precio: this.state.precio,
            id_subcategoria: this.state.idSubTag,
        }
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.post('http://localhost:4000/api/productos/create', mensaje)
            .then((response) => {
                console.log(response)
                if(response.data.error){
                    console.log(response.data.message)
                }else{
                    if(response.data.failure){
                        console.log(response.data)
                    }else{
                        console.log(response.data.message)
                    }
                }
                //alert(JSON.stringify(response.data))
            })
    }

    //Cambio en los inputs
    onChange = input => e =>{ 
        this.setState({ [input]: e.target.value});
    }  

    //Cambio en las cateorias padre
    onChangeParentTag = input => e =>{
        this.setState({ 
          [input]: e.target.value,
          idSubTag: this.state.categorias[e.target.value].subcategoria[0].id_subcategoria
        });
    }

    //============== MODIFICAR PRODUTO ======================
    //Para cambiar el estado del producto a editar
    onModifyChange = input => e =>{ 
        const { modificarProducto } = {...this.state};
        const currentState = modificarProducto;
        currentState[input] = e.target.value
        this.setState({
            modificarProducto: currentState    
        });
    }  

    //Para modificar producto
    onSelect(e) {         
        this.setState({modificarProducto: h[[e.target.value]]})
    }  
    //============== FIN MODIFICAR PRODUTO ======================

    // Para el cambio de tabs (visual)
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    //Para subir imagenes
    selectFiles = (event) => {
    	let images = [];
    	for (var i = 0; i < event.target.files.length; i++) {
            images[i] = event.target.files.item(i);
        }
        images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
        let message = `${images.length} valid image(s) selected`
        this.setState({ images, message })
    }

    render() {
        if(this.state.loading){
            return(
              <Loading/>
            )
          }
          const categorias = this.state.categorias;
        return (
            <div className="admin-productos">
                <div id="espacio" />
                <h2>Gestión de Productos</h2>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}>
                            Crear un nuevo producto
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}>
                            Modificar producto existente
                        </NavLink>
                    </NavItem>
                </Nav>

                <br/><br/>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Form>
                            <Row form >
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="nombrePoducto">Nombre del producto</Label>
                                        <Input type="text" name="nombrePoducto" id="nombrePoducto" 
                                        placeholder="Nombre" 
                                        onChange = {this.onChange('nombre')}/>
                                    </FormGroup>                   
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="marcaPoducto">Marca</Label>
                                        <Input type="text" name="marcaPoducto" id="marcaPoducto" 
                                        placeholder="Marca" 
                                        onChange = {this.onChange('marca')}/>
                                    </FormGroup>                   
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="precio">Precio de venta</Label>
                                        <Input type="number" name="precio" id="precio" 
                                        placeholder="Precio" 
                                        onChange = {this.onChange('precio')}/>
                                    </FormGroup>
                                </Col>
                             </Row>

                            <FormGroup>
                                <Label for="descripcion">Descripcion</Label>
                                <Input type="textarea" name="descripcion" id="descripcion" 
                                onChange = {this.onChange('descripcion')}/>
                            </FormGroup>
                        
                            <FormGroup>
                                <Label for="indexTag">Seleccion una subcategoria</Label>
                                <Input type="select" name="indexTag" id="indexTag"
                                onChange={this.onChangeParentTag('indexTag')}>
                                {categorias.map((indice, index) => 
                                    <option key={indice.nombre_categoria+index} 
                                    value={index}>{indice.nombre_categoria}</option>)
                                }
                                </Input>      

                                <Input type="select" name="select" id="idModSubTagName"
                                onChange={this.onChange('idSubTag')}>
                                {this.state.categorias[this.state.indexTag].subcategoria.map((indice) => 
                                    <option key={indice.nombre_subcategoria} 
                                    value={indice.id_subcategoria}>{indice.nombre_subcategoria}</option>)
                                }
                                </Input>    
                            </FormGroup>
                            <FormGroup>
                            <div id="img-container">
                                <br/>
                                <Label id="load-img-button" for="selectFile">
                                    Cargar imagenes
                                    <i className="fas fa-upload"></i>
                                </Label>
                                <Input type="file" name="file" onChange={this.selectFiles}
                                id="selectFile" multiple/>
                                <FormText color="muted">
                                    {this.state.images.length? 
                                    `Se ha seleccionado ${this.state.images.length} imagen(es) valida(s)` :
                                    "No se han seleccionado imagenes"}
                                </FormText>
                                {this.state.images.map((imagen, index) => (
                                <div key={`imagen${index}`} className="img-ctn">
                                        <img alt=""  
                                        src={ URL.createObjectURL(imagen)}/>
                                </div>
                            ))
                            }
                                 </div>
                            </FormGroup>                            
                            
                       
                            
                            <div className="center">
                            <Button color="primary" onClick={this.crearProducto}>Crear</Button>
                            </div>
                        </Form>
                    </TabPane>


                    <TabPane tabId="2">                       
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Seleccionar producto</Label>
                                    <Input type="select" name="select" id="exampleSelect" 
                                    onChange={this.onSelect}>
                                        {h.map((indice, index) => 
                                        <option key={index} 
                                        value={index}>{indice.nombre}</option>)}
                                    </Input>                        
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleEmail">Nombre del producto</Label>
                                <Input type="text" name="email" id="nombrePoducto"                         
                                placeholder="Nombre" 
                                onChange = {this.onModifyChange('nombre')}
                                value={this.state.modificarProducto.nombre}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleEmail">Marca del producto</Label>
                                <Input type="text" name="email" id="marcaProducto" 
                                value={this.state.modificarProducto.marca}
                                placeholder="Marca" 
                                onChange = {this.onModifyChange('marca')}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleEmail">Precio del producto</Label>
                                <Input type="text" name="email" id="marcaProducto" 
                                value={this.state.modificarProducto.precio}
                                placeholder="Precio" 
                                onChange = {this.onModifyChange('precio')}/>
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleText">Descripcion</Label>
                                <Input type="textarea" name="text" id="descripcion"
                                value={this.state.modificarProducto.descripcion} 
                                onChange = {this.onModifyChange('descripcion')}
                                />
                            </FormGroup>

                            
                            <div className="center">
                            <Button color="primary">Modificar</Button>{' '}
                            <Button color="danger">Eliminar</Button>{' '}
                            </div>
                        </Form>

                    </TabPane>
                </TabContent>
                
            </div>
        )
    }
}

export default Articulo;