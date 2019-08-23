import { Router } from 'express';
import { createCategoria, getCategorias, getOneCategoria, deleteOnCategoria, updateCategorias, getJoinSubCategoria } from '../controllers/dao.categorias';

const router = Router();

/*CRUD category*/
//Create category, requires body, return categoty || error
router.post('/create', createCategoria);
//Get all categorys, return categotys || null
router.get('/get', getCategorias);
//Get one category, requires parameter id_categoria, return categoty || null
router.get('/get/:id_categoria', getOneCategoria);
//Update category, requires parameter id_categoria, return 1 || 0
router.put('/update/:id_categoria', updateCategorias);
//Delete category, requires parameter id_categoria, return 1 || 0
router.delete('/delete/:id_categoria', deleteOnCategoria);
//get categorias con subcategorias anidadas
router.get('/getJoinSubCategoria', getJoinSubCategoria);

export default router;