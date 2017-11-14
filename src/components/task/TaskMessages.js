import React from "react"
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
import Message from "./Message.js"
import { Input, Textarea, Form, Label } from "../../styles/Forms"
import ContentWrapper from "../../styles/ContentWrapper"
import Button from "../shared/Button"
import styled from "styled-components"
import { withRouter } from "react-router-dom"
import { gql, graphql, compose } from "react-apollo"

const Messages = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  padding: 2%;
  border: 1px solid ${props => props.theme.colors.cardBorer};
`

class TaskMessages extends React.Component {
  state = {
    newMessage: null
  }
  handleNewMessageSubmit = async e => {
    e.preventDefault()
    await this.props.createMessage({
      variables: {
        comment: this.state.newMessage,
        taskId: this.props.match.params.taskid
      }
    })
    this.props.refetch()
    this.setState({ newMessage: "" })
  }
  handleNewMessageTextAreaChange = e => {
    this.setState({
      newMessage: e.target.value
    })
  }
  render() {
    return (
      <Messages>
        <ContentWrapper>
          <h3>Conversation:</h3>
          <form onSubmit={this.handleNewMessageSubmit}>
            <Textarea
              required
              type="text"
              name="title"
              value={this.state.newMessage}
              onChange={this.handleNewMessageTextAreaChange}
              placeholder="Send message to task assignee"
            />
            <Button type="submit">Send</Button>
          </form>
          <Message content={this.props.Task.description} />
          {this.props.Task.messages.map(message => (
            <Message
              response
              key={message.id}
              date={message.createdAt}
              content={message.comment}
              status={message.status}
            />
          ))}
        </ContentWrapper>
      </Messages>
    )
  }
}

{
  /* <Message response content="Content for message" />
          <Message content="Content for message" />
          <Message response content="Content for message" />
          <Message alert rejected />
          <Message response content="Content for message" />
          <Message alert completed /> */
}

const CREATE_MESSAGE_MUTATION = gql`
  mutation createNewMessage($comment: String!, $taskId: ID!) {
    createMessage(comment: $comment, taskId: $taskId) {
      id
      comment
    }
  }
`

export default withRouter(
  compose(
    graphql(CREATE_MESSAGE_MUTATION, {
      name: "createMessage"
    })
  )(TaskMessages)
)
