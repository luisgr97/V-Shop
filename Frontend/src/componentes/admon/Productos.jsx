import React, { Component } from 'react'
import { Table, TabContent, TabPane, 
    Nav, NavItem, NavLink, 
    Col, Row, Button, Form, 
    FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'
import classnames from 'classnames';
import Loading from '../principal/Loading'

class Articulo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loadingTags: true,
            loadingProducts: true,

            id_producto: "",
            nombre: "",
            descripcion: "",
            marca: "",
            precio: "",

            categorias: [],
            products: [],
            indexToModify: "",
            indexTag: 0,
            idSubTag: "",
            activeTab: '1',
            
            updateImages: [],
            images: [],
            urlToDelete: []
        }
        this.getInitialCategorias = this.getInitialCategorias.bind(this)
        this.getProductos = this.getProductos.bind(this)
        this.resetAll = this.resetAll.bind(this)

        this.crearProducto = this.crearProducto.bind(this)
        this.updateProduct = this.updateProduct.bind(this)
        this.onChange = this.onChange.bind(this) 
        this.onChangeParentTag = this.onChangeParentTag.bind(this)

        this.onSelectProductToEdit = this.onSelectProductToEdit.bind(this)
        this.closeProductToEdit = this.closeProductToEdit.bind(this)

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
                alert(response.data.message)
            }else{
                this.setState({
                    categorias: response.data,
                    idSubTag: response.data[0].subcategoria[0].id_subcategoria,
                    loadingTags: false            
                })
            }            
        }).catch(err=>(
            alert("Intentelo mas tarde")
        ))
    }

    getProductos(){
        axios.get('http://localhost:4000/api/productos/get')
        .then((response) => {
            if(response.data.error){
                alert(response.data.message)
            }           
            this.setState({
                products: response.data,
                loadingProducts: false
            })
        }).catch(err=>(
            alert("Error al carga productos, recargue la pagina")
        ))
    }

    resetAll(){
        this.setState({
            loadingTags: true,
            loadingProducts: true,

            id_producto: "",
            nombre: "",
            descripcion: "",
            marca: "",
            precio: "",

            categorias: [],
            products: [],
            indexToModify: "",
            indexTag: 0,
            idSubTag: "",
            
            updateImages: [],
            images: [],
            urlToDelete: []
        })
    }

    componentDidMount(){
        this.getInitialCategorias()    
        this.getProductos()
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
    onSelectProductToEdit(e) {
        const index = e.target.value
        const idTag = this.state.products[index].subcategoria.id_categoria
        const idSubTag = this.state.products[index].subcategoria.id_subcategoria
        let indexTag;

        for(var i=0;i<this.state.categorias.length;i++){
            if(this.state.categorias[i].id_categoria === idTag){
                for(var j=0;j<this.state.categorias[i].subcategoria.length;j++){
                    if(this.state.categorias[i].subcategoria[j].id_subcategoria === idSubTag){
                        indexTag =  i   
                        break;
                    }
                }
            }            
        }
        console.log(this.state.products[index].id_producto)
        this.setState({
            id_producto: this.state.products[index].id_producto,
            nombre: this.state.products[index].nombre_producto,
            descripcion: this.state.products[index].descripcion,
            marca: this.state.products[index].marca,
            precio: this.state.products[index].precio,
            indexToModify: index,
            indexTag,
            idSubTag,
            images: [],
            updateImages:  this.state.products[index].imagenes,
            urlToDelete: []      
        })
        
    }  

    closeProductToEdit(){
        this.setState({
            indexToModify: ""
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

    async uploadImages(idProducto) {
        let data  = new FormData(); 
    	this.state.images.forEach((image) => {
		    data.append("images", image, image.name);		
        });
        await axios.post('http://localhost:4000/api/productos/imagenes/add/' + idProducto, data)        
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
        let images = []
        for(var i=0;i<this.state.updateImages.length;i++){
            if(i !== valor){
                images.push(this.state.updateImages[i])
            }else{
                removedImg.push(this.state.updateImages[i])
            }
        }
        /*
        const images = this.state.updateImages.filter((imagen, i) => {
            if(i !== valor){
                return imagen
            }else{
                removedImg.push(imagen)
            }});
            */
        this.setState({
          updateImages: images,
          urlToDelete: removedImg
        });  
        console.log(this.state.images)
    }


    async crearProducto() {
        const mensaje = {
            nombre_producto: this.state.nombre,
            descripcion: this.state.descripcion,
            marca: this.state.marca,
            precio: this.state.precio,
            id_subcategoria: this.state.idSubTag,
        }
        //Axios se encarga de hacer solicitudes de forma sencilla
        try{        
         let response = await axios.post('http://localhost:4000/api/productos/create', mensaje)
            if(response.data.error){
                console.log(response.data.message)
            }else{
                if(response.data.failure){
                    console.log(response.data)
                }else{                    
                    await this.uploadImages(response.data.id_producto)
                    alert(response.data.message)
                    this.resetAll()
                    this.getInitialCategorias()    
                    this.getProductos()
                }
            }
        } catch(e){
            alert("Error al crear producto")
        }
    }

    async updateProduct() {
        try{
        let updateProduct = false, dltImages = false
        const mensaje = {
            nombre_producto: this.state.nombre,
            descripcion: this.state.descripcion,
            marca: this.state.marca,
            precio: this.state.precio,
            id_subcategoria: this.state.idSubTag,
        }
        
        let responseP = await axios.put('http://localhost:4000/api/productos/update/' + this.state.id_producto, mensaje)
            if(responseP.data.error){
                console.log(responseP.data.message)
            }else{ updateProduct = true}

        await this.uploadImages(this.state.id_producto)
        
        let imagenes = this.state.urlToDelete
        if(imagenes.length===0){
            dltImages = true
        }else{
            let responseI = await axios.post('http://localhost:4000/api/productos/imagenes/delete/', imagenes)
                if(responseI.data.error){
                    console.log(responseI.data.message)
                }else{ dltImages = true}
        }

        console.log(updateProduct, " ", dltImages)
        if(updateProduct && dltImages){
            alert("Producto actualizado con exito")
            this.resetAll()
            this.getInitialCategorias()    
            this.getProductos()
        }else{
            if(updateProduct){
                alert("No se pudo actualizar el producto")
            }else{
                alert("No se pudieron actualizar las imagenes")
            }
        }
    }catch(e){
        alert("Error al actualizar el producto")
    }
    }

    createProductForm(){
        const categorias = this.state.categorias;
        return(
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
                        <p id="img-message" >
                        {`${this.state.updateImages.length} Imagenes guardadas del producto`}
                        </p>
                        : null
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
        )
    }


    render() {
        if(this.state.loadingTags || this.state.loadingProducts){
            return(
              <Loading/>
            )
        }
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

                {/**PARA CREAR PRODUCTOS */}

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                    </TabPane>

                {/**PARA Actualziar PRODUCTOS */}
                    <TabPane tabId="2">   
                    <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Producto</th>
                        <th>Marca</th>
                        <th>Categoria</th>
                        <th>Precio</th>
                        <th>Acción</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map((producto, i) => (
                            <React.Fragment key={`product${i}`}>
                            <tr id={parseInt(this.state.indexToModify) === i? "seleccionado" : ""}>
                                <td>{i+1}</td>
                                <td>{producto.nombre_producto}</td>
                                <td>{producto.marca}</td>
                                <td>{producto.subcategoria.nombre_subcategoria}</td>
                                <td>{producto.precio}</td>
                                <td>
                                    {parseInt(this.state.indexToModify) === i?
                                        <React.Fragment>
                                        <button value={i} 
                                            onClick={this.updateProduct}                                                                
                                            className="fa fa-check comment-check"/>
                                        <button  onClick={this.closeProductToEdit}                               
                                            className="fa fa-times comment-delete"/>
                                        </React.Fragment> :
                                        <React.Fragment>
                                        <button value={i} 
                                            onClick={this.onSelectProductToEdit}                                                                
                                            className="fa fa-pen comment-edit"/>
                                        <button  onClick={this.closeProductToEdit}                               
                                            className="fa fa-trash comment-delete"/>
                                        </React.Fragment>
                                    }
                                </td>
                            </tr>
                            {parseInt(this.state.indexToModify) === i?                            
                                <tr>
                                    <td colSpan="6">
                                        {this.createProductForm()}
                                    </td>
                                </tr> : null
                            }
                            </React.Fragment>
                        ))}
                    </tbody>
                </Table>
                {/*                    
                            <FormGroup>
                                <Label for="exampleEmail">Seleccionar producto</Label>
                                    <Input type="select" name="select" id="exampleSelect" 
                                    onChange={this.onSelect}>
                                        {this.state.products.map((indice, index) => 
                                        <option key={'idx'+index} 
                                        value={index}>{indice.nombre_producto}</option>)}
                                    </Input>                        
                            </FormGroup>      
                                        */}                                           
                    </TabPane>

                    {this.state.activeTab==='1'?
                        this.createProductForm() : null
                    }

                    {this.state.activeTab === '1'? 
                        <div className="center">
                            <Button color="primary" onClick={this.crearProducto}>Crear</Button>
                        </div>: null
                    }
                </TabContent>
                
            </div>
        )
    }
}

export default Articulo;