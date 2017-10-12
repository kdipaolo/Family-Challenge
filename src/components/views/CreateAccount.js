import React from "react"
import styled from "styled-components"
import LoginWrapper from "../../styles/LoginWrapper"
import { Redirect } from "react-router-dom"
import apple from "../../../public/images/apple.svg"
import { Input } from "../../styles/Forms"
import { HeaderTwo } from "../../styles/Typography"
import { Form } from "../../styles/Forms"
import { gql, compose, graphql } from "react-apollo"
import { USER_ID, AUTH_TOKEN } from "../../constants"

const Apple = styled.img`width: 100px;`
const Label = styled.label`
  font-size: 18px;
  margin: 0;
`
class CreateAccount extends React.Component {
  state = {
    email: null,
    password: null,
    name: null,
    signUp: true
  }

  handleSubmit = async e => {
    e.preventDefault()
    if (this.state.signUp) {
      const result = await this.props.createUserMutation({
        variables: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }
      })
      const id = result.data.signinUser.user.id
      const token = result.data.signinUser.token
      this.saveUserData(id, token)
    } else {
      const signUserIn = await this.props.signinUserMutation({
        variables: {
          email: this.state.email,
          password: this.state.password
        }
      })
      this.saveUserData(
        signUserIn.data.signinUser.user.id,
        signUserIn.data.signinUser.token
      )
      console.log(signUserIn)
    }
    this.props.history.push("/dashboard")
  }
  handleStateChange = e => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  toggleSignInUp = e => {
    this.setState(state => ({ signUp: !state.signUp }))
  }
  saveUserData = (id, token) => {
    localStorage.setItem(USER_ID, id)
    localStorage.setItem(AUTH_TOKEN, token)
  }

  render() {
    return (
      <LoginWrapper>
        <Apple src={apple} alt="" />
        <HeaderTwo>
          Sign {!this.state.signUp ? "In" : "Up"} for Family Challenge!
        </HeaderTwo>
        <HeaderTwo>Sign {!this.state.signUp ? "In" : "Up"}</HeaderTwo>

        <Form onSubmit={this.handleSubmit}>
          {this.state.signUp && (
            <Input
              onChange={this.handleStateChange}
              type="text"
              name="name"
              placeholder="name"
              required
            />
          )}
          <Input
            onChange={this.handleStateChange}
            type="email"
            name="email"
            placeholder="email"
            required
          />
          <Input
            onChange={this.handleStateChange}
            type="password"
            name="password"
            placeholder="password"
            required
          />
          <Input type="submit" />
        </Form>
        <a href="#" name="signUp" onClick={this.toggleSignInUp}>
          Already have an Account? Sign In.
        </a>
      </LoginWrapper>
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

const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`

export default compose(
  graphql(CREATE_USER_MUTATION, { name: "createUserMutation" }),
  graphql(SIGNIN_USER_MUTATION, { name: "signinUserMutation" })
)(CreateAccount)
