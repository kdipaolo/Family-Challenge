import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './layout/Header'
import theme from './styles/theme/index'
import Dashboard from './components/views/Dashboard'
import Login from './components/views/Login'
import CreateFamily from './components/views/CreateFamily'
import Groups from './components/views/Groups'
import Group from './components/views/Group'
import Members from './components/views/Members'
import Member from './components/views/Member'
import Task from './components/views/Task'
import Settings from './components/views/Settings'
import styled, { ThemeProvider } from 'styled-components'
import './styles/theme/global'

const ContentWrapper = styled.div`
  max-width: 600px;
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
                <Route path="/members" component={Members} />
                <Route path="/member/:memberid" component={Member} />
                <Route path="/task/:taskid" component={Task} />
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
