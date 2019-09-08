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
            "ruta": "product-images/1567626395741-product03.png"
          },
          {
            "id_imagen": 28,
            "ruta": "product-images/1567626395745-product02.png"
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
            "id_imagen": 27,
            "ruta": "product-images/1567626395741-product03.png"
          },
          {
            "id_imagen": 28,
            "ruta": "product-images/1567626395745-product02.png"
          }
      ]
    },
    {
        "id_producto": 33,
        "nombre_producto": "Carabali3",
        "descripcion": "fdjñodihfñohdf",
        "marca": "carabali3",
        "precio": 4444,
        "id_subcategoria": 1,
        "imagenes": [
          {
            "id_imagen": 86,
            "ruta": "product-images/1567631509663-product01.png"
          },
          {
            "id_imagen": 85,
            "ruta": "product-images/1567631509656-product02.png"
          },
          {
            "id_imagen": 84,
            "ruta": "product-images/1567631509650-product03.png"
          },
          {
            "id_imagen": 83,
            "ruta": "product-images/1567631509638-product04.png"
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
            urlToDelete: []
        }
        this.getInitialCategorias = this.getInitialCategorias.bind(this)
        this.crearProducto = this.crearProducto.bind(this)
        this.updateProduct = this.updateProduct.bind(this)
        this.onChange = this.onChange.bind(this) 
        this.onChangeParentTag = this.onChangeParentTag.bind(this)

        this.onSelect = this.onSelect.bind(this)
        this.toggle = this.toggle.bind(this);
        this.selectFiles = this.selectFiles.bind(this)
        this.uploadImages = this.uploadImages.bind(this)
        this.deleteImage = this.deleteImage.bind(this)
        this.deletePrevImage = this.deletePrevImage.bind(this)

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
        let indexTag, indexSubTag;
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
            images: [],
            updateImages:  h[[e.target.value]].imagenes,
            urlToDelete: []      
        })
    }  
    //============== FIN MODIFICAR PRODUTO ======================

    // Para el cambio de tabs (visual)
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
                images: []
            });
        }
    }
    //Para subir imagenes
    selectFiles = (event) => {
        let valor = 6
        if(this.state.activeTab !== '1'){
            valor = 6 - this.state.updateImages.length
        }
    	let images = [];
    	for (var i = 0; i < event.target.files.length; i++) {
            images[i] = event.target.files.item(i);
        }
        images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
        images = images.filter((image, i) => i<valor)
        let message = `${images.length} valid image(s) selected`
        this.setState({ images, message })
    }

    uploadImages = (idProducto) => {
        let data  = new FormData(); 
    	this.state.images.map((image) => {
		    data.append("images", image, image.name);		
        });
        axios.post('http://localhost:4000/api/productos/imagenes/add/' + idProducto, data)
        .then(response => {
            console.log(response)
    })
    }

    deleteImage = (e) =>{
        const valor = parseInt(e.target.value)
        this.setState(prevState => {
          const images = prevState.images.filter((imagen, i) => i !== valor);
          return { images };
        });  
        console.log(this.state.images)
    }

    deletePrevImage = (e) =>{
        const valor = parseInt(e.target.value)
        let removedImg = this.state.urlToDelete
        const images = this.state.updateImages.filter((imagen, i) => {
            if(i !== valor){                
                return imagen
            }else{
                removedImg.push(imagen)
            }});
        this.setState({
          updateImages: images,
          urlToDelete: removedImg
        });  
        console.log(this.state.images)
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

    updateProduct() {
        let updateProduct = false, dltImages = false
        const mensaje = {
            nombre_producto: this.state.nombre,
            descripcion: this.state.descripcion,
            marca: this.state.marca,
            precio: this.state.precio,
            id_subcategoria: this.state.idSubTag,
        }
        
        axios.put('http://localhost:4000/api/productos/update/' + this.state.id_producto, mensaje)
            .then((response) => {
                if(response.data.error){
                    console.log(response.data.message)
                }else{ updateProduct = true}
            })
        this.uploadImages(this.state.id_producto)
        
       let imagenes = this.state.urlToDelete
       console.log(imagenes)
        axios.post('http://localhost:4000/api/productos/imagenes/delete/', imagenes)
            .then((response) => {
                if(response.data.error){
                    console.log(response.data.message)
                }else{ dltImages = true}
            })
        if(updateProduct && dltImages){
            alert("Producto actualizado con exito")
        }else{alert("Error al actualizar")}
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
                                    "(6 imagenes maximo). No se ha seleccionado ninguna imagen"}
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
                                this.state.updateImages.length? 
                                <p id="img-message" >{`${this.state.updateImages.length} Imagenes guardadas del producto`}</p>
                                : null : null
                                 }
                                {this.state.activeTab !== '1'?
                                    this.state.updateImages.map((imagen, index) => (
                                        <div key={`uimg${imagen.id_imagen}`} className="img-ctn">
                                            <button type="button" value={index} 
                                            className="fa fa-times img-delete" 
                                            onClick={this.deletePrevImage}/>
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
                            <Button color="primary" onClick={this.updateProduct} >Modificar</Button>{' '}
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