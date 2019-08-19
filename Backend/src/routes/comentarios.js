import { Router } from 'express';
import { crear, get, getOn, deleteOn, updateOn, getOnByProducto } from '../controllers/dao.comentarios'; //funcion con los controladores para productos
const router = Router();

/*CRUD category*/
//Create category, requires body, return categoty || error
router.post('/create', crear);
//Get all categorys, return categotys || null
router.get('/get', get);
//Get one category, requires parameter id_categoria, return categoty || null
router.get('/get/:id_comentario', getOn);
//Update category, requires parameter id_categoria, return 1 || 0
router.put('/update/:id_comentario', updateOn);
//Delete category, requires parameter id_categoria, return 1 || 0
router.delete('/delete/:id_comentario', deleteOn);

/*functions*/
router.get('/get/by-producto/:id_producto',getOnByProducto);

export default router;