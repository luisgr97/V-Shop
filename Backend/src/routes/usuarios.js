import { Router } from 'express';
import { logUsuario, createUsuario, deleteUsuario, getOneUsuario, updateUsuario, listUsuarios } from '../controllers/dao.usuario';
const router = Router();


router.post('/login', logUsuario);
router.get('/get/:id_usuario', getOneUsuario);
router.get('/list', listUsuarios);
router.post('/create', createUsuario);
router.delete('/delete/:id_usuario', deleteUsuario);
router.put('/update', updateUsuario);

export default router;