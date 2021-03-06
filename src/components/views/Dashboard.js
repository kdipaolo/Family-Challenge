import React from 'react'
import Notification from '../shared/Notification'
import ContentWrapper from '../../styles/ContentWrapper'
import { gql, graphql } from 'react-apollo'
import { USER_ID } from '../../utils/constants'

class Dashboard extends React.Component {
  render() {
    const currentUser = this.props.user
    // const isParent = () => {
    //   return currentUser && currentUser.role === 'Parent'
    // }

    return (
      <div>
        {currentUser &&
          this.props.getNotifications.allNotifications && (
            <ContentWrapper>
              {/* <Notification
              title="You have no groups. Create a group to begin assigning tasks to your members"
              link="/"
              big
            /> */}
              {this.props.getNotifications.allNotifications.map(
                notification => (
                  <Notification
                    title={notification.content}
                    link={
                      notification.task
                        ? `/task/${notification.task.id}`
                        : `/group/${notification.group.id}`
                    }
                    award={notification.group}
                  />
                )
              )}
            </ContentWrapper>
          )}
      </div>
    )
  }
}

const GET_NOTIFICATIONS = gql`
  query getNotifications($id: ID!) {
    allNotifications(filter: { user: { id: $id } }) {
      id
      seen
      content
      group {
        id
        title
      }
      task {
        id
        title
        status
        assignee {
          name
        }
      }
    }
  }
`
export default graphql(GET_NOTIFICATIONS, {
  name: 'getNotifications',
  options: props => ({ variables: { id: localStorage.getItem(USER_ID) } })
})(Dashboard)
