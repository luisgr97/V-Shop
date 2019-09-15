import React from 'react'
import Registro from '../principal/Registro'

const propiedades = {
    tipo_documento: "CC",
    numero_documento: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    direccion: "",
    fecha_de_nacimiento: "",
    correo: "",
    nick: "",
    clave: "",
  };
  


class Managers extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <div id="admin-manager">
                <h2>Registrar un nuevo gerente</h2>        
                <Registro isManager={true}  
                  actualizar={false}                  
                  datos={propiedades}
                  mensaje={"REGISTRAR GERENTE"} />
            </div>
        )
    }
}


export default Managers;