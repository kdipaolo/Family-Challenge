import React from 'react'
import styled from 'styled-components'
import LoginWrapper from '../../styles/LoginWrapper'
import { Redirect } from 'react-router-dom'
import apple from '../../../public/images/apple.svg'
import { Input } from '../../styles/Forms'
import { HeaderTwo } from '../../styles/Typography'
import { Form } from '../../styles/Forms'

const Apple = styled.img`width: 100px;`

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
          <HeaderTwo>Thank you for signing up for Family Challenge!</HeaderTwo>
          <h3>What is the name of your family?</h3>
          <Form onSubmit={this.handleSubmit}>
            <Input type="text" placeholder="i.e - The Smith's" />
          </Form>
        </LoginWrapper>
  }
}

export default CreateFamily
