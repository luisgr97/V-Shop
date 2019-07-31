import express, {json} from 'express'
import {encender} from './db';
import routes from './rutas'
import cors from 'cors'

const server = express();
const port = 5000; //Puerto

server.use(json()); //Necesrio para parser a datos json
server.use(cors()); //Necesario para la evitar rechazo del servidor
server.use('/', routes) //Usamos las rutas que espeficifamos

server.listen(port, ()=>{
    console.log("Server on")
});

encender(); //Conecta la base de datos