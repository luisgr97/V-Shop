import React from 'react'
import { UncontrolledCarousel } from 'reactstrap';
import axios from 'axios'

import '../../estilos/product-page.css'
import Loading from './Loading';

class ProductoPage extends React.Component {    
    constructor(props){
        super(props)
        this.state={
            loading: true,
            product: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:4000/api/catalogos/inventario/getProductoPage/2/1')
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

    render(){

        if(this.state.loading){
            return <Loading/>
        }
        const product = this.state.product
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
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-o"></i>
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
                                        {product.cantidad_en_inventario !==0? "In Stock" : "Agotado"}
                                    </span>
                                </div>
                                <p>{product.producto.descripcion}</p>

                                {product.cantidad_en_inventario !==0?
                                <div className="add-to-cart">
                                    <div className="qty-label">
                                        Cantidad
                                        <div className="input-number">
                                            <input type="number"/>
                                            <span className="qty-up">+</span>
                                            <span className="qty-down">-</span>
                                        </div>
                                    </div>
                                    <button className="add-to-cart-btn">
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
    {/*
                                <ul className="product-links">
                                    <li>Share:</li>
                                    <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                    <li><a href="#"><i className="fa fa-envelope"></i></a></li>
                                </ul>
    */}
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
                                                        <span>4.5</span>
                                                        <div className="rating-stars">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star-o"></i>
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
                                                                {/*<div style="width: 80%;"></div>*/}
                                                            </div>
                                                            <span className="sum">3</span>
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
                                                                {/*<div style="width: 60%;"></div>*/}
                                                            </div>
                                                            <span className="sum">2</span>
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
                                                                <div></div>
                                                            </div>
                                                            <span className="sum">0</span>
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
                                                                <div></div>
                                                            </div>
                                                            <span className="sum">0</span>
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
                                                                <div></div>
                                                            </div>
                                                            <span className="sum">0</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        
                                        
                                            <div className="col-md-6">
                                                <div id="reviews">
                                                    <ul className="reviews">
                                                        <li>
                                                            <div className="review-heading">
                                                                <h5 className="name">John</h5>
                                                                <p className="date">27 DEC 2018, 8:0 PM</p>
                                                                <div className="review-rating">
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star-o empty"></i>
                                                                </div>
                                                            </div>
                                                            <div className="review-body">
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="review-heading">
                                                                <h5 className="name">John</h5>
                                                                <p className="date">27 DEC 2018, 8:0 PM</p>
                                                                <div className="review-rating">
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star-o empty"></i>
                                                                </div>
                                                            </div>
                                                            <div className="review-body">
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="review-heading">
                                                                <h5 className="name">John</h5>
                                                                <p className="date">27 DEC 2018, 8:0 PM</p>
                                                                <div className="review-rating">
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star"></i>
                                                                    <i className="fa fa-star-o empty"></i>
                                                                </div>
                                                            </div>
                                                            <div className="review-body">
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div id="review-form">
                                                    <form className="review-form">
                                                        <input className="input" type="text" placeholder="Your Name"/>
                                                        <input className="input" type="email" placeholder="Your Email"/>
                                                        <textarea className="input" placeholder="Your Review"></textarea>
                                                        <div className="input-rating">
                                                            <span>Your Rating: </span>
                                                            <div className="stars">
                                                                <input id="star5" name="rating" value="5" type="radio"/><label htmlFor="star5"></label>
                                                                <input id="star4" name="rating" value="4" type="radio"/><label htmlFor="star4"></label>
                                                                <input id="star3" name="rating" value="3" type="radio"/><label htmlFor="star3"></label>
                                                                <input id="star2" name="rating" value="2" type="radio"/><label htmlFor="star2"></label>
                                                                <input id="star1" name="rating" value="1" type="radio"/><label htmlFor="star1"></label>
                                                            </div>
                                                        </div>
                                                        <button className="primary-btn">Submit</button>
                                                    </form>
                                                </div>
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