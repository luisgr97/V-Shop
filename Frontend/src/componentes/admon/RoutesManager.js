import Inventory from './Inventory'
import Registro from '../principal/Registro'


const adminRoutes = [

  {
    name: 'Inventario',
    id: 'inventory',
    component: Inventory,
    icon: "fa-layer-group",
    props: true
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