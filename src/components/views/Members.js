import React from "react"
import Button from "../shared/Button"
import ActionSlide from "../shared/ActionSlide"
import Modal from "../shared/Modal"
import AddMember from "../shared/AddMember"
import Member from "../cards/Member"
import ContentWrapper from "../../styles/ContentWrapper"
import { gql, compose, graphql } from "react-apollo"

class Members extends React.Component {
  render() {
    return (
      <ContentWrapper>
        {!this.props.getUsers.loading &&
          this.props.getUsers.allUsers.map(user => {
            return <Member user={user} />
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
              fetchMembers={this.props.getUsers.refetch}
              handleOpenCloseModal={handleOpenCloseModal}
            />
          )}
        </Modal>
      </ContentWrapper>
    )
  }
}

const GET_USERS = gql`
  query getUsers {
    allUsers {
      name
      id
    }
  }
`

const ADD_MEMBER = gql`
  query getUsers {
    allUsers {
      name
      id
    }
  }
`
export default compose(
  graphql(GET_USERS, { name: "getUsers" }),
  graphql(ADD_MEMBER, { name: "addMember" })
)(Members)
