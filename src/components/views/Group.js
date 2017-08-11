import React from 'react'
import Button from '../shared/Button'
import ActionSlide from '../shared/ActionSlide'
import Task from '../cards/Task'
import Member from '../cards/Member'
import ContentWrapper from '../../styles/ContentWrapper'
import InfoCard from '../cards/InfoCard'
import Switcher from '../shared/Switcher'
import { gql, withApollo } from 'react-apollo'

class Group extends React.Component {
  state = {
    openMenu: false,
    active: 'Tasks',
    name: null,
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
          name: results.data.getGroup.name,
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
          name: values.name
        }
      }
    })
  }
  handleSwitcherClick = e => {
    this.setState({
      active: e.target.dataset.item,
      completed: false
    })
  }

  handleStateUpdate = (e, textValue) => {
    console.log(textValue)
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
  handleAddTodo = (e, refs) => {
    e.preventDefault()
    this.props.client
      .mutate({
        mutation: ADD_TASK_MUTATION,
        variables: {
          description: refs.description.value,
          groupId: this.props.match.params.groupid,
          needsReviewed: true,
          title: refs.name.value
        }
      })
      .then(results => {
        this.props.client
          .query({
            query: GET_GROUP,
            variables: { id: this.props.match.params.groupid }
          })
          .then(results => {})
      })
  }
  render() {
    return (
      <div>
        {/* TODO: update state.name when user types in settings input box */}
        <InfoCard
          name={this.state.name}
          handleGroupUpdate={this.handleGroupUpdate}
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
            ? <div>
                <a
                  href="#"
                  name="completed"
                  onClick={e => this.handleStateUpdate(e, 'completed')}>
                  {this.state.completed ? 'Hide' : 'Show'} Completed
                </a>
                {this.state.tasks
                  .filter(
                    task => (this.state.completed ? task : !task.completed)
                  )
                  .map(task => {
                    return (
                      <Task
                        description={task.description}
                        title={task.title}
                        key={task.id}
                        id={task.id}
                        completed={task.completed}
                      />
                    )
                  })}

                {!this.state.openMenu &&
                  <Button
                    sticky
                    name="openMenu"
                    onClick={e => this.handleStateUpdate(e)}>
                    + Add A Task
                  </Button>}
              </div>
            : <div>
                <Member />

                <Button sticky onClick={this.handleStateUpdate}>
                  + Add A Memeber
                </Button>
              </div>}
        </ContentWrapper>
        <ActionSlide
          open={this.state.openMenu}
          handleClose={this.handleStateUpdate}
          handleAdd={this.handleAddTodo}
          type={this.state.active}
        />
      </div>
    )
  }
}

const GET_GROUP = gql`
  query getGroup($id: ID!) {
    getGroup(id: $id) {
      name
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

const UPDATE_GROUP_MUTATION = gql`
  mutation updateGroup($group: UpdateGroupInput!) {
    updateGroup(input: $group) {
      changedGroup {
        id
        name
      }
    }
  }
`

const ADD_TASK_MUTATION = gql`
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
