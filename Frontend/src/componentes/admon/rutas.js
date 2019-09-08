import Categorias from './Categorias'
import Productos from './Productos'
import Catalogo from './Catalogo'
import Modal from '../principal/Checkout'

const adminRoutes = [
  {
    name: 'Inicio',
    id: 'index',
    component: Modal
  },
  {
    name: 'Productos',
    id: 'productos',
    component: Productos
  },
  {
    name: 'Categorias',
    id: 'categorias',
    component: Categorias
  },
  {
    name: 'Catalogo',
    id: 'catalogo',
    component: Catalogo
  }
]
  
    export default adminRoutes;