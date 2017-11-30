import React from 'react'
import TaskList from '../task/TaskList'
import MemberList from '../Members/MemberList'
import Switcher from '../shared/Switcher'
import ContentWrapper from '../../styles/ContentWrapper'
import Modal from '../shared/Modal'
import AddGroupMember from './AddGroupMember'
import AddTask from '../task/AddTask'
import Button from '../shared/Button'
import { withRouter } from 'react-router-dom'
class GroupLists extends React.Component {
  state = {
    active: 'Tasks',
    completed: null
  }
  handleSwitcherClick = e => {
    this.setState({
      active: e.target.dataset.item,
      completed: false
    })
  }
  handleToggleCompleted = e => {
    this.setState(state => ({
      completed: !state.completed
    }))
  }
  render() {
    const { active, completed } = this.state
    const { tasks, members } = this.props.Group
    return (
      <div>
        <Switcher
          active={active}
          handleSwitcherClick={this.handleSwitcherClick}
          links={['Tasks', 'Members']}
        />
        <ContentWrapper>
          {active === 'Tasks' ? (
            <TaskList
              handleToggleCompleted={this.handleToggleCompleted}
              tasks={tasks}
              completed={completed}
              openMenu={this.state.openMenu}
            />
          ) : (
            <MemberList members={members} />
          )}
        </ContentWrapper>
        {active === 'Tasks' ? (
          <Modal button={<Button sticky>+ Add a new Task</Button>}>
            {({ handleOpenCloseModal }) => (
              <AddTask
                refetch={this.props.refetch}
                handleOpenCloseModal={handleOpenCloseModal}
                user={this.props.user}
              />
            )}
          </Modal>
        ) : (
          <Modal button={<Button sticky>+ Add a Member to Group</Button>}>
            {({ handleOpenCloseModal }) => (
              <AddGroupMember
                refetch={this.props.refetch}
                handleOpenCloseModal={handleOpenCloseModal}
                groupId={this.props.match.params.groupid}
                user={this.props.user}
              />
            )}
          </Modal>
        )}
      </div>
    )
  }
}

export default withRouter(GroupLists)
