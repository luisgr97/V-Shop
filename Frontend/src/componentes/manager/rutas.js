import Categorias from './Categorias'
import Productos from './Productos'
const adminRoutes = [
  {
    name: 'Productos',
    id: 'productos',
    component: Productos
  },
  {
    name: 'Categorias',
    id: 'categorias',
    component: Categorias
  }
]
  
    export default adminRoutes;