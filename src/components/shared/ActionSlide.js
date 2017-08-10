import React from 'react'
import Button from './Button'
import styled from 'styled-components'

const Container = styled.div`
  transform: ${props => (props.open ? 'translateY(0px)' : 'translateY(540px)')};
  transition: 0.2s all ease-out;
  background-color: ${props => props.theme.colors.cardBackground};
  border-top: 5px solid ${props => props.theme.colors.secondary};
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
`
const Form = styled.form`margin: 6% 0;`

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 3% 0;
  border-radius: 3px;
  background: transparent;
  margin: 2% 0;
  border: none;
  color: ${props => props.theme.colors.secondary};
  border: 1px solid ${props => props.theme.colors.secondary};
  &::-webkit-input-placeholder {
    color: ${props => props.theme.colors.secondary};
    padding-left: 10px;
  }
`
const Textarea = styled.textarea`
  width: 100%;
  background: ${props => props.theme.colors.background};
  height: 100px;
  border: none;
  margin: 2% 0;
  border-radius: 3px;
  padding: 5px;
  color: ${props => props.theme.colors.secondary};
`
const Label = styled.label`
  color: ${props => props.theme.colors.secondary};
  margin: 2% 0;
  font-size: 16px;
  margin: 5% 0 1% 0;
  margin-left: 10px;
  text-align: left;
  display: block;
`
const Text = styled.p`
  color: ${props => props.theme.colors.secondary};
  text-align: center;
  border-bottom: 1px solid ${props => props.theme.colors.secondary};
  padding-bottom: 3%;
  display: inline-block;
  margin: auto;
`

const ButtonWrapper = styled.div`display: flex;`

class ActionSlide extends React.Component {
  state = {
    name: '',
    dueDate: '',
    description: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleAdd(this.state)
  }

  render() {
    const { open, type, handleClose, handleAdd } = this.props
    return (
      <Container open={open}>
        <Text>
          + Add a New {type}
        </Text>
        <Form onSubmit={this.handleSubmit}>
          {/* use: innerRef */}
          <Input
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            type="text"
            placeholder={type + ' Name'}
          />
          <Input
            name="dueDate"
            value={this.state.dueDate}
            type="text"
            onChange={this.handleChange}
            placeholder={type + ' Due Date'}
          />
          <Label htmlFor="">
            {type} Description
          </Label>
          <Textarea
            name="description"
            value={this.state.description}
            type="text"
            onChange={this.handleChange}
            placeholder=""
          />
          <Button type="submit">
            + Add {type}
          </Button>
        </Form>
        <ButtonWrapper>
          {/* Not working now because of styled components */}
          <Button onClick={handleClose} name="openMenu">
            x Close
          </Button>
        </ButtonWrapper>
      </Container>
    )
  }
}

export default ActionSlide
