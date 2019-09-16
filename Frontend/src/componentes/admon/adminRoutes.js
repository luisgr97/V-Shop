import Categorias from './Categorias'
import Productos from './Productos'
import Catalogo from './Catalogo'
import Managers from './Managers'
import Registro from '../principal/Registro'

const adminRoutes = [

  {
    name: 'Productos',
    id: 'productos',
    component: Productos,
    icon: "fa-shopping-bag",
    props: false
  },
  {
    name: 'Categorias',
    id: 'categorias',
    component: Categorias,
    icon: "fa-tags",
    props: false
  },
  {
    name: 'Catalogo',
    id: 'catalogo',
    component: Catalogo,
    icon: "fa-store",
    props: false
  },
  {
    name: 'Gerentes',
    id: 'managers',
    component: Managers,
    icon: "fa-user-tie",
    props: false
  },
  {
    name: 'Mis datos',
    id: 'data',
    component: Registro,
    icon: "fa-user-edit",
    props: true
  }
]
  
    export default adminRoutes;