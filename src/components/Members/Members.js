import React from "react"
import Button from "../shared/Button"
import Modal from "../shared/Modal"
import AddMember from "./AddMember"
import MemberCard from "./MemberCard"
import ContentWrapper from "../../styles/ContentWrapper"
import { gql, compose, graphql } from "react-apollo"

class Members extends React.Component {
  render() {
    return (
      <ContentWrapper>
        {!this.props.getUsers.loading &&
          this.props.getUsers.allUsers.map(user => {
            return <MemberCard user={user} />
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
  query getUsers($id: ID!) {
    allUsers(filter: { family: { id: $id } }) {
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

const GET_GROUPS = gql`
  query GetGroups($id: ID!) {
    allGroups(orderBy: createdAt_DESC, filter: { family: { id: $id } }) {
      title
      id
      dueDate
      createdAt
      tasks {
        id
        completed
        description
        title
      }
    }
  }
`

export default compose(
  graphql(GET_USERS, {
    name: "getUsers",
    options: props => ({ variables: { id: "cj8vx5df81tp30121ya5wk42s" } })
  }),
  graphql(ADD_MEMBER, { name: "addMember" })
)(Members)
