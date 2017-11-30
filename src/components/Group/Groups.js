import React from 'react'
import GroupCard from './GroupCard'
import ContentWrapper from '../../styles/ContentWrapper'
import { graphql, gql, compose } from 'react-apollo'
import Button from '../shared/Button'
import NoInfo from '../shared/NoInfo'
import Loading from '../shared/Loading'
import Modal from '../shared/Modal'
import AddGroup from './AddGroup'
import { USER_ID } from '../../utils/constants'
import { SSL_OP_PKCS1_CHECK_1 } from 'constants'
import { DIRECTIVE } from 'graphql/language/kinds'

class Groups extends React.Component {
  state = {
    inTransition: false,
    openMenu: false,
    active: false,
    open: false
  }

  render() {
    const ifParent = this.props.user && this.props.user.role === 'Parent'
    const { loading, allGroups } = this.props.getGroups
    return (
      <ContentWrapper>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {allGroups.map((group, i) => (
              <GroupCard
                key={i}
                id={group.id}
                title={group.title}
                created={group.createdAt}
                tasks={group.tasks.length}
                dueDate={group.dueDate}
              />
            ))}
            {allGroups.length === 0 && <NoInfo />}
          </div>
        )}

        {ifParent && (
          <Modal button={<Button sticky>+ Add a new group</Button>}>
            {({ handleOpenCloseModal }) => <AddGroup user={this.props.user} />}
          </Modal>
        )}
      </ContentWrapper>
    )
  }
}

const GET_GROUPS = gql`
  query getGroups {
    allGroups {
      title
      id
      dueDate
      createdAt
      tasks {
        id
        status
        description
        title
      }
    }
  }
`

//

export default compose(
  graphql(GET_GROUPS, {
    name: 'getGroups'
  })
)(Groups)
