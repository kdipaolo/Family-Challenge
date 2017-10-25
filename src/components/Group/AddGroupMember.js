import React from "react"
import MemberDropdown from "../Members/MemberDropdown"
import Button from "../shared/Button"
class AddGroupMember extends React.Component {
  state = {
    members: []
  }
  addMembersToState = members => {
    console.log(members)
    this.setState({
      members
    })
  }

  addMemberToState = member => {
    if (!this.state.members.includes(member)) {
      this.setState(state => ({
        members: [...state.members, member]
      }))
    } else {
      const index = this.state.members.indexOf(member)
      console.log(index)
      let newMembers = this.state.members
      newMembers.splice(index, 1)
      console.log("newMembers", newMembers)
      this.setState({
        members: newMembers
      })
    }
  }
  render() {
    return (
      <div>
        <h2>Add New Members to Group</h2>
        <MemberDropdown
          addMemberToState={this.addMemberToState}
          members={this.state.members}
        />
        <Button onClick={this.addMembersToGroup}>+ Add Members</Button>
      </div>
    )
  }
}

export default AddGroupMember
