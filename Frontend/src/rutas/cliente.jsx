import React from 'react'
import Datos from '../componentes/Registro'
import Sidebar from '../componentes/Sidebar'

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
    component: Topic
  },
  {
    name: 'Comentarios',
    id: 'functional-programming',
    component: Topic
  }
]

  export default clientRoutes;