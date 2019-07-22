/**
En este archivo se especifica lo que hace
el servidor cuando se invoca la url,
mediante algun metodo (ej: post, get) 
*/
import {Router} from 'express' //Manejo de rutas
import { getOneAdmin, getAdmins } from './controladores/dao.admin'
const server = Router();

//Cuando se hace solicitud POST a la URL .../login
server.post('/login', getOneAdmin)

//Cuando se hace solicitud GET a la URL .../login
server.get('/admins', getAdmins )

export default server;
