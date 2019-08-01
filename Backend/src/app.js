import express, { json } from 'express';
//import morgan from 'morgan';

//Importing routers
import productoRoutes from './routes/productos';
import categoriasRoutes from './routes/categorias';
import subcategoriasRoutes from './routes/subcategorias';
import cors from 'cors';
//initialization
const app = express();

//middlewares
//app.use(morgan('dev'));
app.use(cors()); //Necesario para la evitar rechazo del servidor
app.use(json());

//routes
app.use('/api/productos',productoRoutes);
app.use('/api/categorias',categoriasRoutes);
app.use('/api/subcategorias',subcategoriasRoutes);



export default app;