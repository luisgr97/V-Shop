/**
En este archivo se especifica lo que hace
el servidor cuando se invoca la url,
mediante algun metodo (ej: post, get) 
*/
import { Router } from 'express' //Manejo de rutas
import { getOneAdmin, getAdmins, createAdmin, deleteAdmin, updateAdmin } from './controladores/dao.admin'
import { createUsuario, deleteUsuario, getOneUsuario, updateUsuario, listUsuarios } from './controladores/dao.usuario'
import { createGerente, updateGerente, deleteGerente, getOneGerente, listGerentes } from './controladores/dao.gerente'
import { createCliente, updateCliente, getOneCliente, listClientes, deleteCliente } from './controladores/dao.cliente'
const server = Router();

//Cuando se hace solicitud GET,POST,PUD,DELETE a la URL .../adimins
server.post('/login', getOneAdmin)
server.get('/admins', getAdmins);
server.post('/admins', createAdmin);
server.delete('/admins', deleteAdmin);
server.put('/admins', updateAdmin);


//Cuando se hace solicitud GET,POST,PUD,DELETE a la URL .../usuario
server.post('/usuario/get', getOneUsuario);
server.get('/usuario/list', listUsuarios);
server.post('/usuario/create', createUsuario);
server.delete('/usuario/delete', deleteUsuario);
server.put('/usuario/update', updateUsuario);


//Cuando se hace solicitud GET,POST,PUD,DELETE a la URL .../gerente
server.post('/gerente/get', getOneGerente);
server.get('/gerente/list', listGerentes);
server.post('/gerente/create', createGerente);
server.delete('/gerente/delete', deleteGerente);
server.put('/gerente/update', updateGerente);



//Cuando se hace solicitud GET,POST,PUD,DELETE a la URL .../cliente
server.post('/cliente/get', getOneCliente);
server.get('/cliente/list', listClientes);
server.post('/cliente/create', createCliente);
server.delete('/cliente/delete', deleteCliente);
server.put('/cliente/update', updateCliente);







export default server;