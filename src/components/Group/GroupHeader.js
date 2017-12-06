import React from 'react'
import { CheckCircle } from 'react-feather'
import { withRouter } from 'react-router-dom'
import { gql, graphql, withApollo, compose } from 'react-apollo'
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
import Button from '../shared/Button'

import house from '../../../public/images/house.svg'
import dateFormat from 'dateformat'

class GroupHeader extends React.Component {
  state = {
    edit: false,
    title: null
  }
  componentDidMount() {
    this.setState({
      title: this.props.Group.title
    })
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.title !== this.props.title) {
      this.setState({
        title: nextProps.title
      })
    }
  }
  handleGroupDelete = () => {
    var confirmation = confirm('are you sure?')
    if (confirmation) {
      this.props.deleteGroup()
      this.props.history.goBack()
    } else {
      console.log('DENIED')
    }
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
    this.props.updateGroup({ title: this.state.title, completed: false })
    this.handleEditToggle()
  }
  handleCompleteGroup = async () => {
    console.log(this.props.Group)
    const { id, title, reward, members } = this.props.Group
    await this.props.updateGroup({
      title: title,
      completed: true
    })
    members.map(async member => {
      await this.props.createNotification({
        variables: {
          seen: false,
          groupId: id,
          content: `${
            title
          } has been completed you have earned the following reward:  ${
            reward
          }`,
          userId: member.id
        }
      })
    })
    this.props.history.push('/groups')
  }
  render() {
    const { tasks, createdAt } = this.props.Group
    const numOfCompletedTasks = tasks.filter(
      task => task.status === 'Completed'
    ).length
    return (
      <Info>
        {numOfCompletedTasks === tasks.length &&
          tasks.length !== 0 && (
            <Button onClick={this.handleCompleteGroup}>
              Close and Complete Group
            </Button>
          )}
        <Header>
          <MinusCircleIcon onClick={this.handleGroupDelete} />
          <Image src={house} />
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
          <DetailWrapper>
            <Detail>
              <Highlight>{tasks.length}</Highlight> Tasks Assigned
            </Detail>
            <Detail>
              <Highlight>{numOfCompletedTasks}</Highlight> Tasks Completed
            </Detail>
            <Detail>
              <Highlight>{dateFormat(createdAt, 'fullDate')}</Highlight>
            </Detail>
            <Detail>
              <Highlight>Reward:</Highlight> {this.props.Group.reward}
            </Detail>
          </DetailWrapper>
        </Header>
      </Info>
    )
  }
}

const UPDATE_GROUP_MUTATION = gql`
  mutation updateGroup($id: ID!, $title: String!, $completed: Boolean!) {
    updateGroup(id: $id, title: $title, completed: $completed) {
      id
      title
      completed
    }
  }
`

const DELETE_GROUP_MUTATION = gql`
  mutation deleteGroup($id: ID!) {
    deleteGroup(id: $id) {
      title
    }
  }
`

const CREATE_NOTIFICATION = gql`
  mutation newNotification(
    $seen: Boolean!
    $groupId: ID!
    $userId: ID!
    $content: String!
  ) {
    createNotification(
      seen: $seen
      groupId: $groupId
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
    graphql(UPDATE_GROUP_MUTATION, {
      name: 'updateGroupMutation',
      props: ({ ownProps, updateGroupMutation }) => ({
        updateGroup: values => {
          updateGroupMutation({
            variables: {
              id: ownProps.match.params.groupid,
              title: values.title,
              completed: values.completed
            }
          })
        }
      })
    }),
    graphql(DELETE_GROUP_MUTATION, {
      name: 'deleteGroupMutation',
      props: ({ ownProps, deleteGroupMutation }) => ({
        deleteGroup: values => {
          deleteGroupMutation({
            variables: {
              id: ownProps.match.params.groupid
            }
          })
        }
      })
    }),
    graphql(CREATE_NOTIFICATION, { name: 'createNotification' })
  )(GroupHeader)
)
