import React from 'react'
import { Info } from '../../styles/theme/infoCard'
import { USER_ID } from '../../constants'
import { gql, graphql, withApollo, compose } from 'react-apollo'
import Button from '../shared/Button'
import styled from 'styled-components'

const ProfileField = styled.div`
  padding: 3%;
  border-bottom: 1px solid lightgray;
  margin: 2%;
  display: flex;
`
const ProfileFieldKey = styled.span`flex: 2;`
const ProfileFieldValue = styled.span`
  flex: 2;
  font-weight: bold;
`

class Settings extends React.Component {
  state = {
    edit: false,
    name: null
  }
  componentDidMount() {
    if (this.props.user) {
      this.setState({
        name: this.props.user.name
      })
    }
  }
  updateState = e => {
    this.setState({
      name: e.target.value
    })
  }
  toggleEdit = async () => {
    if (this.state.edit) {
      await this.props.updateUserMutation({
        variables: {
          name: this.state.name,
          id: localStorage.getItem(USER_ID)
        }
      })
      await this.props.refetch()
    }
    this.setState(state => ({
      edit: !state.edit
    }))
  }
  render() {
    const { user } = this.props
    const { edit, name } = this.state
    return (
      <Info>
        <h1>Profile</h1>
        {user && (
          <ProfileField>
            <ProfileFieldKey>Name:</ProfileFieldKey>
            <ProfileFieldValue>
              {!edit ? (
                <span> {name}</span>
              ) : (
                <input onChange={this.updateState} value={name} />
              )}
            </ProfileFieldValue>
          </ProfileField>
        )}
        <Button onClick={this.toggleEdit}>
          {edit ? 'Save' : 'Edit'} Profile
        </Button>
      </Info>
    )
  }
}

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($id: ID!, $name: String!) {
    updateUser(id: $id, name: $name) {
      id
      name
    }
  }
`

export default compose(
  graphql(UPDATE_USER_MUTATION, {
    name: 'updateUserMutation'
  })
)(Settings)
