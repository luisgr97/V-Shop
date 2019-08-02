import { Router } from 'express';
import { logCliente, createCliente, updateCliente, getOneCliente, listClientes, deleteCliente } from '../controllers/dao.cliente';
const router = Router();

router.post('/login', logCliente);
router.get('/:id_cliente', getOneCliente);
router.get('/list', listClientes);
router.post('/create', createCliente);
router.delete('/delete', deleteCliente);
router.put('/update', updateCliente);

export default router;