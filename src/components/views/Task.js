import React from 'react'
import InfoCard from '../cards/InfoCard.js'
import Message from '../shared/Message.js'
import { gql, withApollo } from 'react-apollo'
import styled from 'styled-components'
import { CheckCircle, XCircle } from 'react-feather'
import { Input, Textarea, Form, Label } from '../../styles/Forms'
import ContentWrapper from '../../styles/ContentWrapper'
import Button from '../shared/Button'

const Status = styled.div`
  background: ${props => props.theme.colors.Highlight};
  padding: 2%;
  text-align: center;
  font-size: 18px;
  border: 1px solid ${props => props.theme.colors.cardBorer};
  border-left: 1px solid ${props => props.theme.colors.cardBorer};
  border-right: 1px solid ${props => props.theme.colors.cardBorer};
`

const Flex = styled.div`
  display: flex;
  & > div {
    flex: 1;
    background: ${props => props.theme.colors.cardBackground};
    padding: 2%;
    text-align: center;
    margin: 5px;
    justify-content: center;
    & > span {
      margin-right: 10px;
    }
  }
`

const Messages = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  padding: 2%;
  border: 1px solid ${props => props.theme.colors.cardBorer};
`

class Task extends React.Component {
  state = {
    description: null,
    id: null,
    title: null,
    settings: false,
    completed: false
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
          completed: results.data.getTask.completed,
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
          this.props.history.goBack()
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
  handleApprove = () => {
    this.props.client.mutate({
      mutation: UPDATE_TASK_MUTATION,
      variables: {
        task: {
          id: this.props.match.params.taskid,
          completed: true
        }
      }
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
          settings={this.state.settings}
          handleUpdate={this.handleTaskUpdate}
          handleDelete={this.handleTaskDelete}
          handleStateUpdate={this.handleStateUpdate}
        />
        <Status>
          Status: {this.state.completed ? 'Task Completed' : 'In Progress'}
        </Status>
        <Flex>
          <div onClick={this.handleApprove}>
            <span>Approve Task</span>
            <CheckCircle />
          </div>
          <div>
            <span>Decline Task</span>
            <XCircle />
          </div>
        </Flex>
        <h1 />
        <Messages>
          <ContentWrapper>
            <h3>Conversation:</h3>
            <Textarea
              type="text"
              name="title"
              placeholder="Send message to task assignee"
            />
            <Button>Send</Button>
            <Message content={this.state.description} />
            <Message response content="Content for message" />
            <Message content="Content for message" />
            <Message response content="Content for message" />
            <Message alert rejected />
            <Message response content="Content for message" />
            <Message alert completed />
          </ContentWrapper>
        </Messages>
      </div>
    )
  }
}

const GET_TASK = gql`
  query getTask($id: ID!) {
    getTask(id: $id) {
      group {
        id
        title
      }
      description
      completed
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
