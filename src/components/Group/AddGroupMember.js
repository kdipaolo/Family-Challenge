import React from "react"
import Button from "../shared/Button"
import styled from "styled-components"
import { Input } from "../../styles/Forms"
import { gql, compose, graphql } from "react-apollo"
import { X } from "react-feather"
import { Label } from "../../styles/Forms"
import { withRouter } from "react-router-dom"
const Dropdown = styled.div`position: relative;`
const Results = styled.div`
  position: absolute;
  top: 60px;
  position: absolute;
  width: 100%;

  z-index: 999999999;
  border: 2px solid #c5c5c5;
`

const AddedMember = styled.a`
  background: gray;
  padding: 1%;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  margin: 2%;
  display: inline-block;
  align-items: center;
  justify-content: center;
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

class AddGroupMember extends React.Component {
  state = {
    members: [],
    search: null
  }
  addMembersToState = members => {
    console.log(members)
    this.setState({
      members
    })
  }
  handleUserSearch = e => {
    this.setState({
      search: e.target.value
    })
  }

  addMemberToState = member => {
    if (!this.state.members.includes(member)) {
      this.setState(state => ({
        members: [...state.members, member]
      }))
    } else {
      const index = this.state.members.indexOf(member)
      let newMembers = this.state.members
      newMembers.splice(index, 1)
      this.setState({
        members: newMembers
      })
    }
  }
  handleAddUserSubmit = async e => {
    e.preventDefault()
    this.state.members.map(async member => {
      await this.props.addMemberToGroup({
        variables: {
          groupId: this.props.match.params.groupid,
          memberId: member.id
        }
      })
      this.props.refetch()
    })
    this.props.handleOpenCloseModal(e)
  }
  render() {
    return (
      <div>
        <h2>Add New Members to Group</h2>
        <form onSubmit={this.handleAddUserSubmit}>
          <Dropdown>
            <Input
              name="title"
              value={this.state.search}
              onChange={this.handleUserSearch}
              type="text"
              autocomplete="new-password"
              placeholder="Group Members"
            />

            {this.state.members.length > 0 && (
              <div>
                <Label htmlFor="">Adding These Members to Group</Label>
                {this.state.members.map(member => (
                  <AddedMember onClick={() => this.addMemberToState(member)}>
                    <span>{member.name}</span>
                    <X />
                  </AddedMember>
                ))}
              </div>
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
                      <DropdownItem onClick={() => this.addMemberToState(user)}>
                        {user.name}
                      </DropdownItem>
                    )
                  })}
            </Results>
          </Dropdown>
          <Button type="submit">+ Add Members</Button>
        </form>
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
const ADD_MEMBER_TO_GROUP = gql`
  mutation addMemberToGroup($groupId: ID!, $memberId: ID!) {
    addToGroupMembers(groupsGroupId: $groupId, membersUserId: $memberId) {
      membersUser {
        name
      }
      groupsGroup {
        title
      }
    }
  }
`

export default withRouter(
  compose(
    graphql(GET_USERS, { name: "getUsers" }),
    graphql(ADD_MEMBER_TO_GROUP, { name: "addMemberToGroup" })
  )(AddGroupMember)
)

{
  /* 
         <SelectedMember
          onClick={() => this.addMemberToState(this.state.members)}
        >
          Task Assigned to: {this.state.members.name} -{" "}
          <Remove>Remove User From This Task</Remove>
        </SelectedMember> */
}
