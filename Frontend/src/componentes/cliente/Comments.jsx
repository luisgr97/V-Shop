import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Input} from 'reactstrap'
import Loading from '../principal/Loading'

import '../../estilos/comments.css'

class Comentario extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            comments: [],
            editComment: "",
            editDescription: "",
            updateScore: 0,
            loading : true
        }
        this.deleteComment = this.deleteComment.bind(this)
        this.editComment = this.editComment.bind(this)
        this.editScore = this.editScore.bind(this)
        this.onChange = this.onChange.bind(this)
    };

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

    deleteComment(e){
        let id_comment = e.target.value
        var confirmar = window.confirm("¿Seguro que desea eliminar este comentario?")
        if(confirmar){
            axios.delete('http://localhost:4000/api/productos/comentarios/delete/' + id_comment)
            .then((response) => {
                if(response.data.error){
                    alert(response.data.message)
                }else{
                    let comentarios = this.state.comments.filter(comment => (
                        comment.id_comentario !== parseInt(id_comment)
                    ))
                    this.setState({
                        comments: comentarios,
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
    }

    editComment(e){
        this.setState({
            editComment: e.target.value
        })
    }

    editScore(e){
        this.setState({
            updateScore: e.target.value
        })
    }

    //Cambio en los inputs
    onChange = input => e =>{ 
        this.setState({ [input]: e.target.value});
    }  

    render(){
        const updateScore = this.state.updateScore
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

                    {this.state.editComment==comment.id_comentario?
                        <div> 
                            <Input type="textarea" name="cmt-descripcion" id="cmt-descripcion" 
                                value={comment.comentario}/>
                            <div className="input-rating">
                                <span>Nueva calificación: </span>
                                <div className="stars">
                                    <input id="star5" name="rating" value="5" type="radio" onClick={this.editScore}/><label htmlFor="star5"></label>
                                    <input id="star4" name="rating" value="4" type="radio" onClick={this.editScore}/><label htmlFor="star4"></label>
                                    <input id="star3" name="rating" value="3" type="radio" onClick={this.editScore}/><label htmlFor="star3"></label>
                                    <input id="star2" name="rating" value="2" type="radio" onClick={this.editScore}/><label htmlFor="star2"></label>
                                    <input id="star1" name="rating" value="1" type="radio" onClick={this.editScore}/><label htmlFor="star1"></label>
                                </div>
                            </div>
                        </div> : 
                        <div>
                            <p>{comment.comentario}</p>
                            <div className="rating-stars">
                            <span>Calificacion otorgada</span>
                                {comment.calificacion > 4? <i className="fa fa-star"/>: null}
                                {comment.calificacion > 3? <i className="fa fa-star"/>: null}
                                {comment.calificacion > 2? <i className="fa fa-star"/>: null}
                                {comment.calificacion > 1? <i className="fa fa-star"/>: null}
                                {comment.calificacion > 0? <i className="fa fa-star"/>: null}
                            </div>
                        </div>
                    }
                       
                    <div className="options-comt-buttons">
                    <button value={comment.id_comentario}
                        onClick={this.editComment}
                        className="fa fa-pen comment-edit" 
                    />
                    <button value={comment.id_comentario}
                        onClick={this.deleteComment}
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