import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors'
//Importing routers
import productoRoutes from './routes/productos';
import categoriasRoutes from './routes/categorias';
import subcategoriasRoutes from './routes/subcategorias';
import usersRoutes from './routes/usuarios';
import adminRoutes from './routes/admin';
import gerenteRoutes from './routes/gerentes';
import clienteRoutes from './routes/clientes';

//initialization
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(json());
app.use(cors()); //Necesario para la evitar rechazo del servidor

//routes
app.use('/api/productos',productoRoutes);
app.use('/api/categorias',categoriasRoutes);
app.use('/api/subcategorias',subcategoriasRoutes);
app.use('/usuario',usersRoutes);
app.use('/admins',adminRoutes);
app.use('/gerente',gerenteRoutes);
app.use('/cliente',clienteRoutes);


export default app;