import React from "react"
import { Info, MinusCircleIcon } from "../../styles/theme/infoCard"
import { gql, compose, graphql } from "react-apollo"

class MemberHeader extends React.Component {
  state = {
    name: null
  }
  componentDidMount() {
    this.setState({
      name: this.props.User.name
    })
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.User.name !== this.props.User.name) {
      this.setState({
        name: nextProps.User.name
      })
    }
  }
  handleDeleteUser = () => {
    var confirmation = confirm("are you sure?")
    if (confirmation) {
      this.props.deleteTask()
      this.props.history.goBack()
    } else {
      console.log("DENIED")
    }
  }
  render() {
    return (
      <Info>
        <MinusCircleIcon onClick={this.handleDeleteUser} />
        {this.state.name}
      </Info>
    )
  }
}

const DELETE_USER_MUTATION = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      name
    }
  }
`

export default compose(
  graphql(DELETE_USER_MUTATION, {
    name: "deleteUserMutation",
    props: ({ ownProps, deleteUserMutation }) => ({
      deleteTask: values => {
        deleteUserMutation({
          variables: {
            id: ownProps.match.params.memberid
          }
        })
      }
    })
  })
)(MemberHeader)
