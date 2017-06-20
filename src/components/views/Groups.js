import React from 'react'
import Group from '../cards/Group'
import ContentWrapper from '../../styles/ContentWrapper'
class Groups extends React.Component {
  render() {
    return (
      <ContentWrapper>
        <Group />
        <Group />
        <Group />
      </ContentWrapper>
    )
  }
}

export default Groups
