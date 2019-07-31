/* Por el momento solo se tiene el login como ejemplo */
import React, { Component } from 'react'
import { Button, Form, Label, FormGroup, Input, CustomInput } from 'reactstrap';
import axios from 'axios'

/*
Los componentes con estado deben ser clases
vea un ejemplo de componente sin estado en el
footer o header
*/

class LoginAdmin extends Component {

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
        <Form className="formulario">
          <FormGroup>
            <Label>Ingrese su usuario</Label>
            <Input type="email" name="email" id="exampleEmail" onChange = {this.onChange('nick')} />                         
            {/*<Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            */}
          </FormGroup>
            <br/>
          <FormGroup>
          <Label>Contraseña de acceso</Label>
            <Input type="email" name="email" id="exampleEmail" onChange = {this.onChange('password')} />                                   
          </FormGroup>
          <FormGroup>
          <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Recordar" />            
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

export default LoginAdmin;