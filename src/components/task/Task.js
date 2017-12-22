import React from 'react'
import { gql, graphql, compose } from 'react-apollo'
import TaskHeader from './TaskHeader'
import TaskApproval from './TaskApproval'
import TaskMessages from './TaskMessages'
import { withRouter } from 'react-router-dom'
const Task = props =>
  !props.getTask.loading && (
    <div>
      <TaskHeader currentUser={props.user} {...props.getTask} />
      <TaskApproval currentUser={props.user} {...props.getTask} />
      <TaskMessages {...props.getTask} />
    </div>
  )

const GET_TASK = gql`
  query getTask($id: ID!) {
    Task(id: $id) {
      group {
        id
        title
        reward
        dueDate
        groupOwner {
          id
          name
        }
      }
      assignee {
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
    }
  }
`

export default withRouter(
  compose(
    graphql(GET_TASK, {
      name: 'getTask',
      options: props => ({ variables: { id: props.match.params.taskid } })
    })
  )(Task)
)
