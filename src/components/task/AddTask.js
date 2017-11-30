import React from 'react'
import Button from '../shared/Button'
import styled from 'styled-components'
import { Input, Textarea, Form, Label } from '../../styles/Forms'
import { gql, compose, graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { USER_ID } from '../../constants'
const Flex = styled.div`
  display: flex;
  & > div {
    flex: 1;
  }
`

const Text = styled.p`
  color: ${props => props.theme.colors.secondary};
  text-align: center;
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
  padding-bottom: 3%;
  display: inline-block;
  margin: auto;
`

const SelectedMember = styled.h4`
  border: 1px solid ${props => props.theme.colors.secondary};
  padding: 3%;
  color: ${props => props.theme.colors.secondary};
  border-radius: 5px;
  cursor: pointer;
`

const Remove = styled.span`
  color: red;
  cursor: pointer;
  font-size: 12px;
`

const Dropdown = styled.div`
  position: relative;
`
const Results = styled.div`
  position: absolute;
  top: 60px;
  width: 100%;
  overflow: hidden;
`

const DropdownItem = styled.a`
  width: 100%;
  background: #e8e8e8;
  border-bottom: 1px solid #b7b7b7;
  z-index: 999999999;
  padding: 3%;
  display: block;
  cursor: pointer;
  &:hover {
    background: #d2d2d2;
  }
`
class AddTask extends React.Component {
  state = {
    title: '',
    member: null,
    description: '',
    search: null,
    member: null
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleUserSearch = e => {
    this.setState({
      search: e.target.value
    })
  }
  addRemoveUserToMemberState = user => {
    if (!this.state.member) {
      this.setState({
        member: user,
        search: null
      })
    } else {
      this.setState({
        member: null,
        search: null
      })
    }
  }

  handleSubmit = async e => {
    const { title, description, member, group } = this.state
    e.preventDefault()
    const newTask = await this.props.createTask({
      variables: {
        description,
        title,
        status: 'Assigned',
        needsReviewed: true,
        groupId: this.props.match.params.groupid,
        assigneeId: member.id,
        completed: false
      }
    })

    const newMemberNotification = await this.props.createNotification({
      variables: {
        seen: false,
        taskId: newTask.data.createTask.id,
        userId: member.id,
        content: `You have been assigned to complete ${
          newTask.data.createTask.title
        }`
      }
    })

    this.props.refetch()
    this.props.handleOpenCloseModal(e)
  }
  handleDatePickerChange = date => {
    this.setState({
      dueDate: date
    })
  }
  closeMenu = e => {
    this.props.handleClose(e, 'openMenu')
  }
  render() {
    const { handleClose, handleAdd } = this.props
    return (
      <div>
        <Text>+ Add a New</Text>
        <Form onSubmit={this.handleSubmit}>
          <Input
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            type="text"
            placeholder="Name"
          />

          <Label htmlFor="">Description</Label>
          <Textarea
            name="description"
            value={this.state.description}
            type="text"
            onChange={this.handleChange}
            placeholder=""
          />
          <Dropdown>
            {!this.state.member ? (
              <Input
                name="title"
                value={this.state.search}
                onChange={this.handleUserSearch}
                type="text"
                autocomplete="new-password"
                placeholder="Group Members"
              />
            ) : (
              <SelectedMember onClick={this.addRemoveUserToMemberState}>
                Task Assigned to: {this.state.member.name} -{' '}
                <Remove>Remove User From This Task</Remove>
              </SelectedMember>
            )}

            <Results>
              {this.props.user.User.members
                .filter(
                  user =>
                    this.state.search && user.name.includes(this.state.search)
                )
                .map(user => {
                  return (
                    <DropdownItem
                      onClick={() => this.addRemoveUserToMemberState(user)}
                    >
                      {user.name}
                    </DropdownItem>
                  )
                })}
            </Results>
          </Dropdown>

          <Flex>
            <Button type="submit">+ Add Task</Button>
          </Flex>
        </Form>
      </div>
    )
  }
}

const CREATE_TASK_MUTATION = gql`
  mutation newTask(
    $description: String!
    $title: String!
    $needsReviewed: Boolean!
    $completed: Boolean!
    $groupId: ID
    $assigneeId: ID
    $status: String!
  ) {
    createTask(
      description: $description
      title: $title
      status: $status
      needsReviewed: $needsReviewed
      completed: $completed
      groupId: $groupId
      assigneeId: $assigneeId
    ) {
      title
      id
    }
  }
`

const CREATE_NOTIFICATION = gql`
  mutation newNotification(
    $seen: Boolean!
    $taskId: ID!
    $userId: ID!
    $content: String!
  ) {
    createNotification(
      seen: $seen
      taskId: $taskId
      userId: $userId
      content: $content
    ) {
      id
      task {
        id
      }
      user {
        id
      }
    }
  }
`

export default withRouter(
  compose(
    graphql(CREATE_TASK_MUTATION, { name: 'createTask' }),
    graphql(CREATE_NOTIFICATION, { name: 'createNotification' })
  )(AddTask)
)
