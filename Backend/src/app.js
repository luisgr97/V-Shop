import express, { json } from 'express';
import morgan from 'morgan';

//Importing routers
import productoRoutes from './routes/productos';
import categoriasRoutes from './routes/categorias';
import subcategoriasRoutes from './routes/subcategorias';

//initialization
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(json());

//routes
app.use('/api/productos',productoRoutes);
app.use('/api/categorias',categoriasRoutes);
app.use('/api/subcategorias',subcategoriasRoutes);



export default app;