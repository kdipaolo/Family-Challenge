import React from 'react'
import { withRouter } from 'react-router-dom'
import { gql, compose, graphql } from 'react-apollo'
import MemberHeader from './MemberHeader'
import MemberLists from './MemberLists'

const Member = props =>
  !props.getUser.loading && (
    <div>
      <MemberHeader {...props.getUser} />
      <MemberLists {...props.getUser} />
    </div>
  )

const GET_USER = gql`
  query getAUser($id: ID!) {
    User(id: $id) {
      name
      id
      tasks {
        title
        id
        completed
      }
    }
  }
`

export default compose(
  graphql(GET_USER, {
    name: 'getUser',
    options: props => ({ variables: { id: props.match.params.memberid } })
  })
)(withRouter(Member))
