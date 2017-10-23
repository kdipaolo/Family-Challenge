import React from "react"
import Task from "../task/TaskCard"
import ContentWrapper from "../../styles/ContentWrapper"
import Switcher from "../shared/Switcher"

class MemberLists extends React.Component {
  state = {
    active: "Tasks"
  }
  handleSwitcherClick = e => {
    this.setState({
      active: e.target.dataset.item
    })
  }
  render() {
    return (
      <div>
        <Switcher
          handleSwitcherClick={this.handleSwitcherClick}
          active={this.state.active}
          links={["Tasks", "Settings"]}
        />
        <ContentWrapper>
          {this.state.active === "Tasks" ? (
            <div>
              {this.props.User.tasks.map(task => (
                <Task key={task.id} {...task} />
              ))}
            </div>
          ) : (
            <div>
              <h1>Settings</h1>
            </div>
          )}
        </ContentWrapper>
      </div>
    )
  }
}

export default MemberLists
