import React from "react"
import MemberCard from "./MemberCard"
import Button from "../shared/Button"

class MemberList extends React.Component {
  render() {
    return (
      <div>
        {this.props.members.map(user => (
          <MemberCard key={user.id} user={user} />
        ))}

        <Button sticky onClick={this.handleStateUpdate}>
          + Add A Memeber
        </Button>
      </div>
    )
  }
}

export default MemberList
