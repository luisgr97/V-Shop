import { Router } from 'express';
import { logGerente, createGerente, updateGerente, deleteGerente, getOneGerente, listGerentes } from '../controllers/dao.gerente';
const router = Router();

router.post('/login', logGerente);
router.post('/get', getOneGerente);
router.get('/list', listGerentes);
router.post('/create', createGerente);
router.delete('/delete', deleteGerente);
router.put('/update', updateGerente);

export default router;