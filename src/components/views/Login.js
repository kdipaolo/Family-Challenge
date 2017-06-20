import React from 'react'
import styled from 'styled-components'
import LoginWrapper from '../../styles/LoginWrapper'
// Do you have a better proccess for how you use wrappers in styled components? Feels repetitive?

const Input = styled.input`
  width: 100%;
  display: block;
  padding: 5% 0;
  border: none;
  margin: 4% 0;
  background: rgba(0,0,0,0.2);
  border-radius: 3px;
  color: #fff;
  border: 1px solid #7c90f1;
  ::-webkit-input-placeholder {
    color: lightgray;
    padding-left: 10px;
  }
`

class Login extends React.Component {
  render() {
    return (
      <LoginWrapper>
        <h3>Welcome back to family challenge</h3>
        <Input type="email" placeholder="i.e johnsmith@gmail.com" />
        <Input type="password" placeholder="abc123" />
      </LoginWrapper>
    )
  }
}

export default Login
