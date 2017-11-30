import React from 'react'
import {
  EditIcon,
  Info,
  MinusCircleIcon,
  Image,
  Header,
  Detail,
  DetailWrapper,
  Highlight
} from '../../styles/theme/infoCard'
import paperAirplane from '../../../public/images/paper-airplane.svg'
import { CheckCircle, XCircle } from 'react-feather'
import { gql, graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'

class TaskHeader extends React.Component {
  state = {
    edit: null,
    title: null
  }
  componentDidMount() {
    this.setState({
      title: this.props.Task.title
    })
  }
  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps)
    if (nextProps.Task.title !== this.props.Task.title) {
      this.setState({
        title: nextProps.Task.title
      })
    }
  }
  handleTaskDelete = () => {
    var confirmation = confirm('are you sure?')
    if (confirmation) {
      this.props.deleteTask()
      this.props.history.goBack()
    } else {
      console.log('DENIED')
    }
  }

  handleApprove = () => {
    this.props.client.mutate({
      mutation: UPDATE_TASK_MUTATION,
      variables: {
        task: {
          id: this.props.match.params.taskid,
          completed: true
        }
      }
    })
  }
  handleEditToggle = () => {
    this.setState(state => ({ edit: !state.edit }))
  }
  handleStateChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleTitleUpdate = e => {
    e.preventDefault()
    this.props.updateTask({ title: this.state.title })
    this.handleEditToggle()
  }
  render() {
    return (
      <div>
        {this.props.Task && (
          <Info>
            <Image src={paperAirplane} />
            <Header>
              <MinusCircleIcon onClick={this.handleTaskDelete} />
              <EditIcon onClick={this.handleEditToggle} />
              {this.state.edit ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleStateChange}
                  />
                  <CheckCircle onClick={this.handleTitleUpdate} />
                </div>
              ) : (
                this.state.title
              )}
            </Header>
            <DetailWrapper>
              <Detail>
                Assigned By:{' '}
                <Highlight>{this.props.Task.group.groupOwner.name}</Highlight>
              </Detail>
              <Detail>
                Assigned To:{' '}
                <Highlight>{this.props.Task.assignee.name}</Highlight>
              </Detail>
              <Detail>
                If all tasks in {this.props.Task.group.title} are completed by{' '}
                {this.props.Task.group.dueDate} you will recieve this award:
                <Highlight>{this.props.Task.group.reward}</Highlight>
              </Detail>
            </DetailWrapper>
          </Info>
        )}
      </div>
    )
  }
}

const DELETE_TASK_MUTATION = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      title
    }
  }
`
const UPDATE_TASK_MUTATION = gql`
  mutation updateTask($id: ID!, $title: String!) {
    updateTask(id: $id, title: $title) {
      id
      description
    }
  }
`
export default withRouter(
  compose(
    graphql(DELETE_TASK_MUTATION, {
      name: 'deleteTaskMutation',
      props: ({ ownProps, deleteTaskMutation }) => ({
        deleteTask: values => {
          deleteTaskMutation({
            variables: {
              id: ownProps.match.params.taskid
            }
          })
        }
      })
    }),
    graphql(UPDATE_TASK_MUTATION, {
      name: 'updateTaskMutation',
      props: ({ ownProps, updateTaskMutation }) => ({
        updateTask: values => {
          updateTaskMutation({
            variables: {
              id: ownProps.match.params.taskid,
              title: values.title
            }
          })
        }
      })
    })
  )(TaskHeader)
)
