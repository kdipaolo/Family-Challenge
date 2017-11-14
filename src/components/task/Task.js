import React from "react"
import { gql, graphql, compose } from "react-apollo"
import TaskHeader from "./TaskHeader"
import TaskApproval from "./TaskApproval"
import TaskMessages from "./TaskMessages"
import { USER_ID } from "../../utils/constants"

const Task = props =>
  !props.getTask.loading &&
  !props.getUser.loading && (
    <div>
      <TaskHeader currentUser={props.getUser.User} {...props.getTask} />
      <TaskApproval currentUser={props.getUser.User} {...props.getTask} />
      <TaskMessages {...props.getTask} />
    </div>
  )

const GET_TASK = gql`
  query getTask($id: ID!) {
    Task(id: $id) {
      group {
        id
        title
      }
      child {
        name
      }
      description
      status
      title
      createdAt
      messages {
        comment
        id
        createdAt
        status
      }
      assigner {
        name
        id
      }
    }
  }
`

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
    options: props => ({ variables: { id: localStorage.getItem(USER_ID) } })
  }),
  graphql(GET_TASK, {
    name: "getTask",
    options: props => ({ variables: { id: props.match.params.taskid } })
  })
)(Task)
