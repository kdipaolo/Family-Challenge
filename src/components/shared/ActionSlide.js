import React from 'react'
import Button from './Button'
import styled from 'styled-components'
import { Input, Textarea, Form, Label } from '../../styles/Forms'

const Container = styled.div`
  transform: ${props => (props.open ? 'translateY(0vh)' : 'translateY(100vh)')};
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
  bottom: 0;
  text-align: center;
  padding: 10% 5%;
  @media (min-width: 700px) {
    padding: 3% 2%;
  }
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
          <Button onClick={handleClose} name="openMenu">
            x Close
          </Button>
        </ButtonWrapper>
      </Container>
    )
  }
}

export default ActionSlide
