import React from 'react'
import MemberCard from './MemberCard'

class MemberList extends React.Component {
  render() {
    return (
      <div>
        {this.props.members.map(user => (
          <MemberCard key={user.id} user={user} />
        ))}
      </div>
    )
  }
}

export default MemberList
