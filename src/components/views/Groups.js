import React from "react"
import Group from "../cards/Group"
import ContentWrapper from "../../styles/ContentWrapper"
import { graphql, gql, compose } from "react-apollo"
import Button from "../shared/Button"
import Loading from "../shared/Loading"
import ActionSlide from "../shared/ActionSlide"
import Modal from "../shared/Modal"
import AddGroup from "../shared//AddGroup"

class Groups extends React.Component {
  state = {
    inTransition: false,
    openMenu: false,
    active: false,
    open: false
  }
  componentDidMount() {
    this.props.getGroups.refetch()
  }

  render() {
    return (
      <ContentWrapper>
        {this.props.getGroups.loading ? (
          <Loading />
        ) : (
          this.props.getGroups.allGroups.map((group, i) => (
            <Group
              key={i}
              id={group.id}
              title={group.title}
              created={group.createdAt}
              tasks={group.tasks.length}
              dueDate={group.dueDate}
            />
          ))
        )}

        <Modal button={<Button sticky>+ Add a new group</Button>}>
          {({ handleOpenCloseModal }) => <AddGroup />}
        </Modal>
      </ContentWrapper>
    )
  }
}
//
const GET_GROUPS = gql`
  query GetGroups {
    allGroups(orderBy: createdAt_DESC) {
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

const NEW_GROUP_MUTATION = gql`
  mutation CreateNewGroup($title: String!, $dueDate: DateTime!) {
    createGroup(title: $title, dueDate: $dueDate) {
      id
      title
    }
  }
`

export default compose(
  graphql(GET_GROUPS, {
    name: "getGroups"
  }),
  graphql(NEW_GROUP_MUTATION, {
    name: "newGroupMutation",
    props: ({ ownProps, newGroupMutation }) => ({
      createGroup: values =>
        newGroupMutation({
          variables: {
            title: values.title,
            dueDate: values.dueDate,
            description: values.description
          }
        })
    })
  })
)(Groups)
