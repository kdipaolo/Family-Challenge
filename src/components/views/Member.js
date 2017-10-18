import React from "react"
import Switcher from "../shared/Switcher"
import Task from "../cards/Task"
import ContentWrapper from "../../styles/ContentWrapper"
import { withRouter } from "react-router-dom"
import { gql, compose, graphql } from "react-apollo"
import {
  EditIcon,
  Info,
  MinusCircleIcon,
  Image,
  Header,
  Detail,
  DetailWrapper,
  Highlight
} from "../../styles/theme/infoCard"

class Member extends React.Component {
  state = {
    active: "Tasks",
    tasks: [],
    name: null,
    id: null
  }

  componentWillUpdate(nextProps) {
    if (
      nextProps.getUser.loading === false &&
      this.props.getUser.loading === true
    ) {
      const { name, id, tasks } = nextProps.getUser.User
      this.setState({
        id,
        name,
        tasks
      })
    }
  }
  handleSwitcherClick = e => {
    this.setState({
      active: e.target.dataset.item
    })
  }
  handleDeleteUser = () => {
    var confirmation = confirm("are you sure?")
    if (confirmation) {
      this.props.deleteTask()
      this.props.history.goBack()
    } else {
      console.log("DENIED")
    }
  }

  render() {
    return (
      <div>
        <Info>
          <MinusCircleIcon onClick={this.handleDeleteUser} />
          {this.state.name}
        </Info>
        <Switcher
          handleSwitcherClick={this.handleSwitcherClick}
          active={this.state.active}
          links={["Tasks", "Settings"]}
        />
        <ContentWrapper>
          {this.state.active === "Tasks" ? (
            <div>
              {this.state.tasks.map(task => <Task key={task.id} {...task} />)}
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
      tasks {
        title
        id
        completed
      }
    }
  }
`

const DELETE_USER_MUTATION = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      title
    }
  }
`

export default compose(
  graphql(GET_USER, {
    name: "getUser",
    options: props => ({ variables: { id: props.match.params.memberid } })
  }),

  graphql(DELETE_USER_MUTATION, {
    name: "deleteUserMutation",
    props: ({ ownProps, deleteUserMutation }) => ({
      deleteTask: values => {
        deleteUserMutation({
          variables: {
            id: ownProps.match.params.memberid
          }
        })
      }
    })
  })
)(withRouter(Member))
