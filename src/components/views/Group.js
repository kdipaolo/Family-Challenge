import React from 'react'
import Button from '../shared/Button'
import ActionSlide from '../shared/ActionSlide'
import Task from '../cards/Task'
import Member from '../cards/Member'
import styled from 'styled-components'
import ContentWrapper from '../../styles/ContentWrapper'
import InfoCard from '../cards/InfoCard'
import Switcher from '../shared/Switcher'

class Group extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openMenu: false,
      active: 'Members'
    }
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleSwitcherClick = this.handleSwitcherClick.bind(this)
  }
  handleButtonClick(e) {
    e.preventDefault()
    this.setState({
      openMenu: !this.state.openMenu
    })
  }
  handleSwitcherClick(e) {
    this.setState({
      active: e.target.dataset.item
    })
  }
  render() {
    return (
      <div>
        <InfoCard />

        <Switcher
          active={this.state.active}
          handleSwitcherClick={this.handleSwitcherClick}
          links={['Tasks', 'Members']}
        />
        <ContentWrapper>
          {this.state.active === 'Tasks'
            ? <div>
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />

                <Button sticky onClick={this.handleButtonClick}>
                  + Add A Todo
                </Button>
              </div>
            : <div>
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Button sticky onClick={this.handleButtonClick}>
                  + Add A Memeber
                </Button>
              </div>}
        </ContentWrapper>
        <ActionSlide
          open={this.state.openMenu}
          handleCloseClick={this.handleButtonClick}
          type={this.state.active}
        />
      </div>
    )
  }
}

export default Group
