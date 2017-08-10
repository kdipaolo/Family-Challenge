import React from 'react'
import Group from '../cards/Group'
import ContentWrapper from '../../styles/ContentWrapper'
import { graphql, gql, withApollo } from 'react-apollo'
import Button from '../shared/Button'
import Alert from '../shared/Alert'
import ActionSlide from '../shared/ActionSlide'

class Groups extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inTransition: false,
      openMenu: false,
      active: false
    }
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleNewGroup = this.handleNewGroup.bind(this)
  }
  handleButtonClick() {
    this.setState({
      openMenu: !this.state.openMenu,
      groups: []
    })
  }

  handleNewGroup(values) {
    this.props.client
      .mutate({
        mutation: NEW_GROUP_MUTATION,
        variables: {
          name: values.name,
          dueDate: values.dueDate,
          description: values.description
        }
      })
      .then(results => {
        this.props.client
          .query({
            query: GET_GROUPS
          })
          .then(results => {
            this.props.getGroups.refetch()
          })
      })
  }
  render() {
    return (
      <ContentWrapper>
        {this.props.getGroups.loading
          ? <h1>Loading..</h1>
          : this.props.getGroups.viewer.allGroups.edges.map((group, i) =>
              <Group
                key={i}
                id={group.node.id}
                name={group.node.name}
                created={group.node.createdAt}
                tasks={group.node.tasks.edges.length}
                dueDate={group.node.dueDate}
              />
            )}
        <Button sticky onClick={this.handleButtonClick}>
          + Add a new group
        </Button>
        <ActionSlide
          handleAdd={this.handleNewGroup}
          open={this.state.openMenu}
          handleClose={this.handleButtonClick}
          type="Group"
        />
        <Alert text="New Group Created!" transition={this.state.inTransition} />
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
            name
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
  mutation CreateNewGroup($name: String!, $dueDate: DateTime!) {
    createGroup(input: { name: $name, dueDate: $dueDate }) {
      changedGroup {
        id
        name
      }
    }
  }
`

export default withApollo(graphql(GET_GROUPS, { name: 'getGroups' })(Groups))
