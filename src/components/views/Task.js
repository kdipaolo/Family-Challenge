import React from 'react'
import InfoCard from '../cards/InfoCard.js'
import Message from '../shared/Message.js'
import { gql, withApollo } from 'react-apollo'

class Task extends React.Component {
  state = {
    description: null,
    id: null,
    title: null
  }

  componentDidMount() {
    this.props.client
      .query({
        query: GET_TASK,
        variables: { id: this.props.match.params.taskid }
      })
      .then(results => {
        console.log(results)
        this.setState({
          description: results.data.getTask.description,
          title: results.data.getTask.title,
          id: results.data.getTask.id,
          createdAt: results.data.getTask.createdAt
        })
      })
  }
  handleTaskUpdate = description => {
    this.props.client
      .mutate({
        mutation: UPDATE_TASK_MUTATION,
        variables: {
          task: {
            id: this.props.match.params.taskid,
            description
          }
        }
      })
      .then(results => {
        this.setState({
          description: results.data.updateTask.changedTask.description
        })
      })
  }
  render() {
    return (
      <div>
        <InfoCard
          task
          title={this.state.title}
          handleUpdate={this.handleTaskUpdate}
          created={this.state.createdAt}
        />
        <Message content={this.state.description} />
        <Message response />
        <Message />
        <Message response />
        <Message alert rejected />
        <Message response />
        <Message alert completed />
      </div>
    )
  }
}

const GET_TASK = gql`
  query getTask($id: ID!) {
    getTask(id: $id) {
      group {
        id
        name
      }
      description
      title
      createdAt
      assignee {
        name
        id
      }
    }
  }
`

const UPDATE_TASK_MUTATION = gql`
  mutation updateTask($task: UpdateTaskInput!) {
    updateTask(input: $task) {
      changedTask {
        id
        description
      }
    }
  }
`
export default withApollo(Task)
