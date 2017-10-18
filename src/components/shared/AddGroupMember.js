import React from "react"
import MemberDropdown from "./MemberDropdown"
import Button from "./Button"
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
  addMembersToGroup = () => {}
  render() {
    return (
      <div>
        <h2>Add New Members to Group</h2>
        <MemberDropdown addMembersToState={this.addMembersToState} />
        <Button onClick={this.addMembersToGroup}>+ Add Members</Button>
      </div>
    )
  }
}

export default AddGroupMember
