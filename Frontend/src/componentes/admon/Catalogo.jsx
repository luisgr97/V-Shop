import React from 'react'
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

const manager = [
    {
        id_usuario: 2,
        nombre: "Esneider Manzano",
    },
    {
        id_usuario: 12,
        nombre: "Abdul Jalamelavalija",
    }
]
class Sedes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameCatalog: "",
            idManagerInCharge: "",
            city: "",

        }
        this.onChange = this.onChange.bind(this)
    }

    //Captura en el estado correspondiente, el teclado
    onChange = input => e => {
        this.setState({ [input]: e.target.value });
    }


    render() {
        return (
            <div id="admin-catalogo">
                <h2>Gestion de Catalogos</h2>
                <Form>
                    <Row>
                        <Col xs={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Ciudad del catalogo</Label>
                                <Input type="text" name="cityCatalog" id="cityCatalog" 
                                    placeholder="Ciudad" 
                                    onChange={this.onChange('city')}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Nombre del catalogo</Label>
                                <Input type="text" name="nameCatalog" id="nameCatalog" 
                                    placeholder="Nombre" 
                                    onChange={this.onChange('nameCatalog')}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Label>Modificar categoria</Label>
                    <Input type="select" name="select" id="idManagerInCharge"
                        onChange={this.onChange('idManagerInCharge')}>
                        {manager.map((indice) =>
                            <option key={indice.nombre}
                                value={indice.id_usuario}>{indice.nombre}</option>)
                        }
                    </Input>
                </Form>
            </div>
        )
    }
}

export default Sedes;