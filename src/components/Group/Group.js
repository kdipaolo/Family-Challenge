import React from "react"
import { gql, graphql, withApollo, compose } from "react-apollo"
import GroupLists from "./GroupLists"
import GroupHeader from "./GroupHeader"

const Group = props =>
  !props.getGroup.loading && (
    <div>
      <GroupHeader {...props.getGroup} />
      <GroupLists {...props.getGroup} />
    </div>
  )

const GET_GROUP = gql`
  query getGroup($id: ID!) {
    Group(id: $id) {
      createdAt
      title
      members {
        name
        id
      }
      tasks {
        id
        status
        child {
          name
        }
        title
        description
      }
    }
  }
`
export default compose(
  graphql(GET_GROUP, {
    name: "getGroup",
    options: props => ({ variables: { id: props.match.params.groupid } })
  })
)(Group)
