import React from "react"
import Button from "../shared/Button"
import styled from "styled-components"
import { Input, Textarea, Form, Label } from "../../styles/Forms"
import { gql, compose, graphql } from "react-apollo"
import { SingleDatePicker } from "react-dates"
import "react-dates/lib/css/_datepicker.css"
import { X } from "react-feather"
import { withRouter } from "react-router-dom"
import { USER_ID } from "../../utils/constants"

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

const StyledDatePicker = styled.div`
  .SingleDatePicker {
    width: 100% !important;
  }
`

const Dropdown = styled.div`position: relative;`
const Results = styled.div`
  position: absolute;
  top: 60px;
  position: absolute;
  width: 100%;

  z-index: 999999999;
  border: 2px solid #c5c5c5;
`

const DropdownItem = styled.a`
  padding: 3%;
  width: auto;
  background: #efefef;
  display: block;
  background: #efefef;
  border-bottom: 1px solid gray;
  &:hover {
    background: #929090;
    cursor: pointer;
  }
`

const AddedMember = styled.a`
  background: #ececec;
  padding: 2%;
  border: 1px solid #71a45a;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  margin: 2%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const AddNewMember = styled.a`display: block;`

// const StyledDatePicker = styled(SingleDatePicker)`
//     width: 100%!important;
// `

class AddGroup extends React.Component {
  state = {
    title: "",
    dueDate: "",
    description: "",
    search: null,
    members: []
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

  handleNewGroup = async () => {
    const newGroup = {
      variables: {
        title: this.state.title,
        dueDate: this.state.dueDate,
        familyId: this.props.familyId,
        memberIds: this.state.members.map(member => member.id),
        parentId: localStorage.getItem(USER_ID)
      }
    }

    const response = await this.props.addGroup(newGroup)
    console.log(response)
    const id = response.data.createGroup.id
    this.props.history.push(`/group/${id}`)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.handleNewGroup()
  }
  handleDatePickerChange = date => {
    this.setState({
      dueDate: date
    })
  }
  addRemoveUserToMemberState = user => {
    const someting = this.state.members.find(member => member.id === user.id)
    if (someting) {
      const index = this.state.members.indexOf(someting)
      let newMembers = this.state.members
      newMembers.splice(index, 1)
      this.setState({
        members: newMembers,
        search: ""
      })
    } else {
      this.setState({
        members: [user, ...this.state.members],
        search: ""
      })
    }
  }
  closeMenu = e => {
    this.props.handleClose(e, "openMenu")
  }
  render() {
    const { open, type, handleClose, handleAdd } = this.props
    return (
      <div>
        <Text>+ Add a New {type}</Text>
        <Form onSubmit={this.handleSubmit}>
          <Input
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            type="text"
            placeholder="Group Name"
          />

          <StyledDatePicker>
            <SingleDatePicker
              date={this.state.dueDate}
              onDateChange={this.handleDatePickerChange}
              focused={this.state.focused}
              onFocusChange={({ focused }) => this.setState({ focused })}
            />
          </StyledDatePicker>
          <Label htmlFor="">{type} Description</Label>
          <Textarea
            name="description"
            value={this.state.description}
            type="text"
            onChange={this.handleChange}
            placeholder=""
          />
          <AddNewMember href="#">Add a new member to the family.</AddNewMember>
          {this.state.members.length > 0 && (
            <div>
              <Label htmlFor="">
                Adding These Members to {this.state.title} Group
              </Label>
              {this.state.members.map(member => (
                <AddedMember
                  onClick={() => this.addRemoveUserToMemberState(member)}
                >
                  <span>{member.name}</span>
                  <X />
                </AddedMember>
              ))}
            </div>
          )}

          <Dropdown>
            <Input
              name="title"
              value={this.state.search}
              onChange={this.handleUserSearch}
              type="text"
              autocomplete="new-password"
              placeholder="Group Members"
            />

            <Results>
              {!this.props.getUsers.loading &&
                this.props.getUsers.allUsers
                  .filter(
                    user =>
                      this.state.search &&
                      user.name.includes(this.state.search) &&
                      !this.state.members.find(member => member.id === user.id)
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
            <Button type="submit">+ Add {type}</Button>
            {/* <Button onClick={this.closeMenu} name="openMenu">
              x Close
            </Button> */}
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
const ADD_GROUP = gql`
  mutation newGroup(
    $familyId: ID!
    $parentId: ID!
    $dueDate: DateTime!
    $title: String!
    $memberIds: [ID!]
  ) {
    createGroup(
      familyId: $familyId
      parentId: $parentId
      dueDate: $dueDate
      title: $title
      membersIds: $memberIds
    ) {
      title
      id
    }
  }
`

export default withRouter(
  compose(
    graphql(GET_USERS, { name: "getUsers" }),
    graphql(ADD_GROUP, { name: "addGroup" })
  )(AddGroup)
)
