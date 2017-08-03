import React from 'react'
import InfoCard from '../cards/InfoCard.js'
import Message from '../shared/Message.js'
import { graphql, gql, withApollo } from 'react-apollo'

class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      description: null,
      id: null
    }
    this.handleTaskUpdate = this.handleTaskUpdate.bind(this)
  }
  componentDidMount() {
    this.props.client
      .query({
        query: GET_TASK,
        variables: { id: this.props.location.pathname.split('task/')[1] }
      })
      .then(results => {
        console.log(results)
        this.setState({
          description: results.data.getTask.description,
          id: results.data.getTask.id
        })
      })
  }
  handleTaskUpdate(description) {
    this.props.client
      .mutate({
        mutation: UPDATE_TASK_MUTATION,
        variables: {
          task: {
            id: this.props.location.pathname.split('task/')[1],
            description
          }
        }
      })
      .then(results => {
        console.log(results)
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
          title={this.state.description}
          handleTaskUpdate={this.handleTaskUpdate}
        />
        <Message />
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
