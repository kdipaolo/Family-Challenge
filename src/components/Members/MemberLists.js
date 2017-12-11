import React from 'react'
import { gql, graphql, withApollo, compose } from 'react-apollo'
import Task from '../task/TaskCard'
import ContentWrapper from '../../styles/ContentWrapper'
import Switcher from '../shared/Switcher'
import Button from '../shared/Button'
import { USER_ID } from '../../utils/constants'
import { withRouter } from 'react-router-dom'
class MemberLists extends React.Component {
  state = {
    active: 'Tasks'
  }
  handleSwitcherClick = e => {
    this.setState({
      active: e.target.dataset.item
    })
  }
  handleRemoveMember = async () => {
    const membersIds = await this.props.getMembers.User.members.map(
      member => member.id
    )
    const index = membersIds.indexOf(this.props.match.params.memberid)
    membersIds.splice(index, 1)

    await this.props.removeMemberFromFamily({
      variables: {
        id: localStorage.getItem(USER_ID),
        membersIds
      }
    })
    this.props.history.push('/members')
  }
  render() {
    return (
      <div>
        <Switcher
          handleSwitcherClick={this.handleSwitcherClick}
          active={this.state.active}
          links={['Tasks', 'Settings']}
        />
        <ContentWrapper>
          {this.state.active === 'Tasks' ? (
            <div>
              {this.props.User.tasks.map(task => (
                <Task key={task.id} {...task} />
              ))}
            </div>
          ) : (
            <div>
              <h1>Settings</h1>
              <Button danger onClick={this.handleRemoveMember}>
                Remove member from family
              </Button>
            </div>
          )}
        </ContentWrapper>
      </div>
    )
  }
}

const UPDATE_MEMBERS_MUTATION = gql`
  mutation removeMemberFromFamily($id: ID!, $membersIds: [ID!]) {
    updateUser(id: $id, membersIds: $membersIds) {
      id
    }
  }
`

const GET_MEMBERS_IN_FAMILY = gql`
  query getMembersInFamily($id: ID!) {
    User(id: $id) {
      members {
        id
      }
    }
  }
`

export default withRouter(
  compose(
    graphql(UPDATE_MEMBERS_MUTATION, {
      name: 'removeMemberFromFamily'
    }),
    graphql(GET_MEMBERS_IN_FAMILY, {
      name: 'getMembers',
      options: props => ({ variables: { id: localStorage.getItem(USER_ID) } })
    })
  )(MemberLists)
)
