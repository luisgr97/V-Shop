import React from 'react'
import Datos from '../componentes/Registro'
import Sidebar from '../componentes/Sidebar'
import Comments from '../componentes/Comments'
import Purchase from '../componentes/ClientPurchase'

function Topic ({ match }) {

    return (
      <div>
        <h2>Eucaritia</h2>
        <hr />
      </div>
    )
  }
  
  const clientRoutes = [
  {
    name: 'Actualizar datos',
    id: 'data',
    component: Datos
  },
  {
    name: 'Mis compras',
    id: 'reactjs',
    component: Purchase
  },
  {
    name: 'Comentarios',
    id: 'comentarios',
    component: Comments
  }
]

  export default clientRoutes;