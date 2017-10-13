import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import Header from "./layout/Header";
import theme from "./styles/theme/index";
import Dashboard from "./components/views/Dashboard";
// import Login from './components/views/Login'
import CreateFamily from "./components/views/CreateFamily";
import Groups from "./components/views/Groups";
import Group from "./components/views/Group";
import CreateAccount from "./components/views/CreateAccount";
import Members from "./components/views/Members";
import Member from "./components/views/Member";
import Task from "./components/views/Task";
import Settings from "./components/views/Settings";
import styled, { ThemeProvider, css } from "styled-components";
import "./styles/theme/global";
import {
  ApolloProvider,
  createNetworkInterface,
  ApolloClient
} from "react-apollo";
import { BLOG_AUTH_TOKEN } from "./constants";

const networkInterface = createNetworkInterface({
  uri: "https://api.graph.cool/simple/v1/cj83e8far04ms0116qbqr8kox"
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      // get the authentication token from local storage if it exists
      if (localStorage.getItem(BLOG_AUTH_TOKEN)) {
        req.options.headers.authorization = `Bearer ${localStorage.getItem(
          BLOG_AUTH_TOKEN
        )}`;
      }
      next();
    }
  }
]);

const client = new ApolloClient({
  networkInterface
});

const ContentWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

const setBackgroundColor = props =>
  props.location.pathname === "/"
    ? css`
        background: linear-gradient(#fff 0%, #fbfbfb 100%);
      `
    : css`
        background: #f7f7f7;
      `;

const AppBackground = withRouter(
  styled.div`
    ${setBackgroundColor};
    min-height: 100vh;
    height: auto;
  `
);

class App extends Component {
  render() {
    return (
      <Router testing>
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
                  <Route path="/login" component={CreateAccount} />
                </ContentWrapper>
              </Switch>
            </AppBackground>
          </ThemeProvider>
        </ApolloProvider>
      </Router>
    );
  }
}

export default App;
