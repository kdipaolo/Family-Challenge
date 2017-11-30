import React from 'react'
import { gql, graphql, withApollo, compose } from 'react-apollo'
import GroupLists from './GroupLists'
import GroupHeader from './GroupHeader'
import { withRouter } from 'react-router-dom'
const Group = props =>
  !props.getGroup.loading && (
    <div>
      <GroupHeader {...props.getGroup} />
      <GroupLists {...props.getGroup} user={props.user} />
    </div>
  )

const GET_GROUP = gql`
  query getGroup($id: ID!) {
    Group(id: $id) {
      createdAt
      title
      reward
      members {
        name
        id
      }
      tasks {
        id
        status
        assignee {
          name
        }
        title
        description
      }
    }
  }
`
export default withRouter(
  compose(
    graphql(GET_GROUP, {
      name: 'getGroup',
      options: props => ({ variables: { id: props.match.params.groupid } })
    })
  )(Group)
)
