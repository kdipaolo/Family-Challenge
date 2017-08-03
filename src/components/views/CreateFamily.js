// Question below

import React from 'react'
import styled from 'styled-components'
import LoginWrapper from '../../styles/LoginWrapper'
import { Redirect } from 'react-router-dom'
const Input = styled.input`
  background: transparent;
  border: none;
  padding: 3%;
  color: #fff;
  width: 80%;
  border-bottom: 1px solid #fff;
  ::-webkit-input-placeholder {
    color: #fff;

    padding-left: 10px;
  }
`
const Header = styled.h2`
  color: #fff;
`

class CreateFamily extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      routeChange: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.setState({
      routeChange: true
    })
  }
  render() {
    // Is this route change the best way to do it?
    // What does this do?
    // state: { from: props.location }
    // https://reacttraining.com/react-router/web/example/auth-workflow
    return this.state.routeChange
      ? <Redirect to="/dashboard" />
      : <LoginWrapper>
          <Header>Thank you for signing up for Family Challenge!</Header>
          <h3>What is the name of your family?</h3>
          <form onSubmit={this.handleSubmit}>
            <Input type="text" placeholder="i.e - The Smith's" />
          </form>
        </LoginWrapper>
  }
}

export default CreateFamily
