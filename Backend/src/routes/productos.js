import { Router } from 'express';
import { crearProducto, getProductos, getOnProducto, deleteOnProducto, updateProductos } from '../controllers/dao.productos'; //funcion con los controladores para productos
const router = Router();

// ruta inicial: /api/produtos/ endpoint
//Manejador de peticion, se puede declarar aqui, pero para mayor orden, usamos controllers
router.post('/',crearProducto);
router.get('/',getProductos);

// ruta inicial: /api/produtos/:id_producto endpoint
router.get('/:codigo_producto',getOnProducto);
router.delete('/:codigo_producto',deleteOnProducto);
router.put('/:codigo_producto',updateProductos);
export default router;