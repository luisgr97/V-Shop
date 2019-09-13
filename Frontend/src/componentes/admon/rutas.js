import Categorias from './Categorias'
import Productos from './Productos'
import Catalogo from './Catalogo'

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
  },
  {
    name: 'Catalogo',
    id: 'catalogo',
    component: Catalogo
  }
]
  
    export default adminRoutes;