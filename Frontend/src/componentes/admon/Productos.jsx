import React, { Component } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'
import classnames from 'classnames';

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
            imagenes: [{
                url: "https://fotos02.diarioinformacion.com/2018/10/26/328x206/dal010dmv003181336.jpg"
            }            
            ],
            descripcion: "",
            marca: "",
            precio: "",
            modificarProducto: [],
            categorias: categorias,
            indexTag: 0,
            idSubTag: "",
            activeTab: '1'
        }
        this.onChange = this.onChange.bind(this) 
        this.ejemplo = this.ejemplo.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onModifyChange = this.onModifyChange.bind(this)

        this.crearProducto = this.crearProducto.bind(this)
        this.getSubCategorias = this.getSubCategorias.bind(this)
        this.toggle = this.toggle.bind(this);

    }

    getInitialCategorias(){
        axios.get('http://localhost:4000/api/categorias/getJoinSubCategoria')
        .then((response) => {
            this.setState({
                categorias: response.data,
                loading: false            
            })
        })
    }

    getProductos(){
        axios.get('http://localhost:4000/api/productos')
        .then((response) => {
            //console.log(response.data.data)
            console.log(response.data.data)
            this.setState({
                subCategorias: response.data.data
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
        //this.getSubCategorias()
    }


    ejemplo(){
        
        //console.log("Que paso men")
        //h.map(indice => <option >{indice.nombre}</option>)
        /*
       for(var i in h){
            //<option>h[i].nombre</option>
            console.log(h[i].nombre)
        }
        */
    }

    crearProducto() {
        const mensaje = {
            nombre: this.state.nombre,
            imagen_url: this.state.imagen,
            empresa_fabricante: this.state.fabricante,            
            descripcion: this.state.descripcion,
            precio_unitario: this.state.precio,
            descuento: 0,
            iva: 19,
            unidades_disponibles: this.state.cantidad,
            detalles: this.state.detalle,
            id_subcategoria: this.state.idNombreSubCategoria,
        }
        //Axios se encarga de hacer solicitudes de forma sencilla
        axios.post('http://localhost:4000/api/productos', mensaje)
            .then((response) => {
                alert(JSON.stringify(response.data))
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
        this.setState({modificarProducto: h[[e.target.value]]})
    }  
    
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
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
                                        <Label for="exampleEmail">Nombre del producto</Label>
                                        <Input type="text" name="nombrePoducto" id="nombrePoducto" 
                                        placeholder="Nombre" 
                                        onChange = {this.onChange('nombre')}/>
                                    </FormGroup>                   
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="exampleEmail">Marca</Label>
                                        <Input type="text" name="marcaPoducto" id="marcaPoducto" 
                                        placeholder="Marca" 
                                        onChange = {this.onChange('marca')}/>
                                    </FormGroup>                   
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="exampleEmail">Precio de venta</Label>
                                        <Input type="number" name="precio" id="precio" 
                                        placeholder="Precio" 
                                        onChange = {this.onChange('precio')}/>
                                    </FormGroup>
                                </Col>
                             </Row>

                            <FormGroup>
                                <Label for="exampleText">Descripcion</Label>
                                <Input type="textarea" name="text" id="descripcion" 
                                onChange = {this.onChange('descripcion')}/>
                            </FormGroup>
                        
                            <FormGroup>
                                <Label for="exampleEmail">Seleccion una subcategoria</Label>
                                <Input type="select" name="select" id="indexTag"
                                onChange={this.onChange('indexTag')}>
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
                                <Label for="exampleEmail">Imagen</Label>
                                <Input type="text" name="email" id="nombrePoducto" 
                                placeholder="URL" 
                                onChange = {this.onChange('imagen')}/>
                            </FormGroup>
                            <div className="center">
                            {this.state.imagenes.length>0?
                            <img alt="" src={this.state.imagenes[0].url}/>: null
                            }
                            </div>
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