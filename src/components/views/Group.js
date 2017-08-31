import React from 'react'
import Button from '../shared/Button'
import ActionSlide from '../shared/ActionSlide'
import ContentWrapper from '../../styles/ContentWrapper'
import InfoCard from '../cards/InfoCard'
import Switcher from '../shared/Switcher'
import TaskList from '../shared/TaskList'
import MemberList from '../shared/MemberList'
import { gql, graphql, withApollo } from 'react-apollo'

class Group extends React.Component {
  state = {
    openMenu: false,
    active: 'Tasks',
    title: null,
    settings: false,
    tasks: [],
    completed: false
  }

  componentDidMount() {
    this.props.client
      .query({
        query: GET_GROUP,
        variables: { id: this.props.match.params.groupid }
      })
      .then(results => {
        this.setState({
          title: results.data.getGroup.title,
          tasks: results.data.getGroup.tasks.edges.map(item => {
            return {
              description: item.node.description,
              completed: item.node.completed,
              title: item.node.title,
              id: item.node.id
            }
          })
        })
      })
  }
  handleGroupUpdate = values => {
    this.props.client.mutate({
      mutation: UPDATE_GROUP_MUTATION,
      variables: {
        group: {
          id: this.props.match.params.groupid,
          title: values.title
        }
      }
    })
  }
  handleGroupDelete = () => {
    var confirmation = confirm('are you sure?')
    if (confirmation) {
      this.props.client
        .mutate({
          mutation: DELETE_GROUP_MUTATION,
          variables: {
            group: {
              id: this.props.match.params.groupid
            }
          }
        })
        .then(result => {
          this.props.history.push('/groups')
        })
    } else {
      console.log('DENIED')
    }
  }
  handleSwitcherClick = e => {
    this.setState({
      active: e.target.dataset.item,
      completed: false
    })
  }

  handleStateUpdate = (e, textValue) => {
    if (textValue) {
      this.setState({
        [textValue]: !this.state[textValue]
      })
      return
    } else {
      const value = e.target.value
      const name = e.target.name

      if (value) {
        this.setState({
          [name]: value
        })
      } else {
        this.setState({
          [name]: !this.state[name]
        })
      }
    }
  }
  handleCreateTask = state => {
    this.props.client
      .mutate({
        mutation: CREATE_TASK_MUTATION,
        variables: {
          description: state.description,
          groupId: this.props.match.params.groupid,
          needsReviewed: true,
          title: state.title
        }
      })
      .then(results => {
        this.props.client
          .query({
            query: GET_TASKS_IN_GROUP,
            variables: {
              id: this.props.match.params.groupid
            }
          })
          .then(results => {
            this.handleStateUpdate('e', 'openMenu')
          })
      })
  }
  render() {
    return (
      <div>
        <InfoCard
          title={this.state.title}
          handleUpdate={this.handleGroupUpdate}
          handleDelete={this.handleGroupDelete}
          tasks={this.state.tasks}
          settings={this.state.settings}
          handleStateUpdate={this.handleStateUpdate}
        />

        <Switcher
          active={this.state.active}
          handleSwitcherClick={this.handleSwitcherClick}
          links={['Tasks', 'Members']}
        />

        <ContentWrapper>
          {this.state.active === 'Tasks'
            ? <TaskList
                handleStateUpdate={this.handleStateUpdate}
                tasks={this.state.tasks}
                completed={this.state.completed}
                openMenu={this.state.openMenu}
              />
            : <MemberList />}
        </ContentWrapper>
        <ActionSlide
          open={this.state.openMenu}
          handleClose={this.handleStateUpdate}
          handleAdd={this.handleCreateTask}
          type={this.state.active}
        />
      </div>
    )
  }
}

const GET_GROUP = gql`
  query getGroup($id: ID!) {
    getGroup(id: $id) {
      title
      tasks {
        edges {
          node {
            id
            completed
            title
            description
          }
        }
      }
    }
  }
`

const GET_TASKS_IN_GROUP = gql`
  query getTasksInGroup($id: ID!) {
    getGroup(id: $id) {
      tasks {
        edges {
          node {
            title
          }
        }
      }
    }
  }
`

const UPDATE_GROUP_MUTATION = gql`
  mutation updateGroup($group: UpdateGroupInput!) {
    updateGroup(input: $group) {
      changedGroup {
        id
        title
      }
    }
  }
`

const DELETE_GROUP_MUTATION = gql`
  mutation deleteGroup($group: DeleteGroupInput!) {
    deleteGroup(input: $group) {
      changedGroup {
        title
      }
    }
  }
`

const CREATE_TASK_MUTATION = gql`
  mutation CreateNewTask(
    $groupId: ID!
    $description: String!
    $title: String!
    $needsReviewed: Boolean!
  ) {
    createTask(
      input: {
        groupId: $groupId
        description: $description
        needsReviewed: $needsReviewed
        title: $title
      }
    ) {
      changedTask {
        description
        needsReviewed
        title
      }
    }
  }
`

export default withApollo(Group)
