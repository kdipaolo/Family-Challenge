import React from 'react'
import Member from '../cards/Member'
import Button from '../shared/Button'
import ActionSlide from '../shared/ActionSlide'
import ContentWrapper from '../../styles/ContentWrapper'
class Members extends React.Component {
  render() {
    return (
      <ContentWrapper>
        <Member />
        <Member />
        <Member />
        <Button secondary sticky onClick={this.handleClick}>
          + Add a new member
        </Button>
        <ActionSlide />
      </ContentWrapper>
    )
  }
}

export default Members
