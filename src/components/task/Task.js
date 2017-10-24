import React from "react"
import { gql, graphql, compose } from "react-apollo"
import TaskHeader from "./TaskHeader"
import TaskApproval from "./TaskApproval"
import TaskMessages from "./TaskMessages"

const Task = props =>
  !props.getTask.loading && (
    <div>
      <TaskHeader {...props.getTask} />
      <TaskApproval {...props.getTask} />
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
      completed
      title
      createdAt
      messages {
        comment
        id
        createdAt
      }
      assigner {
        name
        id
      }
    }
  }
`

export default compose(
  graphql(GET_TASK, {
    name: "getTask",
    options: props => ({ variables: { id: props.match.params.taskid } })
  })
)(Task)
