import React from 'react'
import Button from '../shared/Button'
import ActionSlide from '../shared/ActionSlide'
import Task from '../cards/Task'
import Member from '../cards/Member'
import styled from 'styled-components'
import ContentWrapper from '../../styles/ContentWrapper'
import InfoCard from '../cards/InfoCard'

const Switcher = styled.div`
  display: flex;
  background: #efefef;
`
const SwitcherItem = styled.p`
  cursor: pointer;
  flex: 1;
  text-align: center;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 14px;
  margin: 0;
  padding: 3% 0;
  color: ${props => (props.active ? props.theme.colors.primaryDark : '#333')};
  border-bottom: ${props => (props.active ? '2px solid' + props.theme.colors.primaryDark : 'none')}

`
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

        <Switcher>

          <SwitcherItem
            data-item="Tasks"
            onClick={this.handleSwitcherClick}
            active={this.state.active === 'Tasks'}>
            Tasks
          </SwitcherItem>
          <SwitcherItem
            data-item="Members"
            onClick={this.handleSwitcherClick}
            active={this.state.active === 'Members'}>
            Members
          </SwitcherItem>
        </Switcher>
        <ContentWrapper>
          {this.state.active === 'Tasks'
            ? <div>
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Button onClick={this.handleButtonClick}>
                  + Add A Todo
                </Button>
              </div>
            : <div>
                <Member />
                <Member />
                <Member />
                <Member />
                <Button onClick={this.handleButtonClick}>
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
