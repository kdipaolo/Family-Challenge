import React from 'react'
import styled from 'styled-components'
import styles from '../styles/config'
import Button from './Button'
const NotificationWrapper = styled.div`
  background: ${styles.colors.primary};
  padding: 5%;
  text-align: center;
  margin: 3% auto 0 auto;
  color: #e5e8fb;
  line-height: 25px;
  letter-spacing: 1px;
  font-weight: 400;
`

class Notification extends React.Component {
  render() {
    return (
      <div>
        <NotificationWrapper>
          <p>
            You have no groups. Create a group to begin assigning tasks to your members
          </p>
        </NotificationWrapper>
        <Button color="#364796" title="Add Group" />
      </div>
    )
  }
}

export default Notification
