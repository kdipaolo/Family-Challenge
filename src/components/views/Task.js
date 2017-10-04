import React from 'react'
import InfoCard from '../cards/InfoCard.js'
import Message from '../shared/Message.js'
import { gql, graphql, compose } from 'react-apollo'
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
    completed: false,
    edit: false
  }
  componentWillUpdate(nextProps) {
    if (
      nextProps.getTask.loading === false &&
      this.props.getTask.loading === true
    ) {
      const task = nextProps.getTask.Task
      this.setState({
        description: task.description,
        title: task.title,
        id: task.id,
        completed: task.completed,
        createdAt: task.createdAt
      })
    }
  }

  handleTaskDelete = () => {
    var confirmation = confirm('are you sure?')
    if (confirmation) {
      this.props.deleteTask()
      this.props.history.goBack()
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
          created={this.state.createdAt}
          settings={this.state.settings}
          handleUpdate={this.props.updateTask}
          handleDelete={this.handleTaskDelete}
          handleStateUpdate={this.handleStateUpdate}
          edit={this.state.edit}
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
    Task(id: $id) {
      group {
        id
        title
      }
      description
      completed
      title
      createdAt
      messages {
        comment
        id
      }
      assigner {
        name
        id
      }
    }
  }
`

const DELETE_TASK_MUTATION = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      title
    }
  }
`

const UPDATE_TASK_MUTATION = gql`
  mutation updateTask($id: ID!, $title: String!) {
    updateTask(id: $id, title: $title) {
      id
      description
    }
  }
`

export default compose(
  graphql(GET_TASK, {
    name: 'getTask',
    options: props => ({ variables: { id: props.match.params.taskid } })
  }),
  graphql(UPDATE_TASK_MUTATION, {
    name: 'updateTaskMutation',
    props: ({ ownProps, updateTaskMutation }) => ({
      updateTask: values => {
        updateTaskMutation({
          variables: {
            id: ownProps.match.params.taskid,
            title: values.title
          }
        })
      }
    })
  }),
  graphql(DELETE_TASK_MUTATION, {
    name: 'deleteTaskMutation',
    props: ({ ownProps, deleteTaskMutation }) => ({
      deleteTask: values => {
        deleteTaskMutation({
          variables: {
            id: ownProps.match.params.taskid
          }
        })
      }
    })
  })
)(Task)
