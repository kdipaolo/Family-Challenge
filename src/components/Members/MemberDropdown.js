import React from "react"
import styled from "styled-components"
import { Input } from "../../styles/Forms"
import { gql, compose, graphql } from "react-apollo"
import { X } from "react-feather"
import { Label } from "../../styles/Forms"
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
class MemberDropdown extends React.Component {
  state = {
    search: null,
    members: []
  }
  // componentDidMount() {
  //   this.setState(state => ({
  //     members: this.props.members
  //   }))
  // }
  // componentWillReceiveProps(nextProps) {
  // console.log("nextProps", nextProps.members)
  // console.log("nextState", nextState.members)
  // if (this.state.members !== nextProps.members) {
  // this.setState(state => ({
  //   members: nextProps.members
  // }))
  // }
  // if (nextState.member !== this.state.member && nextState.member) {
  //   this.props.addMemberToState(nextState.member)
  // }
  // }

  handleUserSearch = e => {
    this.setState({
      search: e.target.value
    })
  }

  render() {
    return (
      <Dropdown>
        <Input
          name="title"
          value={this.state.search}
          onChange={this.handleUserSearch}
          type="text"
          autocomplete="new-password"
          placeholder="Group Members"
        />

        {/* <SelectedMember
          onClick={() => this.props.addMemberToState(this.state.members)}
        >
          Task Assigned to: {this.state.members.name} -{" "}
          <Remove>Remove User From This Task</Remove>
        </SelectedMember> */}

        {this.props.members.length > 0 && (
          <div>
            <Label htmlFor="">Adding These Members to Group</Label>
            {this.props.members.map(member => (
              <AddedMember onClick={() => this.props.addMemberToState(member)}>
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
                  <DropdownItem
                    onClick={() => this.props.addMemberToState(user)}
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
