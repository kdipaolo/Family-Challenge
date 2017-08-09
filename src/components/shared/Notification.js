import React from 'react'
import styled from 'styled-components'
import Button from '../shared/Button'
const NotificationWrapper = styled.div`
  background: ${props => props.theme.colors.primary};
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
        <Button notification>Test</Button>
      </div>
    )
  }
}

export default Notification
