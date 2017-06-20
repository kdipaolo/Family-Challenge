import React from 'react'
import Button from './Button'
import styled from 'styled-components'
import Pencil from 'react-icons/lib/fa/pencil'

const ActionSlideWrapper = styled.div`
  transform:  ${props => (props.open ? 'translateY(0px)' : 'translateY(506px)')};
  transition: 0.2s all ease-out;
  background-color: ${props => props.theme.colors.primaryLight};
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  bottom: 0px;
  height: auto;
  left:0;
  text-align: center;
  padding:10% 5%;
  form {
    margin: 6% 0;
  }
  input {
    box-sizing: border-box;
    width: 100%;
    padding: 3% 0;
    background: rgba(0,0,0,0);
    margin: 2% 0;
    border: none;
    color: #fff;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    &::-webkit-input-placeholder {
      color: #fff;
      padding-left: 10px;
    }

  }
  textarea {
    width: 100%;
    background: rgba(0,0,0,0.1);
    height: 100px;
    border: none;
    margin: 2% 0;


  }
  label {
    color: #fff;
    margin: 2% 0;
    font-size: 16px;
    margin: 5% 0 1% 0;
    margin-left: 10px;
    text-align: left;
    display: block;
  }
  p {
    color: #fff;
    text-align: center;
    border-bottom: 1px solid #fff;
    padding-bottom: 3%;
    display: inline-block;
    margin: auto;
  }
`

const ButtonWrapper = styled.div`
  display: flex;

`
class ActionSlide extends React.Component {
  constructor(props) {
    super(props)
    this.handleCloseClick = this.handleCloseClick.bind(this)
  }
  handleCloseClick() {
    alert()
  }
  render() {
    return (
      <ActionSlideWrapper open={this.props.open}>
        <p>+ Add a New {this.props.type}</p>
        <form>
          <input type="text" placeholder={this.props.type + ' Name'} />
          <input type="text" placeholder={this.props.type + ' Assignee'} />
          <label htmlFor="">{this.props.type} Description</label>
          <textarea type="text" placeholder="" />
        </form>
        <ButtonWrapper>
          <Button>+ Add {this.props.type}</Button>
          <Button onClick={this.props.handleCloseClick}>x Close</Button>
        </ButtonWrapper>
      </ActionSlideWrapper>
    )
  }
}

export default ActionSlide
