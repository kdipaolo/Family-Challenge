import React, { Component } from 'react'
import Routes from './Routes'
import './styles/theme/global'
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient
} from 'react-apollo'
import { AUTH_TOKEN } from './utils/constants'
const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj83e8far04ms0116qbqr8kox'
})

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }
      // get the authentication token from local storage if it exists
      if (localStorage.getItem(AUTH_TOKEN)) {
        req.options.headers.authorization = `Bearer ${localStorage.getItem(
          AUTH_TOKEN
        )}`
      }
      next()
    }
  }
])

const client = new ApolloClient({
  networkInterface
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>
    )
  }
}

export default App
