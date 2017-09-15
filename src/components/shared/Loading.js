import React from 'react'
import styled, { keyframes } from 'styled-components'

const loading = keyframes`
  0 {transform: translate(0,0);}
  50% {transform: translate(0,15px);}
  100% {transform: translate(0,0);}
`

const Dot = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background-color: ${props => props.theme.colors.secondary};
  margin: 2px;
  &:nth-last-child(1) {
    animation: ${loading} .6s .1s linear infinite;
  }
  &:nth-last-child(2) {
    animation: ${loading} .6s .2s linear infinite;
  }
  &:nth-last-child(3) {
    animation: ${loading} .6s .3s linear infinite;
  }
`

const Wrapper = styled.div`
  display: block;
  margin: auto;
  text-align: center;
  margin-top: 10%;
`

class Loading extends React.Component {
  render() {
    return (
      <Wrapper>
        <Dot />
        <Dot />
        <Dot />
      </Wrapper>
    )
  }
}

export default Loading
