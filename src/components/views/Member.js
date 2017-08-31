import React from 'react'
import InfoCard from '../cards/InfoCard'
import Switcher from '../shared/Switcher'
import Task from '../cards/Task'
import ContentWrapper from '../../styles/ContentWrapper'

class Member extends React.Component {
  state = {
    active: 'Tasks'
  }

  handleSwitcherClick = e => {
    this.setState({
      active: e.target.dataset.item
    })
  }

  render() {
    return (
      <div>
        <InfoCard member />
        <Switcher
          handleSwitcherClick={this.handleSwitcherClick}
          active={this.state.active}
          links={['Tasks', 'Settings']}
        />
        <ContentWrapper>
          {this.state.active === 'Tasks'
            ? <div>
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
              </div>
            : <div>
                <h1>Settings</h1>
              </div>}
        </ContentWrapper>
      </div>
    )
  }
}

export default Member
