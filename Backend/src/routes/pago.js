import { Router } from 'express';
import { addOne, get, getOn, deleteOn, updateOn } from '../controllers/dao.pago';
const router = Router();

/*CRUD Factura*/
//Create category, requires body, return categoty || error
router.post('/create', addOne);
//Get all categorys, return categotys || null
router.get('/get', get);
//Get one category, requires parameter id_categoria, return categoty || null
router.get('/get/:num_pago', getOn);
//Update category, requires parameter id_categoria, return 1 || 0
router.put('/update/:num_pago', updateOn);
//Delete category, requires parameter id_categoria, return 1 || 0
router.delete('/delete/:num_pago', deleteOn);

/*functions*/
//router.get('/get/by-producto/:id_producto',getOnByProducto);

export default router;