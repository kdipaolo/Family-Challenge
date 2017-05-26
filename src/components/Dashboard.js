import React from 'react'
import ActionCard from './ActionCard'
import Button from './Button'
import Notification from './Notification'
import ArrowRight from 'react-icons/lib/ti/th-menu'

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
