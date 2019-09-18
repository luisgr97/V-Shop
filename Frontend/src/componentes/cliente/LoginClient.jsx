import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button, FormGroup, Input } from 'reactstrap';
import Loading from '../principal/Loading';
import Taxi from '../../imagenes/taxi.png'
import '../../estilos/login-client.css'

class LoginClient extends Component {
    constructor(props) {
        super(props);
        //console.log(props)
        this.state = {
            nick: "",
            clave: "",
            loading: false,
            log: false
        };
        this.handleOnchange = this.handleOnchange.bind(this);
        this.enviarSolicitud = this.enviarSolicitud.bind(this)
    }


    handleOnchange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    enviarSolicitud() {
      this.setState({
        loading: true
      })
      const mensaje = {
        nick: this.state.nick,
        clave: this.state.clave,
        tipo_usuario: "Cliente"        
      }
      //Axios se encarga de hacer solicitudes de forma sencilla
      axios.post('http://localhost:4000/usuario/login', mensaje)
      .then((response) => {
        this.setState({ loading: false })
        if(response.data.find){
          if(response.data.pass){
            this.setState({
              log: true
          }, ()=>{
          window.setTimeout(() => {
            this.props.login(0, response.data)
          }, 500)
          })
            
          }else{
            alert(response.data.message)
          }
        }else{
          alert(response.data.message)
        }      
      })      
      .catch(err=>{
        this.setState({ loading: false })
        alert("Error, por favor intentelo mas tarde")        
      })
      
    }

    render() {
        return (
                <div className={this.state.log? "bloque-login log" : "bloque-login"}>
                  
                    <div className="card-heading">
                    </div>                    
                    <div id="formularioLogin">  
                                     
                        <h3>Iniciar Sesión</h3>                                               
                        <br />
                        <FormGroup>
                        <i className="fa fa-user"/>
                            <Input type="email" name="email"
                                onChange={this.handleOnchange('nick')}
                                placeholder="Usuario" 
                                />

                        <i className="fa fa-lock"></i>
                            <Input type="password" name="password"
                                onChange={this.handleOnchange('clave')}
                                placeholder="contrasena" />

                        </FormGroup>
                        <br />
                        <Button color="danger" block onClick={this.enviarSolicitud}>INGRESAR</Button>{' '}                       
                        <br /><br />
                        {this.state.loading?
                         <Loading/> : null
                        } 
                        <div className="center">
                          <span>¿Aun sin cuenta? <Link to={"/registro"} >registrare aqui</Link>
                          </span>
                          </div>
                    </div>
                </div>
        );
    }
}

export default LoginClient;