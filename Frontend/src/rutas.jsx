import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

const topics = [
  {
    name: 'React Router',
    id: 'react-router',
    description: 'Declarative, component based routing for React'
  },
  {
    name: 'React.js',
    id: 'reactjs',
    description: 'A JavaScript library for building user interfaces'
  },
  {
    name: 'Functional Programming',
    id: 'functional-programming',
    description: 'In computer science, functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.'
  }
]


function Topic ({ match }) {

  return (
    <div>
      <h2>Eucaritia</h2>
      <hr />
    </div>
  )
}

function Topics ({ match }) {
  return (
    <div>
      <h1>Topics</h1>
      <ul>
        {topics.map(({ name, id }) => (
          <li key={id}>
            <Link to={`/topics/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>

      <hr />
      
      <Route path={`/topics/:topicId`} component={Topic}/>
    </div>
  )
}

function Home ({ match }) {
  console.log(match.url)
  return (
    <h1>
      Home.
    </h1>
  )
}

const Paquete = () =>{
return(
    <h1>Hola mundo</h1>
)
    
}
class App extends Component {
  render() {
    return (
      <Router>
        <div style={{width: 1000, margin: '0 auto'}}>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/topics'>Topics</Link></li>
          </ul>

          <hr />

          <Route exact path='/' component={Home} />
          <Route path='/topics' render={() => (
             <Topics />
          )}   />
        </div>
      </Router>
    )
  }
}

export default App