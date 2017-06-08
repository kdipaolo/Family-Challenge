import React from 'react'
import Member from './Member'
import Button from './Button'
import ActionSlide from './ActionSlide'
class Members extends React.Component {
  render() {
    return (
      <div>
        <h1>Members</h1>
        <Member /><Member /><Member />
      <Button secondary onClick={this.handleClick}>+ Add a new member</Button>
        <ActionSlide />

      </div>
    )
  }
}

export default Members
