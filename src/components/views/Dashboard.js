import React from 'react'
import Action from '../cards/Action'
import Notification from './Notification'
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
