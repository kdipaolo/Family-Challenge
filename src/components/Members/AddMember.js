import React from "react"
import { Input, Textarea, Form, Label } from "../../styles/Forms"
import styled from "styled-components"
import { gql, compose, graphql } from "react-apollo"

class AddMember extends React.Component {
  state = {
    name: null,
    age: null,
    email: null
  }
  addToState = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  submitNewUser = e => {
    e.preventDefault()
    this.props.addMember({
      variables: {
        name: this.state.name,
        email: this.state.email,
        password: "FamilyChallenge"
      }
    })
    this.props.handleOpenCloseModal(e)
    this.props.fetchMembers()
  }
  render() {
    return (
      <div>
        <h1>Add a Member</h1>
        <Label htmlFor="">What is the family member's name?</Label>
        <form onSubmit={this.submitNewUser}>
          <Input
            name="name"
            onChange={this.addToState}
            type="text"
            placeholder="i.e Jane Smith"
          />
          <Label name="age" htmlFor="">
            What is their age?
          </Label>
          <Input
            name="age"
            onChange={this.addToState}
            type="text"
            placeholder="i.e Jane Smith"
          />
          <Label name="age" htmlFor="">
            What is their email?
          </Label>
          <Input
            type="email"
            name="email"
            onChange={this.addToState}
            placeholder="i.e 12"
          />
          <Input type="submit" />
        </form>
      </div>
    )
  }
}

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      name: $name
      authProvider: { email: { email: $email, password: $password } }
    ) {
      id
    }
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`

export default compose(graphql(CREATE_USER_MUTATION, { name: "addMember" }))(
  AddMember
)
