import { Router } from 'express';
import {
    getBirthDayUsers,
    getProductLessTen,
    getVentasMesProducto,
    getMenosVendidos,
    getVentasMesTienda,
    getMejoresClientes,
    getMasVendidos
} from '../controllers/dao.reportes';
const router = Router();

//return array with data of birthday users
router.get('/getBirthDayUsers', getBirthDayUsers);

router.get('/getProductLessTen', getProductLessTen);

router.post('/getVentasMesProducto', getVentasMesProducto);

router.get('/getMenosVendidos', getMenosVendidos);

router.get('/getMasVendidos', getMasVendidos);

router.post('/getVentasMesTienda', getVentasMesTienda);

router.get('/getMejoresClientes', getMejoresClientes);



export default router;