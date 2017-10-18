import React from "react"
import Button from "./Button"
import styled from "styled-components"
import { Input, Textarea, Form, Label } from "../../styles/Forms"
import { gql, compose, graphql } from "react-apollo"

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

const Dropdown = styled.div`position: relative;`
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
    title: "",
    member: null,
    description: "",
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

  handleSubmit = e => {
    const { title, description, member, group } = this.state

    e.preventDefault()
    this.props.addTask({
      variables: {
        description,
        title,
        completed: false,
        needsReviewed: true,
        groupId: this.props.groupId,
        childId: member.id
      }
    })
    this.props.handleOpenCloseModal(e)
  }
  handleDatePickerChange = date => {
    this.setState({
      dueDate: date
    })
  }
  closeMenu = e => {
    this.props.handleClose(e, "openMenu")
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
                Task Assigned to: {this.state.member.name} -{" "}
                <Remove>Remove User From This Task</Remove>
              </SelectedMember>
            )}

            <Results>
              {!this.props.getUsers.loading &&
                this.props.getUsers.allUsers
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

const GET_USERS = gql`
  query getUsers {
    allUsers {
      name
      id
    }
  }
`
const NEW_TASK = gql`
  mutation newTask(
    $description: String!
    $title: String!
    $completed: Boolean!
    $needsReviewed: Boolean!
    $groupId: ID
    $childId: ID
  ) {
    createTask(
      description: $description
      title: $title
      completed: $completed
      needsReviewed: $needsReviewed
      groupId: $groupId
      childId: $childId
    ) {
      title
      id
    }
  }
`

export default compose(
  graphql(GET_USERS, { name: "getUsers" }),
  graphql(NEW_TASK, { name: "addTask" })
)(AddTask)
