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
        this.getCommets = this.getCommets.bind(this)
        this.deleteComment = this.deleteComment.bind(this)
        this.modifyComment = this.modifyComment.bind(this)
        this.editComment = this.editComment.bind(this)
        this.closeComment = this.closeComment.bind(this)
        this.editScore = this.editScore.bind(this)
        this.onChange = this.onChange.bind(this)
    };

    getCommets(){
        axios.get('http://localhost:4000/api/productos/comentarios/get/by-user/' + this.props.idCliente)
        .then((response) => {
            if(response.data.error){
                alert(response.data.message)
            }else{
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

    componentDidMount(){
        this.getCommets()
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
            })
        }
    }

    modifyComment(e){
        const mensaje = {
            comentario: this.state.editDescription,
            calificacion: this.state.updateScore
        }
        axios.put('http://localhost:4000/api/productos/comentarios/update/' + e.target.value, mensaje)
        .then((response) => {
            if(response.data.error){
                alert(response.data.message)
            }else{
                alert("Actualizado con exito")
                this.setState({
                    loading:true,
                    editComment: "",
                    editDescription: ""
                })
                this.getCommets()
            }
        })
        .catch(err=>{
            alert("Intentelo mas tarde")            
        })
    }

    editComment(e){
        let id_comentario = e.target.value, comentario;
        for(var i =0;i<this.state.comments.length;i++){
            if(parseInt(id_comentario) === this.state.comments[i].id_comentario){
                comentario = this.state.comments[i].comentario
                break;
            }             
        }
        this.setState({
            editComment: id_comentario,
            editDescription: comentario
        })
    }

    closeComment(e){
        this.setState({
            editComment: e.target.value,
            editDescription: e.target.value
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

                        {parseInt(this.state.editComment)===comment.id_comentario?
                            <div> 
                                <Input type="textarea" name="cmt-descripcion" id="cmt-descripcion" 
                                    value={this.state.editDescription} onChange={this.onChange('editDescription')}/>
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
                        
                        {parseInt(this.state.editComment)===comment.id_comentario? 
                            <div className="options-comt-buttons">
                                <button value={comment.id_comentario}
                                onClick={this.modifyComment}
                                className="fa fa-check comment-check" 
                                /> 
                                <button value={""}
                                    onClick={this.closeComment}
                                    className="fa fa-times comment-close" 
                                />                             
                            </div>: 
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
                        }                                                           
                    </div>
                ))}                
                
            </div>
        )
    }
   
}

export default Comentario;