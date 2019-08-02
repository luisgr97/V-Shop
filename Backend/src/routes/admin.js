import { Router } from 'express';
import { logAdmin, getOneAdmin, getAdmins, createAdmin, deleteAdmin, updateAdmin } from '../controllers/dao.admin';

const router = Router();

router.post('/login', logAdmin);
router.get('/:id_adm', getOneAdmin);
router.get('/list', getAdmins);
router.post('/create', createAdmin);
router.delete('/delete', deleteAdmin);
router.put('/update', updateAdmin);

export default router;