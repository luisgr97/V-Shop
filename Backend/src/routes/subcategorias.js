import { Router } from 'express';
import { createSubCategoria, getSubCategorias, getOneSubCategoria, deleteOnSubCategoria, updateSubCategorias, getSubCategoriasByCategoria } from '../controllers/dao.subcategorias';

const router = Router();

/*CRUD category*/
//Create category, requires body, return categoty || error
router.post('/create', createSubCategoria);
//Get all categorys, return categotys || null
router.get('/get', getSubCategorias);
//Get one category, requires parameter id_categoria, return categoty || null
router.get('/get/:id_subcategoria', getOneSubCategoria);
//Update category, requires parameter id_categoria, return 1 || 0
router.put('/update/:id_subcategoria', updateSubCategorias);
//Delete category, requires parameter id_categoria, return 1 || 0
router.delete('/delete/:id_subcategoria', deleteOnSubCategoria);

/*functions*/
router.get('/get/by-category/:id_categoria',getSubCategoriasByCategoria);

/*
// /api/subcategorias
router.post('/',createSubCategoria);
router.get('/',getSubCategorias);
router.get('/PorCategoria',getSubCategoriasPorCategoria);

// /api/subcategorias/:id_subcategoria
router.get('/:id_subcategoria',getOneSubCategoria);
router.get('/PorCategoria/:id_categoria',getSubCategoriaspoxp);
router.delete('/:id_subcategoria',deleteOnSubCategoria);
router.put('/:id_subcategoria',updateSubCategorias);
*/

export default router;