import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './layout/Header'
import theme from './styles/theme/index'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import CreateFamily from './components/CreateFamily'
import Groups from './components/Groups'
import Group from './components/Group'
import Members from './components/Members'
import Member from './components/Member'
import Settings from './components/Settings'
import styled, { ThemeProvider } from 'styled-components'
import './styles/theme/global'

const ContentWrapper = styled.div`
  max-width: 600px;
  margin: 3%;
`

class App extends Component {
  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <div>
            <Header />
            <Switch>
              <ContentWrapper>
                {/* <Route exact path="/" component={Login} /> */}
                <Route exact path="/" component={CreateFamily} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/groups" component={Groups} />
                <Route path="/group/:groupid" component={Group} />
                <Route path="/memebers" component={Members} />
                <Route path="/memeber/:memeberid" component={Member} />
                <Route path="/settings" component={Settings} />
              </ContentWrapper>
            </Switch>
          </div>
        </ThemeProvider>

      </Router>
    )
  }
}

export default App
