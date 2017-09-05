import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import { Input, Textarea, Form, Label } from '../../styles/Forms'
import { HeaderTwo } from '../../styles/Typography'
const Container = styled.div`
  padding: 2%;
  background-color: ${props => props.theme.colors.primary};
  max-width: 100%;
  padding: 3%;
  transition: 3s all ease;
`

const Flex = styled.div`display: flex;`

class Settings extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.handleUpdate({ title: this.props.name })
    this.props.handleStateUpdate(e, 'settings')
  }

  render() {
    return (
      <Container>
        <HeaderTwo>Settings</HeaderTwo>
        <form onSubmit={this.handleSubmit}>
          <Label htmlFor="group">Edit Name</Label>
          <Input
            type="text"
            name="title"
            value={this.props.name}
            onChange={this.props.handleStateUpdate}
          />
          <Flex>
            <Button outline>Save</Button>
            <Button outline danger onClick={this.props.handleDelete}>
              Delete
            </Button>
          </Flex>
        </form>
      </Container>
    )
  }
}

export default Settings
