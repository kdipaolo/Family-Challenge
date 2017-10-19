import React from "react"
import Message from "../shared/Message.js"
import { gql, graphql, compose } from "react-apollo"
import styled from "styled-components"
import { CheckCircle, XCircle } from "react-feather"
import { Input, Textarea, Form, Label } from "../../styles/Forms"
import ContentWrapper from "../../styles/ContentWrapper"
import Button from "../shared/Button"
import paperAirplane from "../../../public/images/paper-airplane.svg"
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
    assignedTo: null,
    edit: false,
    messages: [],
    newMessage: null
  }
  componentWillUpdate(nextProps) {
    if (
      nextProps.getTask.loading === false &&
      this.props.getTask.loading === true
    ) {
      const task = nextProps.getTask.Task
      this.populateTask(task)
    }
  }
  componentDidMount() {
    if (!this.props.getTask.loading) {
      const task = this.props.getTask.Task
      this.populateTask(task)
    }
  }
  populateTask(data) {
    this.setState({
      description: data.description,
      assignedTo: data.child.name,
      title: data.title,
      id: data.id,
      completed: data.completed,
      createdAt: data.createdAt,
      messages: data.messages
    })
  }

  handleTaskDelete = () => {
    var confirmation = confirm("are you sure?")
    if (confirmation) {
      this.props.deleteTask()
      this.props.history.goBack()
    } else {
      console.log("DENIED")
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
  handleNewMessageSubmit = e => {
    e.preventDefault()

    this.props.createMessage({
      comment: this.state.newMessage,
      task: this.props.match.params.taskid
    })
    this.setState({ newMessage: null })
    this.props.getTask.refetch()
  }
  handleNewMessageTextAreaChange = e => {
    this.setState({
      newMessage: e.target.value
    })
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <Info>
          <Image src={paperAirplane} />
          <Header>
            <EditIcon onClick={this.handleStateUpdate} />
            {this.state.edit ? (
              <div>
                <input
                  type="text"
                  name="title"
                  value={this.state.name}
                  onChange={this.handleStateUpdate}
                />
                <CheckCircle onClick={this.handleSubmit} />
              </div>
            ) : (
              this.state.title
            )}
          </Header>
          <DetailWrapper>
            <Detail>
              Assigned By: <Highlight>Mom</Highlight>
            </Detail>
            <Detail>
              Assigned To: <Highlight>{this.state.assignedTo}</Highlight>
            </Detail>
          </DetailWrapper>
          <Detail>
            Groups: <Highlight>Children</Highlight>
          </Detail>
        </Info>
        <Status>
          Status: {this.state.completed ? "Task Completed" : "In Progress"}
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
            <form onSubmit={this.handleNewMessageSubmit}>
              <Textarea
                type="text"
                name="title"
                value={this.state.newMessage}
                onChange={this.handleNewMessageTextAreaChange}
                placeholder="Send message to task assignee"
              />
              <Button type="submit">Send</Button>
            </form>
            <Message content={this.state.description} />
            {this.state.messages.map(message => (
              <Message
                response
                date={message.createdAt}
                content={message.comment}
              />
            ))}

            {/* <Message response content="Content for message" />
            <Message content="Content for message" />
            <Message response content="Content for message" />
            <Message alert rejected />
            <Message response content="Content for message" />
            <Message alert completed /> */}
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

const DELETE_TASK_MUTATION = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      title
    }
  }
`

const CREATE_MESSAGE_MUTATION = gql`
  mutation createNewMessage($comment: String!, $taskId: ID!) {
    createMessage(comment: $comment, taskId: $taskId) {
      id
      comment
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
    name: "getTask",
    options: props => ({ variables: { id: props.match.params.taskid } })
  }),
  graphql(UPDATE_TASK_MUTATION, {
    name: "updateTaskMutation",
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
  graphql(CREATE_MESSAGE_MUTATION, {
    name: "createMessageMutation",
    props: ({ ownProps, createMessageMutation }) => ({
      createMessage: values => {
        createMessageMutation({
          variables: {
            comment: values.comment,
            taskId: values.task
          }
        })
      }
    })
  }),
  graphql(DELETE_TASK_MUTATION, {
    name: "deleteTaskMutation",
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
