import React from "react"
import Button from "./Button"
import styled from "styled-components"
import { Input, Textarea, Form, Label } from "../../styles/Forms"
import { gql, compose, graphql } from "react-apollo"
import { SingleDatePicker } from "react-dates"
import "react-dates/lib/css/_datepicker.css"


const Container = styled.div`
  transform: ${props => (props.open ? "translateY(0vh)" : "translateY(100vh)")};
  transition: 0.2s all ease-out;
  background-color: ${props => props.theme.colors.cardBackground};
  border-top: 5px solid ${props => props.theme.colors.secondary};
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  max-width: 700px;
  margin: auto;
  display: block;
  height: auto;
  bottom: 0;
  text-align: center;
  padding: 10% 5%;
  @media (min-width: 700px) {
    padding: 5% 3%;
  }
`

const Flex = styled.div`
  display: flex;
  & > div {
    flex: 1;
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

const StyledDatePicker = styled.div`
  .SingleDatePicker {
    width: 100% !important;
  }
`

const Dropdown = styled.div``
const Results = styled.div`position: relative;`

const DropdownItem = styled.a`
  position: absolute;
  top: 70px;
  width: 100%;
  background: #b9b9b9;
  z-index: 999999999;
  padding: 3%;
`


// const StyledDatePicker = styled(SingleDatePicker)`
//     width: 100%!important;
// `

class ActionSlide extends React.Component {
  state = {
    title: "",
    dueDate: "",
    description: "",
    search: null
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleUserSearch = e => {
    this.setState({
      search: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.handleAdd(this.state)
  }
  handleDatePickerChange = date => {
    this.setState({
      dueDate: date
    })
  }
  closeMenu = e => {
    this.props.handleClose(e, "openMenu")
  }
  render() {
    const { open, type, handleClose, handleAdd } = this.props
    return (
      <Container open={open}>
        <Text>+ Add a New {type}</Text>
        <Form onSubmit={this.handleSubmit}>
          <Input
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            type="text"
            placeholder={type + " Name"}
          />

          <StyledDatePicker>
            <SingleDatePicker
              date={this.state.dueDate}
              onDateChange={this.handleDatePickerChange}
              focused={this.state.focused}
              onFocusChange={({ focused }) => this.setState({ focused })}
            />
          </StyledDatePicker>

          <Label htmlFor="">{type} Description</Label>

          <Textarea
            name="description"
            value={this.state.description}
            type="text"
            onChange={this.handleChange}
            placeholder=""
          />
          <Dropdown>
            <Input
              name="title"
              value={this.state.search}
              onChange={this.handleUserSearch}
              type="text"
              autocomplete="new-password"
              placeholder="Group Members"
            />

            <Results>
              {!this.props.getUsers.loading &&
                this.props.getUsers.allUsers
                  .filter(
                    user =>
                      this.state.search && user.name.includes(this.state.search)
                  )
                  .map(user => {
                    return <DropdownItem>{user.name}</DropdownItem>
                  })}
            </Results>
          </Dropdown>

          <Flex>
            <Button type="submit">+ Add {type}</Button>

            {/* <Button onClick={this.closeMenu} name="openMenu">
              x Close
            </Button> */}
          </Flex>
        </Form>
      </Container>
    )
  }
}

const GET_USERS = gql`
  query getUsers {
    allUsers {
      name
      id
    }
  }
`

export default compose(graphql(GET_USERS, { name: "getUsers" }))(ActionSlide)
