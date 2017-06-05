import React from 'react'
import styled from 'styled-components'
import LoginWrapper from '../styles/LoginWrapper'
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
class CreateFamily extends React.Component {
  handleSubmit(e) {
    e.preventDefault()
    alert()
  }
  render() {
    return (
      <LoginWrapper>
        <h2>Thank you for signing up for Family Challenge!</h2>
        <h3>What is the name of your family?</h3>
        <form onSubmit={this.handleSubmit}>
          <Input type="text" placeholder="i.e - The Smith's" />
        </form>
      </LoginWrapper>
    )
  }
}

export default CreateFamily
