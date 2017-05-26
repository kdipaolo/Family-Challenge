import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './layout/Header'
import Footer from './layout/Footer'

import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Groups from './components/Groups'
import Group from './components/Group'
import Members from './components/Members'
import Member from './components/Member'
import Settings from './components/Settings'
import styled from 'styled-components'

const ContentWrapper = styled.div`
  max-width: 600px;
  margin: 3%;

`
// How would I go about passing props into router header?

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <ContentWrapper>
              <Route exact path="/" component={Login} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/groups" component={Groups} />
              <Route path="/group/:groupid" component={Group} />
              <Route path="/memebers" component={Members} />
              <Route path="/memeber/:memeberid" component={Member} />
              <Route path="/settings" component={Settings} />
            </ContentWrapper>
          </Switch>
          {/* <Footer /> */}
        </div>
      </Router>
    )
  }
}

export default App
