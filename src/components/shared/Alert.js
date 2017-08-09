import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import check from 'react-icons/lib/fa/check-circle'

const rotate360 = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`

const Container = styled.div`
  position: absolute;
  width: 100%;
  min-height: 100vh;
  top: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  left: -100vw;
  opacity: 0;
  transition: 0.5s all ease;
  ${props =>
    props.transition &&
    css`
    left: 0vw;
    opacity: 1;
  `};
`

const Text = styled.h1`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
`

const Check = styled(check)`
  display: block;
  margin: 4% auto;
  color: #43A047;
  font-size: 70px;
`

class Alert extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  render() {
    return (
      <Container transition={this.state.show}>
        <Text>
          <Check />
          {this.props.text}
        </Text>
      </Container>
    )
  }
}

export default Alert
