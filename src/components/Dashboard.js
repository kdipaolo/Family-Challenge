import React from 'react'
import ActionCard from './ActionCard'
import Notification from './Notification'

class Dashboard extends React.Component {
  render() {
    return (
      <div>

        <Notification />
        <ActionCard />

      </div>
    )
  }
}

export default Dashboard
