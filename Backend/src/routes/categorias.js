import { Router } from 'express';
import { createCategoria, getCategorias, getOneCategoria, deleteOnCategoria, updateCategorias } from '../controllers/dao.categorias';

const router = Router();

// /api/categorias
router.post('/',createCategoria);
router.get('/',getCategorias);

// /api/categorias/:id_categoria
router.get('/:id_categoria',getOneCategoria);
router.delete('/:id_categoria',deleteOnCategoria);
router.put('/:id_categoria',updateCategorias);

export default router;