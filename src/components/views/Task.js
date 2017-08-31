import React from 'react'
import InfoCard from '../cards/InfoCard.js'
import Message from '../shared/Message.js'
import { gql, withApollo } from 'react-apollo'

class Task extends React.Component {
  state = {
    description: null,
    id: null,
    title: null,
    settings: false
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
  handleTaskUpdate = values => {
    this.props.client.mutate({
      mutation: UPDATE_TASK_MUTATION,
      variables: {
        task: {
          id: this.props.match.params.taskid,
          title: values.title
        }
      }
    })
  }
  handleTaskDelete = () => {
    var confirmation = confirm('are you sure?')
    if (confirmation) {
      this.props.client
        .mutate({
          mutation: DELETE_TASK_MUTATION,
          variables: {
            task: {
              id: this.props.match.params.taskid
            }
          }
        })
        .then(result => {
          // this.props.history.push('/groups')
        })
    } else {
      console.log('DENIED')
    }
  }
  handleStateUpdate = (e, textValue) => {
    if (textValue) {
      this.setState({
        [textValue]: !this.state[textValue]
      })
      return
    } else {
      const value = e.target.value
      const name = e.target.name

      if (value) {
        this.setState({
          [name]: value
        })
      } else {
        this.setState({
          [name]: !this.state[name]
        })
      }
    }
  }
  render() {
    return (
      <div>
        <InfoCard
          task
          title={this.state.title}
          handleUpdate={this.handleTaskUpdate}
          created={this.state.createdAt}
          settings={this.state.settings}
          handleUpdate={this.handleTaskUpdate}
          handleDelete={this.handleTaskDelete}
          handleStateUpdate={this.handleStateUpdate}
        />
        <Message content={this.state.description} />
        {/* <Message response />
        <Message />
        <Message response />
        <Message alert rejected />
        <Message response />
        <Message alert completed /> */}
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

const DELETE_TASK_MUTATION = gql`
  mutation deleteTask($task: DeleteTaskInput!) {
    deleteTask(input: $task) {
      changedTask {
        title
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
