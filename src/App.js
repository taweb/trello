import React from 'react'
import Board from './components/Board'
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  // Link,
  // useParams,
  // useRouteMatch
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/">
        <Board />
      </Route>
    </Router>
  )
}

export default App
