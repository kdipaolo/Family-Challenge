import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom"
import styled, { ThemeProvider, css } from "styled-components"
import Header from "./layout/Header"
import theme from "./styles/theme/index"
import Dashboard from "./components/views/Dashboard"
import Groups from "./components/Group/Groups"
import Group from "./components/Group/Group"
import CreateAccount from "./components/views/CreateAccount"
import Members from "./components/Members/Members"
import Member from "./components/Members/Member"
import Task from "./components/task/Task"
import Settings from "./components/views/Settings"
import requireAuth from "./utils/requireAuth"
import requireNonAuth from "./utils/requireNonAuth"
import { graphql, gql, compose } from "react-apollo"
import { USER_ID } from "./utils/constants"

const ContentWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`

const setBackgroundColor = props =>
  props.location.pathname === "/"
    ? css`
        background: linear-gradient(#fff 0%, #fbfbfb 100%);
      `
    : css`
        background: #f7f7f7;
      `

const AppBackground = withRouter(
  styled.div`
    ${setBackgroundColor};
    min-height: 100vh;
    height: auto;
  `
)

class Routes extends React.Component {
  render() {
    return (
      <Router testing>
        <ThemeProvider theme={theme}>
          <AppBackground>
            {localStorage.getItem(USER_ID) && (
              <Header getUser={this.props.getUser} />
            )}
            <Switch>
              <ContentWrapper>
                <Route exact path="/" component={CreateAccount} />
                <Route path="/dashboard" component={Dashboard} />
                <Route
                  path="/groups"
                  component={() => <Groups user={this.props.getUser.User} />}
                />
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
      </Router>
    )
  }
}

const GET_USER = gql`
  query getUser($id: ID!) {
    User(id: $id) {
      name
      role {
        name
      }
      familyMember {
        name
        id
      }
    }
  }
`

export default compose(
  graphql(GET_USER, {
    name: "getUser",

    options: props => ({
      skip: !localStorage.getItem(USER_ID),
      variables: { id: localStorage.getItem(USER_ID) }
    })
  })
)(Routes)
