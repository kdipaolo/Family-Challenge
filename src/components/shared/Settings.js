import React from 'react'
import styled from 'styled-components'
import Button from './Button'

const Container = styled.div`
  padding: 2%;
  background-color: ${props => props.theme.colors.primaryLight};
  max-width: 100%;
  padding: 3%;
  transition: 3s all ease;
`

const Input = styled.input`
  padding: 3%;
  width: 100%;
  margin: 1% auto;
  color: ${props => props.theme.colors.primaryDark};
  box-sizing: border-box;
`

const Label = styled.label`
  margin: 2% auto;
  display: block;
  color: ${props => props.theme.colors.primaryDark};
  font-weight: bold;
`

class Settings extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.handleUpdate({ title: this.props.name })
    this.props.handleStateUpdate(e, 'settings')
  }

  render() {
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <Label htmlFor="group">Edit Name</Label>
          <Input
            type="text"
            name="title"
            value={this.props.name}
            onChange={this.props.handleStateUpdate}
          />
          <Label htmlFor="group">Delete A :</Label>
          <Button>Save</Button>
        </form>
        <Button danger onClick={this.props.handleDelete}>
          - Delete This
        </Button>
      </Container>
    )
  }
}

export default Settings
