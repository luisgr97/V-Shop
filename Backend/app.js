import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors'

//Importing routers
import productoRoutes from './src/routes/productos';
import categoriasRoutes from './src/routes/categorias';
import subcategoriasRoutes from './src/routes/subcategorias';
import usersRoutes from './src/routes/usuarios';
import imagenesRoutes from './src/routes/imagenes';
import comentariosRoutes from './src/routes/comentarios';
import descuentosRoutes from './src/routes/descuentos';
import catalogosRoutes from './src/routes/catalogos';
import inventarioRoutes from './src/routes/inventario_catalogo_productosC';
import facturaRoutes from './src/routes/factura';  
import detalle_facturaRoutes from './src/routes/detalle_factura' ;
import pagRoutes from './src/routes/pago'

//initialization
const app = express();


//middlewares
app.use(morgan('dev'));
app.use(json());
app.use(cors());
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

app.use(express.static(__dirname + '/public'));

export default app;