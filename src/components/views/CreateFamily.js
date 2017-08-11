import React from 'react'
import styled from 'styled-components'
import LoginWrapper from '../../styles/LoginWrapper'
import { Redirect } from 'react-router-dom'
import apple from '../../../public/images/apple.svg'
const Input = styled.input`
  background: transparent;
  padding: 4% 6%;
  color: #fff;
  width: 100%;
  max-width: 200px;
  border-radius: 5px;
  color: ${props => props.theme.colors.secondary};
  border: 2px solid ${props => props.theme.colors.secondary};
  ::-webkit-input-placeholder {
    color: ${props => props.theme.colors.secondary};
    padding-left: 10px;
  }
`
const Header = styled.h2`color: #333;`

const Apple = styled.img`width: 100px;`

const Form = styled.form`width: 100%;`

class CreateFamily extends React.Component {
  state = {
    routeChange: false
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({
      routeChange: true
    })
  }

  render() {
    return this.state.routeChange
      ? <Redirect to="/dashboard" />
      : <LoginWrapper>
          <Apple src={apple} alt="" />
          <Header>Thank you for signing up for Family Challenge!</Header>
          <h3>What is the name of your family?</h3>
          <Form onSubmit={this.handleSubmit}>
            <Input type="text" placeholder="i.e - The Smith's" />
          </Form>
        </LoginWrapper>
  }
}

export default CreateFamily
