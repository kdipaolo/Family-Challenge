import React from 'react'
import Button from '../shared/Button'
import Modal from '../shared/Modal'
import AddMember from './AddMember'
import MemberCard from './MemberCard'
import ContentWrapper from '../../styles/ContentWrapper'

class Members extends React.Component {
  render() {
    return (
      <ContentWrapper>
        {!this.props.user.loading &&
          this.props.user.User.members.map(user => {
            return <MemberCard key={user.id} user={user} />
          })}

        <Modal
          button={
            <Button secondary sticky>
              + Add a new member
            </Button>
          }
        >
          {({ handleOpenCloseModal }) => (
            <AddMember
              handleOpenCloseModal={handleOpenCloseModal}
              refetch={this.props.user.refetch}
            />
          )}
        </Modal>
      </ContentWrapper>
    )
  }
}

export default Members
