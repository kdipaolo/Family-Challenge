import React from "react"
import styled from "styled-components"
import { CheckCircle, XCircle } from "react-feather"
const Status = styled.div`
  background: ${props => props.theme.colors.Highlight};
  padding: 2%;
  text-align: center;
  font-size: 18px;
  border: 1px solid ${props => props.theme.colors.cardBorer};
  border-left: 1px solid ${props => props.theme.colors.cardBorer};
  border-right: 1px solid ${props => props.theme.colors.cardBorer};
`

const Flex = styled.div`
  display: flex;
  & > div {
    flex: 1;
    background: ${props => props.theme.colors.cardBackground};
    padding: 2%;
    text-align: center;
    margin: 5px;
    justify-content: center;
    & > span {
      margin-right: 10px;
    }
  }
`

class TaskApproval extends React.Component {
  state = {
    completed: null
  }
  render() {
    return (
      <div>
        <Status>
          Status: {this.state.completed ? "Task Completed" : "In Progress"}
        </Status>
        <Flex>
          <div onClick={this.handleApprove}>
            <span>Approve Task</span>
            <CheckCircle />
          </div>
          <div>
            <span>Decline Task</span>
            <XCircle />
          </div>
        </Flex>
      </div>
    )
  }
}

export default TaskApproval
