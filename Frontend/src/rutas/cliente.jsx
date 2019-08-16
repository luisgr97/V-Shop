import React from 'react'
import Datos from '../componentes/RegistroClient'


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
    name: 'React Router',
    id: 'data',
    component: Datos
  },
  {
    name: 'React.js',
    id: 'reactjs',
    component: Topic
  },
  {
    name: 'Functional Programming',
    id: 'functional-programming',
    component: Topic
  }
]

  export default clientRoutes;