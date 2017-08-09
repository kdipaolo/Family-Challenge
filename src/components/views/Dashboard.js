import React from 'react'
import Action from '../cards/Action'
import Notification from '../shared/Notification'
import ContentWrapper from '../../styles/ContentWrapper'
class Dashboard extends React.Component {
  render() {
    return (
      <ContentWrapper>
        <Notification />
        <Action />
      </ContentWrapper>
    )
  }
}

export default Dashboard
