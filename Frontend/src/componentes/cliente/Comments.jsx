import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import {Link} from 'react-router-dom'

import '../../estilos/comments.css'

const ComentarioBox =(props) =>{
    return(
        <div className="comment-box">
        <div className="comment-header">
            <span>En el producto: <Link to="/125478" className="comment-producto-name">XBOX ONE</Link></span>
            <span>El dia: 1995-10-18</span>
        </div>
        <p>Esto es el comentario mas largo de la historia xdxdx Me parece una falta de ate chicos los que esten leyendo este comentario por favor necesito saber si los que estudiaron todos los temas en esta pagina web les sirvio de ayuda para el anterior icfes del 10 de agosto del 2019 si quieren responder la pregunta dejo mi correo </p>
        </div>
    )
}
const Comentario = (props) => {
    const array = [1,2,3,4,5,6]
    return (
        <div className="comments">
            {array.map((indice) => (<ComentarioBox key={indice}/>))}
        </div>
    )
}

export default Comentario;