import React from 'react'
import Member from '../cards/Member'
import Button from './Button'

class MemberList extends React.Component {
  render() {
    return (
      <div>
        <Member />
        <Button sticky onClick={this.handleStateUpdate}>
          + Add A Memeber
        </Button>
      </div>
    )
  }
}

export default MemberList
