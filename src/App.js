import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './Home'
import Login from './Login'
import Header from './layout/Header'
import Footer from './layout/Footer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/home" component={Home} />
          </div>
        </Router>
        <Footer />
      </div>
    )
  }
}

export default App
