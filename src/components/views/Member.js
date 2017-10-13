import React from "react"
import InfoCard from "../cards/InfoCard"
import Switcher from "../shared/Switcher"
import Task from "../cards/Task"
import ContentWrapper from "../../styles/ContentWrapper"
import { withRouter } from "react-router-dom"
import { gql, compose, graphql } from "react-apollo"

class Member extends React.Component {
  state = {
    active: "Tasks",
    user: null,
    name: null,
    id: null
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      id: newProps.getUser.User.id,
      name: newProps.getUser.User.name
    })
  }
  handleSwitcherClick = e => {
    this.setState({
      active: e.target.dataset.item
    })
  }

  render() {
    return (
      <div>
        <InfoCard member groupId={this.state.id} name={this.state.name} />

        <Switcher
          handleSwitcherClick={this.handleSwitcherClick}
          active={this.state.active}
          links={["Tasks", "Settings"]}
        />
        <ContentWrapper>
          {this.state.active === "Tasks" ? (
            <div>
              <Task />
              <Task />
              <Task />
              <Task />
              <Task />
            </div>
          ) : (
            <div>
              <h1>Settings</h1>
            </div>
          )}
        </ContentWrapper>
      </div>
    )
  }
}

const GET_USER = gql`
  query getAUser($id: ID!) {
    User(id: $id) {
      name
      id
    }
  }
`

export default compose(
  graphql(GET_USER, {
    name: "getUser",
    options: props => ({ variables: { id: props.match.params.memberid } })
  })
)(withRouter(Member))
