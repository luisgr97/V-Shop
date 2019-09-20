import React from 'react'
import { UncontrolledCarousel } from 'reactstrap';
import axios from 'axios'
import brokenImage from '../../imagenes/imagen-no-disponible.jpg'

import '../../estilos/product-page.css'
import Loading from './Loading';

class ProductoPage extends React.Component {    
    constructor(props){
        super(props)
        this.state={
            loading: true,
            product: [],
            rating: 0,
            comment: "",
            cantidad: 1
        }
        this.sendComment = this.sendComment.bind(this)
        this.onChangeRating = this.onChangeRating.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount(){
        axios.get('http://localhost:4000/api/catalogos/inventario/getProductoPage/'+this.props.idCatalog+'/'+this.props.id_product)
        .then(response => {
            if(response.data.length===0){
                alert("No hay ese producto en esta tienda")               
            }else{
                this.setState({
                    loading: false,
                    product: response.data[0]
                })
            }
        }).catch(err=>(
            alert("Error, intentelo mas tarde")
        ))
    }

    sendComment(){
        const mensaje = {
            comentario: this.state.comment,
            calificacion: this.state.rating,
            id_producto: this.props.id_product,
            id_usuario: this.props.idCliente
        }

        axios.post('http://localhost:4000/api/productos/comentarios/create', mensaje)
        .then(response => {
            if(response.data.error){
                alert(response.data.message)
            }else{
                alert(response.data.message)
                window.location.reload()
            }
        }).catch(err=>(
            alert("Por favor, intentelo mas tarde")
        ))
    }

    onChangeRating(e){ 
        this.setState({ rating: parseInt(e.target.value)});
    }  

    onChange = input => e =>{ 
        this.setState({ [input]: e.target.value});
    }  

    render(){

        if(this.state.loading){
            return <Loading/>
        }
        
        const product = this.state.product
        let estrellas = [0,0,0,0,0]
        let prod = 0, sum = 0, avg=0;
        if(product.producto.comentarios.length!==0){
            product.producto.comentarios.forEach(comm => {
                if(comm.calificacion > 4) {estrellas[4] += 1}
                else if(comm.calificacion > 3) {estrellas[3] += 1}
                else if(comm.calificacion > 2) {estrellas[2] += 1}
                else if(comm.calificacion > 1) {estrellas[1] += 1}
                else {estrellas[0] += 1}
            })
            
            for( var i=0;i<5;i++){
                sum += estrellas[i]
                prod += estrellas[i]*(i+1)
            }
            avg = prod/sum
        }else{
            sum = 1;
        }
        let images = []
        product.producto.imagenes.forEach((img, i) => {
            images.push({
                src: 'http://localhost:4000/'+img.ruta,
                altText: 'imagen del producto N '+ i, 
                caption: '', header: ''         
              })
        });

        return(
            <div className="section">
                <div className="product-container">
                    <div className="row row-producto-container">
                        
                        <div className="col-md-7 col-md-push-2">
                        <UncontrolledCarousel items={images} interval={false}  />                        
                        </div>

                        <div className="col-md-5">
                            <div className="product-details">
                                <h2 className="product-name">{product.producto.nombre_producto}</h2>
                                <div>
                                    <div className="product-rating">
                                    {avg > 4? <i className="fa fa-star"/>: null}
                                    {avg > 3? <i className="fa fa-star"/>: null}
                                    {avg > 2? <i className="fa fa-star"/>: null}
                                    {avg > 1? <i className="fa fa-star"/>: null}
                                    {avg > 0? <i className="fa fa-star"/>: null}
                                    </div>
                                    <span className="review-link">{product.producto.comentarios.length} Comentarios</span>
                                </div>
                                <div>
                                    
                                    <h3 className="product-price">$
                                        {product.producto.precio*(1-product.descuento.descuento)}
                                        {product.descuento.descuento===0? null :
                                            <del className="product-old-price">
                                                ${product.producto.precio}
                                            </del>                                         
                                        }                                         
                                    </h3>

                                    <span className="product-available">
                                        {`${product.catalogo.ciudad}: `}
                                        {product.cantidad_en_inventario !==0? 
                                            `${product.cantidad_en_inventario} unidades disponibles` : "Agotado"}
                                        
                                    </span>
                                </div>
                                <p>{product.producto.descripcion}</p>

                                {product.cantidad_en_inventario !==0?
                                <div className="add-to-cart">
                                    <div className="qty-label">
                                        Cantidad
                                        <div className="input-number">
                                            <input type="number" 
                                            value={this.state.cantidad} 
                                            min="1" max={product.cantidad_en_inventario}
                                            onChange={this.onChange('cantidad')}/>
                                            <span className="qty-up">+</span>
                                            <span className="qty-down">-</span>
                                        </div>
                                    </div>
                                    <button className="add-to-cart-btn"
                                    onClick={() => {
                                        var producto = {
                                            id: String(product.producto.id_producto),
                                            nombre: product.producto.nombre_producto,                            
                                            precio: product.producto.precio*(1-product.descuento.descuento),
                                            descuento: product.descuento.descuento,
                                            id_sede: this.props.idCatalog,
                                            sede: product.catalogo.ciudad,
                                            cantidad: this.state.cantidad,
                                            imagen: product.producto.imagenes.length!==0? 
                                            `http://localhost:4000/${product.producto.imagenes[0].ruta}` :
                                            brokenImage
                                        }
                                        this.props.addProduct(producto)    
                                        }}>
                                        <i className="fa fa-shopping-cart"></i> 
                                        Agregar al carrito
                                    </button>
                                </div> : null
                            }
                                

                                <ul className="product-links">
                                    <li>Categoria:</li>
                                    <li>{`${product.producto.subcategoria.categoria.nombre_categoria},`}</li>
                                    <li>{product.producto.subcategoria.nombre_subcategoria}</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div id="product-tab">
                                <ul className="tab-nav">
                                    <li className="active"><span data-toggle="tab" >
                                    {`Reseñas (${product.producto.comentarios.length})`}
                                    </span></li>
                                </ul>

                                
                            
                                    <div id="tab1" className="tab-pane active">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div id="rating">
                                                    <div className="rating-avg">
                                                        <span>{avg===0? "Sin calificación" : Math.round(avg * 100) / 100}</span>
                                                        <div className="rating-stars">
                                                        {avg > 4? <i className="fa fa-star"/>: null}
                                                        {avg > 3? <i className="fa fa-star"/>: null}
                                                        {avg > 2? <i className="fa fa-star"/>: null}
                                                        {avg > 1? <i className="fa fa-star"/>: null}
                                                        {avg > 0? <i className="fa fa-star"/>: null}
                                                        </div>
                                                    </div>
                                                    <ul className="rating">
                                                        <li>
                                                            <div className="rating-stars">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                            </div>
                                                            <div className="rating-progress">
                                                                <div className="rating-amount" style={{width: `${estrellas[4]*100/sum}%`}}></div>
                                                            </div>
                                                            <span className="sum">{estrellas[4]}</span>
                                                            
                                                        </li>
                                                        <li>
                                                            <div className="rating-stars">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star-o"></i>
                                                            </div>
                                                            <div className="rating-progress">
                                                            <div className="rating-amount" style={{width: `${estrellas[3]*100/sum}%`}}></div>
                                                            </div>
                                                            <span className="sum">{estrellas[3]}</span>
                                                        </li>
                                                        <li>
                                                            <div className="rating-stars">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star-o"></i>
                                                                <i className="fa fa-star-o"></i>
                                                            </div>
                                                            <div className="rating-progress">
                                                            <div className="rating-amount" style={{width: `${estrellas[2]*100/sum}%`}}></div>
                                                            </div>
                                                            <span className="sum">{estrellas[2]}</span>
                                                        </li>
                                                        <li>
                                                            <div className="rating-stars">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star-o"></i>
                                                                <i className="fa fa-star-o"></i>
                                                                <i className="fa fa-star-o"></i>
                                                            </div>
                                                            <div className="rating-progress">
                                                            <div className="rating-amount" style={{width: `${estrellas[1]*100/sum}%`}}></div>
                                                            </div>
                                                            <span className="sum">{estrellas[1]}</span>
                                                        </li>
                                                        <li>
                                                            <div className="rating-stars">
                                                                <i className="fa fa-star"></i>
                                                                <i className="fa fa-star-o"></i>
                                                                <i className="fa fa-star-o"></i>
                                                                <i className="fa fa-star-o"></i>
                                                                <i className="fa fa-star-o"></i>
                                                            </div>
                                                            <div className="rating-progress">
                                                            <div className="rating-amount" style={{width: `${estrellas[0]*100/sum}%`}}></div>
                                                            </div>
                                                            <span className="sum">{estrellas[0]}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        
                                        
                                            <div className="col-md-6">
                                                <div id="reviews">
                                                    <ul className="reviews">
                                                        {product.producto.comentarios.map((comment, i)=>(
                                                             <li key={`comment${i}`}>
                                                             <div className="review-heading">
                                                                 <h5 className="name">{comment.usuario.nombres}</h5>
                                                                 <p className="date">{comment.fecha}</p>
                                                                 <div className="review-rating">
                                                                    {comment.calificacion > 4? <i className="fa fa-star"/>: null}
                                                                    {comment.calificacion > 3? <i className="fa fa-star"/>: null}
                                                                    {comment.calificacion > 2? <i className="fa fa-star"/>: null}
                                                                    {comment.calificacion > 1? <i className="fa fa-star"/>: null}
                                                                    {comment.calificacion > 0? <i className="fa fa-star"/>: null}
                                                                 </div>
                                                             </div>
                                                             <div className="review-body">
                                                                 <p>{comment.comentario}</p>
                                                             </div>
                                                         </li>
                                                        ))}
                                                                                                               
                                                    </ul>
                                                
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                            {this.props.logueado?
                                                <div id="review-form">                                                                                                                                                                                                            
                                                    <h4>Agregar una reseña</h4>
                                                    <br/>
                                                    <form className="review-form">                                                                                                                                                                
                                                        <textarea rows="10" value={this.state.comment} onChange={this.onChange('comment')} className="input" placeholder="Tu comentario..."></textarea>
                                                        <div className="input-rating">
                                                            <span>Tu calificación: </span>
                                                            <div className="stars">
                                                                <input id="star5" name="rating" value="5" onClick={this.onChangeRating} type="radio"/><label htmlFor="star5"></label>
                                                                <input id="star4" name="rating" value="4" onClick={this.onChangeRating} type="radio"/><label htmlFor="star4"></label>
                                                                <input id="star3" name="rating" value="3" onClick={this.onChangeRating} type="radio"/><label htmlFor="star3"></label>
                                                                <input id="star2" name="rating" value="2" onClick={this.onChangeRating} type="radio"/><label htmlFor="star2"></label>
                                                                <input id="star1" name="rating" value="1" onClick={this.onChangeRating} type="radio"/><label htmlFor="star1"></label>
                                                            </div>
                                                        </div>
                                                        <button type="button" onClick={this.sendComment} className="primary-btn">Comentar</button>
                                                    </form>
                                                </div> : 
                                                <div id="comentar">
                                                    <h4>Inicia sesión para comentar</h4>
                                                    <i class="far fa-comments"></i>
                                                </div>
                                            }
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductoPage;