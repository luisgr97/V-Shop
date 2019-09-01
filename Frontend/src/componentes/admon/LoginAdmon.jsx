/* Por el momento solo se tiene el login como ejemplo */
import React, { Component } from 'react'
import { Button, Form, Label, FormGroup, Input } from 'reactstrap';
import axios from 'axios'

/*
Los componentes con estado deben ser clases
vea un ejemplo de componente sin estado en el
footer o header
*/

class LoginAdmon extends Component {
  //Iniciamos los atributos
  constructor(props) {
    super(props)
    this.state = {
      password: "",
      nick: ""
    };
    //Esto es necesario para la identificacion de funciones
    this.enviar = this.enviar.bind(this);
    this.onChange = this.onChange.bind(this) 
  }

  //FUncion que obtiene y cambia un stributo del estado
  onChange = input => e =>{ 
    this.setState({ [input]: e.target.value});
  }  

  //Funcion ejemplo para hacer solicitud al servidor
  enviar() {
    const mensaje = {
      nick: this.state.nick,
      clave: this.state.password      
    }
    //Axios se encarga de hacer solicitudes de forma sencilla
    axios.post('http://localhost:4000/usuario/login', mensaje)
    .then((response) => {
      console.log(response.data)
      if(response.data.find){
        if(this.props.isAdmin){
          this.props.login(1, response.data)
        }else{
          this.props.login(2, response.data)
        }
        
      }else{
        console.log("Usuario invalido")
      }  
    })
  }

  //El metodo render es obligario para los componentes con estado
  render() {
    //Aqui podemos hacer validaciones para retonar diferentes cosas
    //El metodo retunr es necesario
    return (
        <Form className="formulario">
          <FormGroup>
            <Label>Ingrese su usuario</Label>
            <Input type="text" name="text" id="admonUser" 
              onChange = {this.onChange('nick')} 
            />                         
          </FormGroup>

            <br/>
          <FormGroup>
          <Label>Contraseña de acceso</Label>
            <Input type="password" name="password" id="admonPass" 
              onChange = {this.onChange('password')} 
            />                                   
          </FormGroup>

          <div className="center">
            <Button color="danger" onClick={this.enviar}>
              Iniciar
            </Button>
          </div>
        </Form>
    );
  }
}

export default LoginAdmon;