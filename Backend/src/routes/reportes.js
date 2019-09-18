import { Router } from 'express';
import { getBirthDayUsers, getProductLessTen, getVentasMesProducto } from '../controllers/dao.reportes';
const router = Router();

//return array with data of birthday users
router.get('/getBirthDayUsers', getBirthDayUsers);

router.get('/getProductLessTen', getProductLessTen);

router.get('/getVentasMesProducto', getVentasMesProducto);



export default router;