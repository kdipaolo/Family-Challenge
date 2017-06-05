import React from 'react'
import Button from './Button'
import styled from 'styled-components'

const ActionSlideWrapper = styled.div`
  transform:  ${props => (props.open ? 'translateY(0px)' : 'translateY(351px)')};
  transition: 0.2s all ease-out;
  background-color: ${props => props.theme.colors.primaryLight};
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  bottom: -42px;
  height: auto;
  left:0;
  padding: 10% 5%;
  input {
    box-sizing: border-box;
    width: 100%;
    padding: 2%;
    background: rgba(0,0,0,0);
     margin: 2% 0;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    ::-webkit-input-placeholder {
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
    font-size: 14px;
    margin-left: 10px;
  }
`
class ActionSlide extends React.Component {
  render() {
    return (
      <ActionSlideWrapper open={this.props.open}>
        <input type="text" placeholder="Task Name" />
        <input type="text" placeholder="Task Assignee" />
        <label htmlFor="">Task Description</label>
        <textarea type="text" placeholder="" />
        <Button title="+ Add Task" />
      </ActionSlideWrapper>
    )
  }
}

export default ActionSlide
