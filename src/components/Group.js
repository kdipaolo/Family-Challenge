import React from 'react'
import Button from './Button'
import ActionSlide from './ActionSlide'

// Do you usually start off with a stateless functional component or a class?
class Group extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openMenu: false
    }
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }
  handleButtonClick(e) {
    e.preventDefault()
    this.setState({
      openMenu: !this.state.openMenu
    })
  }
  render() {
    return (
      <div>
        <h1 onClick={this.handleButtonClick}>Group</h1>
        <Button onClick={this.handleButtonClick} title="+ Add a new" />
        <ActionSlide open={this.state.openMenu} />
      </div>
    )
  }
}

export default Group
