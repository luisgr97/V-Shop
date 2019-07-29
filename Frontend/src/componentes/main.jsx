/* Por el momento solo se tiene el login como ejemplo */
import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import axios from 'axios'

/*
Los componentes con estado deben ser clases
vea un ejemplo de componente sin estado en el
footer o header
*/

class Login extends Component {

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
      password: this.state.password,
      nick: this.state.nick
    }

    //Axios se encarga de hacer solicitudes de forma sencilla
    axios.post('http://localhost:5000/login', mensaje)
    .then((response) => {
      alert(JSON.stringify(response.data))
    })
  }

  //El metodo render es obligario para los componentes con estado
  render() {

    //Aqui podemos hacer validaciones para retonar diferentes cosas

    //El metodo retunr es necesario
    return (
      <main>
        <Form className="formulario">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Ingrese su usuario</Form.Label>
            <Form.Control placeholder="Usuario" 
              onChange = {this.onChange('nick')}
            />
            {/*<Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            */}
          </Form.Group>
            <br/>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" 
              onChange={this.onChange('password')}
              placeholder="Password" 
            />
          </Form.Group>
          <Form.Group controlId="formBasicChecbox">
            <Form.Check custom type="checkbox" label="Recordar" />
          </Form.Group>
          <div className="center">
            <Button variant="danger" onClick={this.enviar}>
              Iniciar
            </Button>
          </div>
        </Form>
      </main>

    );
  }
}

export default Login;