import React from 'react'
import styled from 'styled-components'
import { CheckCircle, XCircle } from 'react-feather'
import { USER_ID } from '../../utils/constants'
import { graphql, gql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
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
  handleUpdateTaskStatus = async status => {
    const updateTask = await this.props.updateTaskStatus({
      variables: {
        id: this.props.match.params.taskid,
        status
      }
    })

    const newStatus = updateTask.data.updateTask.status
    const parentName = updateTask.data.updateTask.group.groupOwner.name
    const memberName = updateTask.data.updateTask.assignee.name
    const taskName = updateTask.data.updateTask.title
    const taskId = this.props.match.params.taskid

    await this.props.createMessage({
      variables: {
        comment: 'Task Status: ' + newStatus,
        taskId,
        status: newStatus
      }
    })

    const content = () => {
      if (newStatus === 'In Progress') {
        return `${memberName} has begun working on ${taskName}` // In Progress
      } else if (newStatus === 'Submitted') {
        return `${memberName} has submitted ${taskName} for approval` // Submitted
      } else if (newStatus === 'Completed') {
        return `${parentName} has approved ${taskName} for completion`
      }
    }

    await this.props.createNotification({
      variables: {
        seen: false,
        taskId,
        content: content(),
        userId:
          newStatus === 'Completed'
            ? updateTask.data.updateTask.assignee.id
            : updateTask.data.updateTask.group.groupOwner.id
      }
    })
    this.props.refetch()
  }
  render() {
    const { Task, currentUser } = this.props

    const ParentAssigned = () => (
      <div>
        <Status>Waiting on {Task.assignee.name} to accept task.</Status>
      </div>
    )
    const ParentSubmitted = () => (
      <div>
        <Status>
          {Task.assignee.name} has subbmited their task for approval.
        </Status>
        <Flex>
          <div onClick={() => this.handleUpdateTaskStatus('Completed')}>
            <span>Approve Task</span>
            <CheckCircle />
          </div>
          <div onClick={() => this.handleUpdateTaskStatus('In Progress')}>
            <span>Decline Task</span>
            <XCircle />
          </div>
        </Flex>
      </div>
    )

    const MemberSubmit = () => (
      <Flex>
        <div onClick={this.handleApprove}>
          <span>Submit Finished Task</span>
          <CheckCircle />
        </div>
      </Flex>
    )

    const MemberAssigned = () => (
      <div>
        <Status>You have been assigned this task.</Status>
        <Flex>
          <div onClick={() => this.handleUpdateTaskStatus('In Progress')}>
            <span>Begin Working on Task</span>
            <CheckCircle />
          </div>
        </Flex>
      </div>
    )

    const MemberInProgress = () => (
      <div>
        <Status>You are currently working on this task.</Status>
        <Flex>
          <div onClick={() => this.handleUpdateTaskStatus('Submitted')}>
            <span>Submit task for completion</span>
            <CheckCircle />
          </div>
        </Flex>
      </div>
    )
    const ParentInProgress = () => (
      <div>
        <Status>
          {Task.assignee.name} has accepted and is working on this task.
        </Status>
      </div>
    )
    const MemberSubmitted = () => (
      <div>
        <Status>Parent is reviewing your submitted task.</Status>
      </div>
    )
    const MemberCompleted = () => (
      <div>
        <Status>Your task have been approved! Nice Job!</Status>
      </div>
    )
    const ParentCompleted = () => (
      <div>
        <Status>Task has been completed.</Status>
      </div>
    )
    return (
      <div>
        {currentUser &&
          Task && (
            <div>
              {currentUser.role === 'Parent' && (
                <div>
                  {Task.status === 'Assigned' && <ParentAssigned />}
                  {Task.status === 'In Progress' && <ParentInProgress />}
                  {Task.status === 'Submitted' && <ParentSubmitted />}
                  {Task.status === 'Completed' && <ParentCompleted />}
                </div>
              )}
              {currentUser.role === 'Member' && (
                <div>
                  {Task.status === 'Assigned' && <MemberAssigned />}
                  {Task.status === 'In Progress' && <MemberInProgress />}
                  {Task.status === 'Submitted' && <MemberSubmitted />}
                  {Task.status === 'Completed' && <MemberCompleted />}
                </div>
              )}
            </div>
          )}
      </div>
    )
  }
}

const UPDATE_TASK_MUTATION = gql`
  mutation updateTask($id: ID!, $status: String!) {
    updateTask(id: $id, status: $status) {
      id
      description
      status
      title
      group {
        groupOwner {
          id
          name
        }
      }
      assignee {
        id
        name
      }
    }
  }
`

const CREATE_MESSAGE_MUTATION = gql`
  mutation createNewMessage($comment: String!, $taskId: ID!, $status: String!) {
    createMessage(comment: $comment, taskId: $taskId, status: $status) {
      id
      comment
      status
    }
  }
`

const CREATE_NOTIFICATION = gql`
  mutation newNotification(
    $seen: Boolean!
    $taskId: ID!
    $userId: ID!
    $content: String!
  ) {
    createNotification(
      seen: $seen
      taskId: $taskId
      userId: $userId
      content: $content
    ) {
      id
      task {
        id
      }
      user {
        id
      }
    }
  }
`

export default withRouter(
  compose(
    graphql(UPDATE_TASK_MUTATION, {
      name: 'updateTaskStatus'
    }),
    graphql(CREATE_MESSAGE_MUTATION, {
      name: 'createMessage'
    }),
    graphql(CREATE_NOTIFICATION, { name: 'createNotification' })
  )(TaskApproval)
)
