import { Router } from 'express';
import { crearProducto, getProductos, getOnProducto, deleteOnProducto, updateProductos, getOnProductoBySubcategoria } from '../controllers/dao.productos'; //funcion con los controladores para productos
const router = Router();

/*CRUD category*/
//Create category, requires body, return categoty || error
router.post('/create', crearProducto);
//Get all categorys, return categotys || null
router.get('/get', getProductos);
//Get one category, requires parameter id_categoria, return categoty || null
router.get('/get/:id_producto', getOnProducto);
//Update category, requires parameter id_categoria, return 1 || 0
router.put('/update/:id_producto', updateProductos);
//Delete category, requires parameter id_categoria, return 1 || 0
router.delete('/delete/:id_producto', deleteOnProducto);

/*functions*/
router.get('/get/by-subcategory/:id_subcategoria',getOnProductoBySubcategoria);

export default router;