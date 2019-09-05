import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Loading from '../principal/Loading'

import '../../estilos/comments.css'

class Comentario extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            comments: [],
            loading : true
        }
    }

    componentDidMount(){
        axios.get('http://localhost:4000/api/productos/comentarios/get/by-user/' + this.props.idCliente)
        .then((response) => {
            if(response.data.error){
                alert(response.data.message)
            }else{
                console.log(response.data)
                this.setState({
                    comments: response.data,
                    loading: false
                })
            }
        })
        .catch(err=>{
            alert("Intentelo mas tarde")
            this.setState({
                loading: false
            })
        })
    }

    render(){
        if(this.state.loading){
            return(
              <Loading/>
            )
        }
        return(
            <div className="comments">
                
                {this.state.comments.map((comment, indice) => (
                    <div className="comment-box" key={`comment${indice}`}>
                    <div className="comment-header">
                        <span>En el producto: <Link to={`/producto/${comment.id_producto}`} className="comment-producto-name">
                            {comment.producto.nombre_producto}
                            </Link>
                        </span>
                        <span>{`El dia: ${comment.fecha}`}</span>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <div className="rating-stars">
                    <span>Calificacion otorgada</span>
                        {comment.calificacion > 4? <i className="fa fa-star"/>: null}
                        {comment.calificacion > 3? <i className="fa fa-star"/>: null}
                        {comment.calificacion > 2? <i className="fa fa-star"/>: null}
                        {comment.calificacion > 1? <i className="fa fa-star"/>: null}
                        {comment.calificacion > 0? <i className="fa fa-star"/>: null}
                    </div>
                    <div className="options-comt-buttons">
                    <button 
                        className="fa fa-pen comment-edit" 
                    />
                    <button 
                        className="fa fa-trash comment-delete" 
                    />
                    </div>
                   
                    </div>
                ))}                
                
            </div>
        )
    }
   
}

export default Comentario;