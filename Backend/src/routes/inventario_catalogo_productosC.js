import { Router } from 'express';
import { crear, get, getOn, deleteOn, updateOn, updateOnCantidad } from '../controllers/dao.inventario_catalogo_productos'; //funcion con los controladores para productos
const router = Router();

/*CRUD category*/
//Create category, requires body, return categoty || error
router.post('/create', crear);
//Get all categorys, return categotys || null
router.get('/get', get);
//Get one category, requires parameter id_categoria, return categoty || null
router.get('/get/:id_producto/:id_catalogo', getOn);
//Update category, requires parameter id_categoria, return 1 || 0
router.put('/update/:id_product/:id_catal', updateOn);
//Delete category, requires parameter id_categoria, return 1 || 0
router.delete('/delete/:id_producto/:id_catalogo', deleteOn);

/*functions*/
router.put('/update/stock/:id_producto/:id_catalogo', updateOnCantidad);
//router.get('/get/by-producto/:id_producto',getOnByProducto);

export default router;