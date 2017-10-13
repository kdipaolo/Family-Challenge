import React from "react"
import styled, { keyframes, css } from "styled-components"
import { withRouter } from "react-router-dom"
import { X } from "react-feather"
const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999999999;
  background: rgba(0, 0, 0, 0.4);
`

const rotate360 = keyframes`
	0% {
		opacity: 0;
    transform: translate(-50%, -30%);
	}


  100% {
		opacity: 1;
    transform: translate(-50%, -55%);
	}
`

const ModalWrapper = styled.div`
  animation: ${rotate360} 0.3s ease-out forwards;
  max-width: 500px;
  width: 50%;
  padding: 3%;
  height: auto;
  z-index: 9999999999;
  position: fixed;
  border-radius: 6px;
  top: 50%;
  left: 50%;
  box-shadow: 0 8px 15px 0 rgba(68, 80, 82, 0.06);
  background: #fff;
  ${props => props.width && css`width: ${props => props.width}px;`};
`

const Completed = styled.h1`
  padding: 2%;
  display: block;
  text-align: center;
`

const XIcon = styled(X)`
  overflow: hidden;
  position: absolute;
  right: -67px;
  top: 9px;
  background: ${props => props.theme.colors.blue};
  padding: 3%;
  border-radius: 50%;
  color: #fff;
  transition: 0.3s all ease;
  &:hover {
    transform: scale(1.2);
  }
`

const Close = styled.a``

class Modal extends React.Component {
  state = {
    open: false
  }
  componentDidMount() {}
  handleOpenCloseModal = (e, options = {}) => {
    e.preventDefault()
    // THIS BAD BELOW
    if (options.message) {
      this.setState({
        completed: options.message
      })
      setTimeout(() => {
        this.setState({
          open: false,
          completed: null
        })
        if (options.redirect) {
          this.props.history.goBack()
        }
      }, 1500)
    } else {
      this.setState({
        open: !this.state.open
      })
    }
  }
  render() {
    if (this.props.button) {
      var ButtonClick = React.cloneElement(this.props.button, {
        onClick: this.handleOpenCloseModal
      })
    }
    return (
      <span>
        {ButtonClick}
        {this.state.open && (
          <div>
            <Overlay onClick={this.handleOpenCloseModal} />
            <ModalWrapper width={this.props.width} open={this.state.open}>
              {!this.state.completed && (
                <Close href="" onClick={this.handleOpenCloseModal}>
                  <XIcon />
                </Close>
              )}
              {!this.state.completed ? (
                <div>
                  {this.props.children({
                    handleOpenCloseModal: this.handleOpenCloseModal
                  })}
                </div>
              ) : (
                <Completed>{this.state.completed}</Completed>
              )}
            </ModalWrapper>
          </div>
        )}
      </span>
    )
  }
}

export default withRouter(Modal)
