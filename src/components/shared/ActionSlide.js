import React from 'react'
import Button from './Button'
import styled from 'styled-components'

const Container = styled.div`
  transform: ${props => (props.open ? 'translateY(0px)' : 'translateY(540px)')};
  transition: 0.2s all ease-out;
  background-color: ${props => props.theme.colors.primaryLight};
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  max-width: 565px;
  margin: auto;
  display: block;
  height: auto;
  left: 0;
  bottom: 0;
  text-align: center;
  padding: 10% 5%;
  form {
    margin: 6% 0;
  }
  input {
    box-sizing: border-box;
    width: 100%;
    padding: 3% 0;
    background: rgba(0, 0, 0, 0);
    margin: 2% 0;
    border: none;
    color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    &::-webkit-input-placeholder {
      color: #fff;
      padding-left: 10px;
    }
  }
  textarea {
    width: 100%;
    background: rgba(0, 0, 0, 0.1);
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

const ButtonWrapper = styled.div`display: flex;`
class ActionSlide extends React.Component {
  render() {
    const { open, type, handleClose, handleAdd } = this.props
    return (
      <Container open={open}>
        <p>
          + Add a New {type}
        </p>
        <form onSubmit={e => handleAdd(e, this.refs)}>
          <input ref="name" type="text" placeholder={type + ' Name'} />
          <input ref="dueDate" type="text" placeholder={type + ' Due Date'} />
          <label htmlFor="">
            {type} Description
          </label>
          <textarea ref="description" type="text" placeholder="" />
          <Button type="submit">
            + Add {type}
          </Button>
        </form>
        <ButtonWrapper>
          <Button onClick={e => handleClose(e)} name="openMenu">
            x Close
          </Button>
        </ButtonWrapper>
      </Container>
    )
  }
}

export default ActionSlide
