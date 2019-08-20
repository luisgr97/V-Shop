import { Router } from 'express';
import { crearFactura, getFacturas, getOnFactura, deleteOnFactura, updateFactura } from '../controllers/dao.factura';
const router = Router();

/*CRUD Factura*/
//Create category, requires body, return categoty || error
router.post('/create', crearFactura);
//Get all categorys, return categotys || null
router.get('/get', getFacturas);
//Get one category, requires parameter id_categoria, return categoty || null
router.get('/get/:id_factura', getOnFactura);
//Update category, requires parameter id_categoria, return 1 || 0
router.put('/update/:id_factura', updateFactura);
//Delete category, requires parameter id_categoria, return 1 || 0
router.delete('/delete/:id_factura', deleteOnFactura);

/*functions*/
//router.get('/get/by-producto/:id_producto',getOnByProducto);

export default router;