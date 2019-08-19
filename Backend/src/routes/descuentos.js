import { Router } from 'express';
import { crear, get, getOn, deleteOn, updateOn } from '../controllers/dao.descuentos'; //funcion con los controladores para descuentos
const router = Router();

/*CRUD category*/
//Create category, requires body, return categoty || error
router.post('/create', crear);
//Get all categorys, return categotys || null
router.get('/get', get);
//Get one category, requires parameter id_categoria, return categoty || null
router.get('/get/:id_descuento', getOn);
//Update category, requires parameter id_categoria, return 1 || 0
router.put('/update/:id_descuento', updateOn);
//Delete category, requires parameter id_categoria, return 1 || 0
router.delete('/delete/:id_descuento', deleteOn);

/*functions*/
//router.get('/get/by-producto/:id_producto',getOnByProducto);

export default router;