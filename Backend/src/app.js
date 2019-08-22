import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors'

//Importing routers
import productoRoutes from './routes/productos';
import categoriasRoutes from './routes/categorias';
import subcategoriasRoutes from './routes/subcategorias';
import usersRoutes from './routes/usuarios';
import imagenesRoutes from './routes/imagenes';
import comentariosRoutes from './routes/comentarios';
import descuentosRoutes from './routes/descuentos';
import catalogosRoutes from './routes/catalogos';
import inventarioRoutes from './routes/inventario_catalogo_productosC';
import facturaRoutes from './routes/factura';  
import detalle_facturaRoutes from './routes/detalle_factura' ;
import pagRoutes from './routes/pago'

//initialization
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(json());
app.use(cors())
//routes
app.use('/api/catalogos',catalogosRoutes);
app.use('/api/catalogos/inventario',inventarioRoutes);
app.use('/api/productos',productoRoutes);
app.use('/api/productos/imagenes',imagenesRoutes);
app.use('/api/productos/comentarios',comentariosRoutes);
app.use('/api/descuentos',descuentosRoutes);
app.use('/api/categorias',categoriasRoutes);
app.use('/api/subcategorias',subcategoriasRoutes);
app.use('/api/factura',facturaRoutes);
app.use('/api/factura/detalle_factura',detalle_facturaRoutes);
app.use('/api/pago',pagRoutes)
app.use('/usuario',usersRoutes);


export default app;