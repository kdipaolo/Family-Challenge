import React from 'react'
import InfoCard from '../cards/InfoCard.js'
import Message from '../shared/Message.js'

class Task extends React.Component {
  render() {
    return (
      <div>
        <InfoCard task />
        <Message />
        <Message response />
        <Message alert completed />
        <Message alert rejected />
      </div>
    )
  }
}

export default Task
