import Inventory from './Inventory'
import Registro from '../principal/Registro'
import Discount from './Discount'

const adminRoutes = [

  {
    name: 'Inventario',
    id: 'inventory',
    component: Inventory,
    icon: "fa-layer-group",
    props: true
  },
  {
    name: 'Descuentos',
    id: 'discount',
    component: Discount,
    icon: "fa-percent",
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