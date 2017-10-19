import React from "react"
import Button from "../shared/Button"
import ActionSlide from "../shared/ActionSlide"
import ContentWrapper from "../../styles/ContentWrapper"
import Switcher from "../shared/Switcher"
import TaskList from "../shared/TaskList"
import MemberList from "../shared/MemberList"
import { gql, graphql, withApollo, compose } from "react-apollo"
import { Motion, spring } from "react-motion"
import styled, { css } from "styled-components"
import Users from "react-feather"
import Modal from "../shared/Modal"
import AddTask from "../shared/AddTask"
import AddGroupMember from "../shared/AddGroupMember"
import house from "../../../public/images/house.svg"
import { CheckCircle } from "react-feather"
import dateFormat from "dateformat"
import {
  EditIcon,
  Info,
  MinusCircleIcon,
  Image,
  Header,
  Detail,
  DetailWrapper,
  Highlight
} from "../../styles/theme/infoCard"

class Group extends React.Component {
  state = {
    openMenu: false,
    active: "Tasks",
    members: [],
    title: null,
    edit: false,
    id: null,
    tasks: [],
    completed: false,
    edit: false
  }
  componentWillReceiveProps(nextProps) {}

  componentWillUpdate(nextProps) {
    if (
      nextProps.getGroup.loading === false &&
      this.props.getGroup.loading === true
    ) {
      console.log(nextProps.getGroup.Group)
      this.populateGroupData(nextProps.getGroup.Group)
    }
  }
  componentDidMount() {
    if (!this.props.getGroup.loading) {
      this.populateGroupData(this.props.getGroup.Group)
    }
  }
  populateGroupData = group => {
    this.setState({
      title: group.title,
      id: group.id,
      members: group.members.map(member => {
        return {
          name: member.name,
          id: member.id
        }
      }),
      tasks: group.tasks.map(item => {
        return {
          description: item.description,
          completed: item.completed,
          title: item.title,
          id: item.id
        }
      })
    })
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

  handleSubmit = e => {
    e.preventDefault()
    this.props.updateGroup({ title: this.state.title })
    this.handleStateUpdate(e, "edit")
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

  render() {
    const { member, task, title, created, tasks } = this.props

    return (
      <div>
        <Info>
          <MinusCircleIcon onClick={this.handleGroupDelete} />
          <Image src={house} />
          <Header>
            <EditIcon onClick={e => this.handleStateUpdate(e, "edit")} />
            {this.state.edit ? (
              <div>
                <input
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleStateUpdate}
                />
                <CheckCircle onClick={this.handleSubmit} />
              </div>
            ) : (
              this.state.title
            )}
          </Header>
          <DetailWrapper>
            <Detail>
              <Highlight>{this.state.tasks.length}</Highlight> Tasks Assigned
            </Detail>
            <Detail>
              <Highlight>
                {this.state.tasks.filter(task => task.completed).length}
              </Highlight>{" "}
              Tasks Completed
            </Detail>
            <Detail>
              <Highlight>{dateFormat(created, "fullDate")}</Highlight>
            </Detail>
          </DetailWrapper>
        </Info>

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
            <MemberList members={this.state.members} />
          )}

          {this.state.active === "Tasks" ? (
            <Modal button={<Button sticky>+ Add a new Task</Button>}>
              {({ handleOpenCloseModal }) => (
                <AddTask
                  refetch={this.props.getGroup.refetch}
                  handleOpenCloseModal={handleOpenCloseModal}
                  groupId={this.props.match.params.groupid}
                />
              )}
            </Modal>
          ) : (
            <Modal button={<Button sticky>+ Add a Member to Group</Button>}>
              {({ handleOpenCloseModal }) => (
                <AddGroupMember groupId={this.props.match.params.groupid} />
              )}
            </Modal>
          )}
          {/* <ActionSlide
            open={this.state.openMenu}
            handleClose={this.handleStateUpdate}
            handleAdd={this.props.createTask}
            type={this.state.active}
          /> */}
        </ContentWrapper>
      </div>
    )
  }
}

const GET_GROUP = gql`
  query getGroup($id: ID!) {
    Group(id: $id) {
      title
      members {
        name
        id
      }
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
