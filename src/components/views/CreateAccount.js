import React from 'react'
import styled from 'styled-components'

import { Redirect } from 'react-router-dom'
import apple from '../../../public/images/apple.svg'
import { Input, Label } from '../../styles/Forms'
import { HeaderTwo } from '../../styles/Typography'
import { Form } from '../../styles/Forms'
import { gql, compose, graphql } from 'react-apollo'
import { USER_ID, AUTH_TOKEN } from '../../utils/constants'
import Button from '../shared/Button'
const Apple = styled.img`width: 100px;`
const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  margin: 5%;
`

class CreateAccount extends React.Component {
  state = {
    email: null,
    password: null,
    name: null,
    family: null,
    signUp: true,
    error: null
  }
  createNewUser = async e => {
    const newUser = await this.props.createUserMutation({
      variables: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
    })

    const id = newUser.data.signinUser.user.id
    const token = newUser.data.signinUser.token
    this.saveUserData(id, token)
    const newFamily = await this.props.createFamilyMutation({
      variables: {
        name: this.state.family,
        parentId: id
      }
    })
  }
  signInUser = async e => {
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
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      if (this.state.signUp) {
        this.createNewUser()
      } else {
        this.signInUser()
      }
      this.props.history.push('/dashboard')
    } catch (error) {
      this.setState({
        error: error.message
      })
    }
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
      <Wrapper>
        <Apple src={apple} alt="" />
        <HeaderTwo>
          Sign {!this.state.signUp ? 'In' : 'Up'} for Family Challenge!
        </HeaderTwo>

        <Form onSubmit={this.handleSubmit}>
          {this.state.signUp && (
            <div>
              <Label>Name</Label>
              <Input
                onChange={this.handleStateChange}
                type="text"
                name="name"
                placeholder="i.e John Doe"
                required
              />
              <Label>Family Name (Could just be your last name)</Label>
              <Input
                onChange={this.handleStateChange}
                type="text"
                name="family"
                placeholder="i.e Smith"
                required
              />
            </div>
          )}

          <Label>Email</Label>
          <Input
            onChange={this.handleStateChange}
            type="email"
            name="email"
            placeholder="john@doe.com"
            required
          />
          <Label>Password</Label>
          <Input
            onChange={this.handleStateChange}
            type="password"
            name="password"
            placeholder="password"
            required
          />
          <h1>{this.state.error}</h1>
          <Button type="submit">Create Account</Button>
        </Form>

        <a href="#" name="signUp" onClick={this.toggleSignInUp}>
          Already have an Account? Sign In.
        </a>
      </Wrapper>
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

const CREATE_FAMILY_MUTATION = gql`
  mutation newFamily($name: String!, $parentId: ID!) {
    createFamily(name: $name, parentId: $parentId) {
      name
      id
    }
  }
`

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(CREATE_FAMILY_MUTATION, { name: 'createFamilyMutation' }),
  graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' })
)(CreateAccount)
