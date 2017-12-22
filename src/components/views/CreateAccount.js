import React from 'react'
import styled from 'styled-components'
import apple from '../../../public/images/apple.svg'
import { Input, Label } from '../../styles/Forms'
import { HeaderTwo } from '../../styles/Typography'
import { Form } from '../../styles/Forms'
import { gql, compose, graphql } from 'react-apollo'
import { USER_ID, AUTH_TOKEN } from '../../utils/constants'
import Button from '../shared/Button'
const Apple = styled.img`
  width: 100px;
`
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
    signUp: true,
    error: null
  }
  createNewUser = async e => {
    const { name, email, password } = this.state
    const newUser = await this.props.createUserMutation({
      variables: {
        name,
        email,
        password,
        role: 'Parent'
      }
    })

    const id = newUser.data.signinUser.user.id
    const token = newUser.data.signinUser.token

    this.saveUserData(id, token)
  }
  signInUser = async e => {
    const { email, password } = this.state
    const { signInUser } = this.props
    const signUserIn = await signInUser({
      variables: {
        email,
        password
      }
    })
    const id = signUserIn.data.signinUser.user.id
    const token = signUserIn.data.signinUser.token
    this.saveUserData(id, token)
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
    $role: String!
  ) {
    createUser(
      name: $name
      role: $role
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

const SIGN_IN_USER_MUTATION = gql`
  mutation signInUser($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(SIGN_IN_USER_MUTATION, { name: 'signInUser' })
)(CreateAccount)
