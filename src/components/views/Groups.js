import React from 'react'
import Group from '../cards/Group'
import ContentWrapper from '../../styles/ContentWrapper'
import { graphql, gql, withApollo } from 'react-apollo'
import Button from '../shared/Button'
import ActionSlide from '../shared/ActionSlide'

class Groups extends React.Component {
  state = {
    inTransition: false,
    openMenu: false,
    active: false,
    open: false
  }
  x
  handleButtonClick = () => {
    this.setState({
      openMenu: !this.state.openMenu,
      groups: []
    })
  }

  handleNewGroup = values => {
    this.props.client
      .mutate({
        mutation: NEW_GROUP_MUTATION,
        variables: {
          title: values.title,
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
  componentDidMount() {
    this.props.client
      .query({
        query: GET_GROUPS
      })
      .then(results => {
        console.log(results)
        this.props.getGroups.refetch()
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

export default withApollo(graphql(GET_GROUPS, { name: 'getGroups' })(Groups))
