import React from 'react'
import styled from 'styled-components'

// Can you pass in a prop value into background-color?

const ButtonWrapper = styled.button`
  width: 100%;
  padding: 5%;
  background-color: ${props => props.color};
  border: none;
  color: #fff;
  text-transform: uppercase;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s all ease;

  &:hover {
    background-color: #2d736a;
    transform: scale(1.01);
  }
`

class Button extends React.Component {
  render() {
    return (
      <ButtonWrapper>
        {this.props.title}
      </ButtonWrapper>
    )
  }
}

export default Button
