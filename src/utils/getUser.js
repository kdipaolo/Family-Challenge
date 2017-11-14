import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { gql, compose, graphql } from "react-apollo"
import { AUTH_TOKEN, USER_ID } from "../utils/constants"

const withUser = Component =>
  class extends React.Component {
    render() {
      return <Component {...this.props} />
    }
  }

const GET_USER = gql`
  query getUser($id: ID!) {
    User(id: $id) {
      name
      familyMember {
        name
        id
      }
    }
  }
`

export default withRouter(
  compose(
    graphql(GET_USER, {
      name: "getUser",
      options: props => ({ variables: { id: localStorage.getItem(USER_ID) } })
    })(withUser)
  )
)
