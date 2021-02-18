import React from 'react'
import {Switch, Route,Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import AddTutorial from "./Components/AddTutorial"
import Tutorial from "./Components/Tutorial"
import TutorialList from "./Components/TutorialList"

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dartk bg dart">
        <a href="/tutorial" className="navbar-brand">
          Hozzi
        </a>
        <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorial"} className="nav-link">
                Tutorial
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path = {["/", "/tutorial"]} component={TutorialList} />
          <Route exact path = "/add" component={AddTutorial} />
          <Route path = "/tutorial/:id" component={Tutorial} />
        </Switch>
      </div>
    </div>
  )
}

export default App;
