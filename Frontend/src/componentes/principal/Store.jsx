import React from 'react'
import axios from 'axios'
import {  Route, Redirect, Switch } from 'react-router-dom'
import { Fade, Spinner } from 'reactstrap';

import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import Cliente from '../cliente/Dashboard'
import ProductPage from './ProductPage'
import Loading from './Loading'
import { ProductoProvider } from './Context'
import Axios from 'axios';

class Store extends React.Component {
    constructor(props){
        super(props)
        this.state={
            //loading: true,
            idCatalog: 1
        }
        this.changeIdCatalog = this.changeIdCatalog.bind(this)

    }
/*
    componentDidMount(){
        axios.get('http://localhost:4000/api/catalogos/get')
        .then(response => {
            if(response.data.error){
                alert(response.data.message)
            }else{
                this.setState({
                    idCatalog: response.data[0].id_catalogo,
                    //loading: false
                })
            }
        })
    }
*/

shouldComponentUpdate(nextProps, nextState){
    return nextState.idCatalog !== this.state.idCatalog    
}

    changeIdCatalog(e){
        this.setState({
            idCatalog: e.target.value
        })
    }


    render(){
        return(
            <ProductoProvider>
                <Fade in={true} >
                    <Header                     
                        nombre={this.props.nombre}
                        login={this.props.login}                                 
                        logueado={this.props.logueado}   
                        idCatalog = {this.state.idCatalog}
                        changeCatalog = {this.changeIdCatalog}                      
                    />                                       
                    <Switch>
                        <Route path="/cliente" render={({location}) =>
                            this.props.logueado ? 
                            <Cliente location = {location}
                                idCliente={this.props.idCliente}                                                                    
                            /> : <Redirect to="/login" />
                                                            
                        }/>

                        <Route path="/producto/:id_producto" render={() => 
                            <ProductPage idCatalog={this.state.idCatalog}/>  
                        }/>

                        <Route exact path="/" render={() =>
                            <Main idCatalog={this.state.idCatalog}/>  
                        }/>

                        <Route render={() => (<h1>Pagina no encontrada</h1>)} />
                    </Switch>  
                    <Footer/>  
                </Fade> 
                </ProductoProvider>     
        )
    }
}

export default Store;