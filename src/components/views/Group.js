import React from "react"
import Button from "../shared/Button"
import ActionSlide from "../shared/ActionSlide"
import ContentWrapper from "../../styles/ContentWrapper"
import InfoCard from "../cards/InfoCard"
import Switcher from "../shared/Switcher"
import TaskList from "../shared/TaskList"
import MemberList from "../shared/MemberList"
import { gql, graphql, withApollo, compose } from "react-apollo"
import { Motion, spring } from "react-motion"
import styled, { css } from "styled-components"
import Users from "react-feather"
import Modal from "../shared/Modal"
import AddTask from "../shared/AddTask"
class Group extends React.Component {
  state = {
    openMenu: false,
    active: "Tasks",
    title: null,
    edit: false,
    id: null,
    tasks: [],
    completed: false
  }
  componentWillUpdate(nextProps) {
    if (
      nextProps.getGroup.loading === false &&
      this.props.getGroup.loading === true
    ) {
      this.setState({
        title: nextProps.getGroup.Group.title,
        id: nextProps.getGroup.Group.id,
        tasks: nextProps.getGroup.Group.tasks.map(item => {
          return {
            description: item.description,
            completed: item.completed,
            title: item.title,
            id: item.id
          }
        })
      })
    }
  }
  handleGroupDelete = () => {
    var confirmation = confirm("are you sure?")
    if (confirmation) {
      this.props.deleteGroup()
      this.props.history.goBack()
    } else {
      console.log("DENIED")
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
  handleCreateTask = state => {}
  render() {
    return (
      <div>
        <InfoCard
          title={this.state.title}
          handleUpdate={this.props.updateGroup}
          handleDelete={this.handleGroupDelete}
          tasks={this.state.tasks}
          groupId={this.state.id}
          edit={this.state.edit}
          handleStateUpdate={this.handleStateUpdate}
        />

        <Switcher
          active={this.state.active}
          handleSwitcherClick={this.handleSwitcherClick}
          links={["Tasks", "Members"]}
        />

        <ContentWrapper>
          {this.state.active === "Tasks" ? (
            <TaskList
              loading={this.props.getGroup.loading}
              handleStateUpdate={this.handleStateUpdate}
              tasks={this.state.tasks}
              completed={this.state.completed}
              openMenu={this.state.openMenu}
            />
          ) : (
            <MemberList />
          )}

          <Modal button={<Button sticky>+ Add a new Task</Button>}>
            {({ handleOpenCloseModal }) => <AddTask />}
          </Modal>

          <ActionSlide
            open={this.state.openMenu}
            handleClose={this.handleStateUpdate}
            handleAdd={this.props.createTask}
            type={this.state.active}
          />
        </ContentWrapper>
      </div>
    )
  }
}

const GET_GROUP = gql`
  query getGroup($id: ID!) {
    Group(id: $id) {
      title
      tasks {
        id
        completed
        title
        description
      }
    }
  }
`

const UPDATE_GROUP_MUTATION = gql`
  mutation updateGroup($id: ID!, $title: String!) {
    updateGroup(id: $id, title: $title) {
      id
      title
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

const CREATE_TASK_MUTATION = gql`
  mutation CreateNewTask(
    $groupId: ID!
    $description: String!
    $title: String!
    $needsReviewed: Boolean!
    $completed: Boolean!
  ) {
    createTask(
      groupId: $groupId
      description: $description
      needsReviewed: $needsReviewed
      title: $title
      completed: $completed
    ) {
      description
      needsReviewed
      title
    }
  }
`

export default compose(
  graphql(GET_GROUP, {
    name: "getGroup",
    options: props => ({ variables: { id: props.match.params.groupid } })
  }),
  graphql(UPDATE_GROUP_MUTATION, {
    name: "updateGroupMutation",
    props: ({ ownProps, updateGroupMutation }) => ({
      updateGroup: values => {
        updateGroupMutation({
          variables: {
            id: ownProps.match.params.groupid,
            title: values.title
          }
        })
      }
    })
  }),
  graphql(DELETE_GROUP_MUTATION, {
    name: "deleteGroupMutation",
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
  graphql(CREATE_TASK_MUTATION, {
    name: "createTaskMutation",
    props: ({ ownProps, createTaskMutation }) => ({
      createTask: values => {
        // Where is values coming from?
        createTaskMutation({
          variables: {
            description: values.description,
            groupId: ownProps.match.params.groupid,
            needsReviewed: true,
            title: values.title,
            completed: false
          }
        }).then(res => {
          ownProps.getGroup.refetch()
        })
      }
    })
  })
)(Group)
