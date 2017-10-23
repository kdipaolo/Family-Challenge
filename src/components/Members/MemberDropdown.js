import React from "react"
import styled from "styled-components"
import { Input } from "../../styles/Forms"
import { gql, compose, graphql } from "react-apollo"
import { X } from "react-feather"

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
class MemberDropdown extends React.Component {
  state = {
    search: null,
    members: []
  }

  handleUserSearch = e => {
    this.setState({
      search: e.target.value
    })
  }
  addRemoveUserToMemberState = user => {
    console.log(user)
    const someting = this.state.members.find(member => member.id === user.id)
    if (someting) {
      const index = this.state.members.indexOf(someting)
      let newMembers = this.state.members
      newMembers.splice(index, 1)
      this.setState({
        members: newMembers
      })
    } else {
      this.setState({
        members: [user, ...this.state.members]
      })
    }
  }
  render() {
    return (
      <Dropdown>
        {this.state.members.map(member => {
          return (
            <AddedMember
              onClick={() => this.addRemoveUserToMemberState(member)}
            >
              {member.name} <X />
            </AddedMember>
          )
        })}
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

export default compose(graphql(GET_USERS, { name: "getUsers" }))(MemberDropdown)
