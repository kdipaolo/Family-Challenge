import React from "react"
import Action from "../shared/ActionCard"
import Notification from "../shared/Notification"
import ContentWrapper from "../../styles/ContentWrapper"
import { gql, graphql, withApollo, compose } from "react-apollo"
import { USER_ID } from "../../utils/constants"

class Dashboard extends React.Component {
  render() {
    return (
      <ContentWrapper>
        <Notification />
        {this.props.getTasks.User &&
          this.props.getTasks.User.tasks.map(task => <Action data={task} />)}
      </ContentWrapper>
    )
  }
}
const GET_TASKS = gql`
  query getUser($id: ID!) {
    User(id: $id) {
      tasks(filter: { status_in: ["Assigned"] }) {
        id
        status
        title
        description
      }
    }
  }
`

export default compose(
  graphql(GET_TASKS, {
    name: "getTasks",
    options: props => ({ variables: { id: localStorage.getItem(USER_ID) } })
  })(Dashboard)
)
