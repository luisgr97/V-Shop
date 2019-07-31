import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import '../estilos/registroClient.css'

class Registro extends React.Component {
    render() {
        return (
            <Form className="registro">
                <Row form>
                    <Col md={3}>
                        <FormGroup check inline>
                            <CustomInput type="radio" id="cc" name="customRadio" label="CC" />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup check inline>
                            <CustomInput type="radio" id="ti" name="customRadio" label="TI" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleEmail">Numero</Label>
                            <Input name="email" id="exampleEmail" placeholder="with a placeholder" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleEmail">Nombre</Label>
                            <Input name="email" id="exampleEmail" placeholder="with a placeholder" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleEmail">Apellidos</Label>
                            <Input name="email" id="exampleEmail" placeholder="with a placeholder" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleEmail">Correo</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="examplePassword">Contraseña</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label for="exampleAddress">Direccion</Label>
                    <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St" />
                </FormGroup>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleCity">City</Label>
                            <Input type="text" name="city" id="exampleCity" />
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Label for="exampleState">State</Label>
                            <Input type="text" name="state" id="exampleState" />
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="exampleZip">Zip</Label>
                            <Input type="text" name="zip" id="exampleZip" />
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleDate">Date</Label>
                            <Input
                                type="date"
                                name="date"
                                id="exampleDate"
                                placeholder="date placeholder"
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="exampleDate">Date</Label>
                            <Input
                                type="date"
                                name="date"
                                id="exampleDate"
                                placeholder="date placeholder"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Button>Sign in</Button>
            </Form>
        );
    }
}

export default  Registro;