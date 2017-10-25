import React from "react"
import GroupCard from "./GroupCard"
import ContentWrapper from "../../styles/ContentWrapper"
import { graphql, gql, compose } from "react-apollo"
import Button from "../shared/Button"
import Loading from "../shared/Loading"
import Modal from "../shared/Modal"
import AddGroup from "./AddGroup"
import { USER_ID } from "../../utils/constants"

class Groups extends React.Component {
  state = {
    inTransition: false,
    openMenu: false,
    active: false,
    open: false
  }
  componentDidMount() {
    console.log(this.props)
  }

  render() {
    const ifParent = this.props.user && this.props.user.role.name === "Parent"

    return (
      <ContentWrapper>
        {this.props.getGroups.loading ? (
          <Loading />
        ) : (
          this.props.getGroups.allGroups.map((group, i) => (
            <GroupCard
              key={i}
              id={group.id}
              title={group.title}
              created={group.createdAt}
              tasks={group.tasks.length}
              dueDate={group.dueDate}
            />
          ))
        )}
        {ifParent && (
          <Modal button={<Button sticky>+ Add a new group</Button>}>
            {({ handleOpenCloseModal }) => (
              <AddGroup familyId="cj84seori01xr0195h9fnhql1" />
            )}
          </Modal>
        )}
      </ContentWrapper>
    )
  }
}

const GET_GROUPS = gql`
  query getGroups($parentId: ID!, $memberId: ID!) {
    allGroups(
      orderBy: createdAt_DESC
      filter: {
        OR: [
          { members_every: { id: $memberId } }
          { parent: { id: $parentId } }
        ]
      }
    ) {
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
  graphql(GET_GROUPS, {
    name: "getGroups",
    options: props => {
      return {
        variables: {
          parentId: localStorage.getItem(USER_ID),
          memberId: localStorage.getItem(USER_ID)
        }
      }
    }
  })
)(Groups)
