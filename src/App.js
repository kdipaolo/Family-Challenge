import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './layout/Header'
import Footer from './layout/Footer'

import Dashboard from './Dashboard'
import Login from './Login'
import Groups from './Groups'
import Group from './Group'
import Members from './Members'
import Member from './Member'
import Settings from './Settings'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/groups" component={Groups} />
            <Route path="/group/:groupid" component={Group} />
            <Route exact path="/memebers" component={Members} />
            <Route path="/memeber/:memeberid" component={Member} />
            <Route exact path="/settings" component={Settings} />

          </div>
        </Router>
        <Footer />
      </div>
    )
  }
}

export default App
