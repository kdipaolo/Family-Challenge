import React from 'react'
import Group from '../cards/Group'
import ContentWrapper from '../../styles/ContentWrapper'
import { graphql, gql, compose } from 'react-apollo'
import Button from '../shared/Button'
import Loading from '../shared/Loading'
import ActionSlide from '../shared/ActionSlide'

class Groups extends React.Component {
  state = {
    inTransition: false,
    openMenu: false,
    active: false,
    open: false
  }
  componentDidMount() {
    this.props.getGroups.refetch()
  }
  handleButtonClick = () => {
    this.setState(state => ({
      openMenu: !state.openMenu,
      groups: []
    }))
  }

  handleNewGroup = async values => {
    const response = await this.props.createGroup(values)
    this.setState({
      openMenu: false
    })
    console.log(response)
    const id = response.data.createGroup.changedGroup.id
    this.props.history.push(`/group/${id}`)
  }

  render() {
    return (
      <ContentWrapper>
        {this.props.getGroups.loading
          ? <Loading />
          : this.props.getGroups.viewer.allGroups.edges.map((group, i) =>
              <Group
                key={i}
                id={group.node.id}
                title={group.node.title}
                created={group.node.createdAt}
                tasks={group.node.tasks.edges.length}
                dueDate={group.node.dueDate}
              />
            )}
        {!this.state.openMenu &&
          <Button sticky onClick={this.handleButtonClick}>
            + Add a new group
          </Button>}
        <ActionSlide
          handleAdd={this.handleNewGroup}
          open={this.state.openMenu}
          handleClose={this.handleButtonClick}
          type="Group"
        />
      </ContentWrapper>
    )
  }
}

const GET_GROUPS = gql`
  query testing {
    viewer {
      allGroups(orderBy: { field: createdAt, direction: DESC }) {
        edges {
          node {
            title
            id
            dueDate
            createdAt
            tasks {
              edges {
                node {
                  id
                  completed
                  description
                }
              }
            }
          }
        }
      }
    }
  }
`

const NEW_GROUP_MUTATION = gql`
  mutation CreateNewGroup($title: String!, $dueDate: DateTime!) {
    createGroup(input: { title: $title, dueDate: $dueDate }) {
      changedGroup {
        id
        title
      }
    }
  }
`

export default compose(
  graphql(GET_GROUPS, {
    name: 'getGroups'
  }),
  graphql(NEW_GROUP_MUTATION, {
    name: 'newGroupMutation',
    props: ({ ownProps, newGroupMutation }) => ({
      createGroup: values =>
        newGroupMutation({
          variables: {
            title: values.title,
            dueDate: values.dueDate,
            description: values.description
          }
        })
    })
  })
)(Groups)
