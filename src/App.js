import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from 'react-router-dom'
import Header from './layout/Header'
import theme from './styles/theme/index'
import Dashboard from './components/views/Dashboard'
// import Login from './components/views/Login'
import CreateFamily from './components/views/CreateFamily'
import Groups from './components/views/Groups'
import Group from './components/views/Group'
import Members from './components/views/Members'
import Member from './components/views/Member'
import Task from './components/views/Task'
import Settings from './components/views/Settings'
import styled, { ThemeProvider, css } from 'styled-components'
import './styles/theme/global'
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient
} from 'react-apollo'
import { BLOG_AUTH_TOKEN } from './constants'

const networkInterface = createNetworkInterface({
  uri: 'https://us-west-2.api.scaphold.io/graphql/familychallenge'
})

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }
      // get the authentication token from local storage if it exists
      if (localStorage.getItem(BLOG_AUTH_TOKEN)) {
        req.options.headers.authorization = `Bearer ${localStorage.getItem(
          BLOG_AUTH_TOKEN
        )}`
      }
      next()
    }
  }
])

const client = new ApolloClient({
  networkInterface
})

const ContentWrapper = styled.div`
  max-width: 600px;
  margin: auto;
`

const AppBackground = withRouter(
  styled.div`
    ${props =>
      props.location.pathname === '/'
        ? css`background: linear-gradient(#5A6ED0 0%, #4053AE 100%);`
        : css`background: #fff;`} background-repeat: no-repeat;
    height: 100vh;
  `
)

class App extends Component {
  render() {
    return (
      <Router>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <AppBackground>
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
            </AppBackground>
          </ThemeProvider>
        </ApolloProvider>
      </Router>
    )
  }
}

export default App
