import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import OrgViewer from './OrgViewer'
import Welcome from './Welcome'

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/dao/:daoId">
            <OrgViewer />
          </Route>
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
