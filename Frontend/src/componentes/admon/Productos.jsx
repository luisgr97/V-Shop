import React, { Component } from 'react'
import { TabContent, TabPane, 
    Nav, NavItem, NavLink, 
    Col, Row, Button, Form, 
    FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'
import classnames from 'classnames';
import Loading from '../principal/Loading'

const h = [
    {
      "id_producto": 1,
      "nombre_producto": "Xiaomi mi 9T",
      "descripcion": "good phone",
      "marca": "Xiaomi",
      "precio": 300,
      "id_subcategoria": 5,
      "imagenes": [
        {
          "id_imagen": 27,
          "ruta": "product-images/1567553597007-product05.png"
        },
        {
          "id_imagen": 28,
          "ruta": "product-images/1567553597007-product05.png"
        }
      ]
    },
    {
      "id_producto": 2,
      "nombre_producto": "LG UHD",
      "descripcion": "good tv",
      "marca": "LG",
      "precio": 500,
      "id_subcategoria": 11,
      "imagenes": [
        {
          "id_imagen": 29,
          "ruta": "product-images/1567553597007-product05.png"
        },
        {
          "id_imagen": 53,
          "ruta": "product-images/1567553597007-product05.png"
        }
      ]
    }
]

class Articulo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            id_producto: "",
            nombre: "",
            descripcion: "",
            marca: "",
            precio: "",

            categorias: [],
            
            indexTag: 0,
            idSubTag: "",
            activeTab: '1',
            
            updateImages: [],
            images: [],
        }
        this.getInitialCategorias = this.getInitialCategorias.bind(this)
        this.crearProducto = this.crearProducto.bind(this)

        this.onChange = this.onChange.bind(this) 
        this.onChangeParentTag = this.onChangeParentTag.bind(this)

        this.onSelect = this.onSelect.bind(this)
        this.toggle = this.toggle.bind(this);
        this.selectFiles = this.selectFiles.bind(this)
        this.uploadImages = this.uploadImages.bind(this)
        this.deleteImage = this.deleteImage.bind(this)

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
                        console.log(response.data.id_producto)
                        this.uploadImages(response.data.id_producto)
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
    //Para modificar producto
    onSelect(e) {  
        let indexTag, indexSubTag, id;
        for(var i=0;i<this.state.categorias.length;i++){
            for(var j=0;j<this.state.categorias[i].subcategoria.length;j++){
                if(this.state.categorias[i].subcategoria[j].id_subcategoria === h[[e.target.value]].id_subcategoria){
                    indexTag =  i   
                    indexSubTag = j                                  
                    break;
                }
            }
        }
        this.setState({
            id_producto: h[[e.target.value]].id_producto,
            nombre: h[[e.target.value]].nombre_producto,
            descripcion: h[[e.target.value]].descripcion,
            marca: h[[e.target.value]].marca,
            precio: h[[e.target.value]].precio,
            indexTag,
            idSubTag: this.state.categorias[indexTag].subcategoria[indexSubTag].id_subcategoria,
            updateImages:  h[[e.target.value]].imagenes        
        })
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
    	for (var i = 0; i < 6; i++) {
            images[i] = event.target.files.item(i);
        }
        images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
        let message = `${images.length} valid image(s) selected`
        this.setState({ images, message })
    }

    uploadImages = (idProducto) => {
        let data  = new FormData(); 
    	const uploaders = this.state.images.map(image => {
		    data.append("images", image, image.name);		
        });
        axios.post('http://localhost:4000/api/productos/imagenes/add/' + idProducto, data)
        .then(response => {
            console.log(response)
    })
    }

    deleteImage = (e) =>{
        console.log("esta cliekado")
        const valor = parseInt(e.target.value)
        console.log("esta cliekado", valor)
        this.setState(prevState => {
          const images = prevState.images.filter((imagen, i) => i !== valor);
          return { images };
        });  
        console.log(this.state.images)
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
                    </TabPane>


                    <TabPane tabId="2">                       
                            <FormGroup>
                                <Label for="exampleEmail">Seleccionar producto</Label>
                                    <Input type="select" name="select" id="exampleSelect" 
                                    onChange={this.onSelect}>
                                        {h.map((indice, index) => 
                                        <option key={'idx'+index} 
                                        value={index}>{indice.nombre_producto}</option>)}
                                    </Input>                        
                            </FormGroup>                                                 
                    </TabPane>
                    <Form>
                        <Row form >
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="nombrePoducto">Nombre del producto</Label>
                                    <Input type="text" name="nombrePoducto" id="nombrePoducto" 
                                    placeholder="Nombre" 
                                    value={this.state.nombre}                                    
                                    onChange = {this.onChange('nombre')}/>
                                </FormGroup>                   
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="marcaPoducto">Marca</Label>
                                    <Input type="text" name="marcaPoducto" id="marcaPoducto" 
                                    placeholder="Marca" 
                                    value={this.state.marca} 
                                    onChange = {this.onChange('marca')}/>
                                </FormGroup>                   
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="precio">Precio de venta</Label>
                                    <Input type="number" name="precio" id="precio" 
                                    placeholder="Precio" 
                                    value={this.state.precio} 
                                    onChange = {this.onChange('precio')}/>
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup>
                            <Label for="descripcion">Descripcion</Label>
                            <Input type="textarea" name="descripcion" id="descripcion" 
                            value={this.state.descripcion} 
                            onChange = {this.onChange('descripcion')}/>
                        </FormGroup>
                        
                        <FormGroup>
                            <Label for="indexTag">Seleccion una subcategoria</Label>
                            <Input type="select" name="indexTag" id="indexTag"
                            value={this.state.indexTag}
                            onChange={this.onChangeParentTag('indexTag')}>
                            {categorias.map((indice, index) => 
                                <option key={indice.nombre_categoria+index} 
                                value={index}>{indice.nombre_categoria}</option>)
                            }
                            </Input>      

                            <Input type="select" name="select" id="idModSubTagName"
                            value={this.state.idSubTag}
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
                                        <button type="button" value={index} 
                                        className="fa fa-times img-delete" 
                                        onClick={this.deleteImage}/>
                                        <img alt=""  
                                        src={ URL.createObjectURL(imagen)}/>
                                    </div>
                                ))}

                                {this.state.activeTab !== '1'?
                                    this.state.updateImages.map((imagen) => (
                                        <div key={`uimg${imagen.id_imagen}`} className="img-ctn">
                                                <img alt=""  
                                                src={`http://localhost:4000/${imagen.ruta}`}/>
                                        </div>
                                    )) : null
                                }
                            </div>
                        </FormGroup>                            
                                                                                                           
                    </Form>
                    
                    {this.state.activeTab !== '1'? 
                        <div className="center">
                            <Button color="primary">Modificar</Button>{' '}
                            <Button color="danger">Eliminar</Button>{' '}
                        </div>:
                        <div className="center">
                        <Button color="primary" onClick={this.crearProducto}>Crear</Button>
                        </div>
                    }
                </TabContent>
                
            </div>
        )
    }
}

export default Articulo;