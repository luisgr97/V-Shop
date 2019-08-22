import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button, FormGroup, Input } from 'reactstrap';
import Loading from './Loading';

import '../estilos/loginClient.css'

class LoginClient extends Component {
    constructor(props) {
        super(props);
        //console.log(props)
        this.state = {
            nick: "",
            clave: "",
            loading: false
        };
        this.handleOnchange = this.handleOnchange.bind(this);
        this.enviarSolicitud = this.enviarSolicitud.bind(this)
        this.enviar = this.enviar.bind(this);

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
        clave: this.state.clave
        
      }
      //Axios se encarga de hacer solicitudes de forma sencilla
      axios.post('http://localhost:4000/usuario/login', mensaje)
      .then((response) => {
        this.setState({ loading: false })
        console.log(response.data)

        if(response.data.find){
          this.props.login(0, response.data)
        }else{
          console.log("Usuario invalido")
        }      
      })      
      .catch(err=>{
        alert("Intentelo mas tarde")
        this.setState({ loading: false })
      })
      
    }

    
    enviar() {
        /*
            let esConductor = (JSON.parse(this.state.conductor));
            if(this.state.nick.match("^[0-9]+$")!=null){
              if(this.state.contrasena !== ""){
                const input = {
                  nick: this.state.nick, 
                  contrasena: this.state.contrasena,
                  conductor: false
                };
                let url = "http://"+ this.props.url +":4000/login";
                if(esConductor){
                  input.conductor = true;
                }
                const opciones = {
                  method: 'POST',  
                  body: JSON.stringify(input),  
                  headers:{
                    'Content-Type': 'application/json'
                  }
                };
                const request = new Request(url, opciones);
                this.setState({closedProgress: false})
                fetch(request).then(res => res.json())
                .then((response) => {
        
                  this.setState({closedProgress: true})
                  console.log('Exito:', JSON.stringify(response))
        
                  if (response.nick) {
                    if(response.contrasena){
                      if(esConductor){
                        if(response.ocupado){
                          handleClick({message: "El taxi esta siendo usado!!"})
                        }else{
                          this.props.iniciarSesion({valor: esConductor, nombre: response.nombre, id:response.id, placa: response.placa});
                        }
                      }else{
                        if(response.ocupado){
                          handleClick({message: "La sesion ya esta iniciada"})
                        }else{
                          this.props.iniciarSesion({valor: esConductor, nombre: response.nombre, id:response.id});
                        }
                      }            
                    }else{
                      handleClick({message: "Contraseña incorrecta"})
                    }
                  }else{
                    handleClick({message: (esConductor)?
                                          "El Conductor no esta registrado":
                                          "El Pasajero no esta registrado"
                                        })
                  }
                }
                )
                .catch(error => {
                  console.log('Error:', error)
                  this.setState({closedProgress: true})
                  handleClick({message: "Error de red, intentelo mas tarde"})
                  });
        
              }else{
                handleClick({message: "La contraseña esta vacia"})
              }
            }else{
              handleClick({message: (esConductor)?
                          "El número de CEDULA es invalido":
                          "El número de CELULAR es invalido"
                          })
            } 
            */
    }

    render() {
        return (
            <div>                
                <div className="bloque-login">
                    <div className="card-heading">
                    </div>
                    <div id="formularioLogin">
                        <h3>Iniciar Sesión</h3>
                        {this.state.loading?
                         <Loading/> : null
                        }
                         
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
                        <br />
                        <div className="center">
                          <span>¿Aun sin cuenta? <Link to={"/registro"} >registrare aqui</Link>
                          </span>
                          </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginClient;