import { Router } from 'express';
import {
    getBirthDayUsers,
    getProductLessTen,
    getVentasMesProducto,
    getMenosVendidos,
    getVentasMesTienda,
    getMejoresClientes,
    getMasVendidos,
    getMenosVendidosPorSede,
    getMasVendidosPorSede
} from '../controllers/dao.reportes';
const router = Router();

//return array with data of birthday users
router.get('/getBirthDayUsers', getBirthDayUsers);

router.get('/getProductLessTen', getProductLessTen);

router.post('/getVentasMesProducto', getVentasMesProducto);

router.get('/getMenosVendidos', getMenosVendidos);getMenosVendidosPorSede

router.get('/getMenosVendidosPorSede/:id_catalogo', getMenosVendidosPorSede);

router.get('/getMasVendidosPorSede/:id_catalogo', getMasVendidosPorSede);

router.get('/getMasVendidos', getMasVendidos);

router.post('/getVentasMesTienda', getVentasMesTienda);

router.get('/getMejoresClientes', getMejoresClientes);



export default router;