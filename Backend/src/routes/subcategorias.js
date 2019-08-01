import { Router } from 'express';
import { createSubCategoria, getSubCategorias, getOneSubCategoria, deleteOnSubCategoria, updateSubCategorias} from '../controllers/dao.subcategorias';

const router = Router();

// /api/subcategorias
router.post('/',createSubCategoria);
router.get('/',getSubCategorias);

// /api/subcategorias/:id_subcategoria
router.get('/:id_subcategoria',getOneSubCategoria);
router.delete('/:id_subcategoria',deleteOnSubCategoria);
router.put('/:id_subcategoria',updateSubCategorias);

export default router;