import { Router } from 'express';
import { logUsuario, createUsuario, deleteUsuario, getOneUsuario, updateUsuario, listUsuarios, checkNick,
      getJoinFacturas, getJoinComentario,getJoinUsersAvalaibles, getJoinManagerCatalog } from '../controllers/dao.usuario';

const router = Router();

/*CRUD usuario*/
//Create user, requires body, return user || error
router.post('/create', createUsuario);
//Get all users, return users || null
router.get('/get', listUsuarios);
//Get one user, requires parameter id_usuario, return user || null
router.get('/get/:id_usuario', getOneUsuario);
//Get one user, requires parameter id_usuario, return user || null
router.get('/getJoinComentario/:id_usuario', getJoinComentario);
//Update user, requires id:usuario, return 1 || 0
router.put('/update/:id_usuario', updateUsuario);
//Delete user requires id:usuario, return 1 || 0
router.delete('/delete/:id_usuario', deleteUsuario);

/*functions*/
//get login; requires nick and pass; return tipo_usuarios || null
router.post('/login', logUsuario);
//check existing nick
router.get('/check-nick/:nick', checkNick);
//GetFacturasJoinUsuarios
router.get('/getJoinFacturas/:id_usuario', getJoinFacturas);
//Get users avaliables, return users || null
router.get('/usuariosdisponibles', getJoinUsersAvalaibles);
//Get manageres and their catalogs
router.get('/joinCatalog', getJoinManagerCatalog);





export default router;