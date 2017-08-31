import React from 'react'
import styled from 'styled-components'
import Button from '../shared/Button'
import alarm from '../../../public/images/alarm-clock.svg'
const NotificationWrapper = styled.div`
  background: ${props => props.theme.colors.primary};
  padding: 5%;
  text-align: center;
  margin: 3% auto 0 auto;
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.cardBorer};
  line-height: 25px;
  letter-spacing: 1px;
  font-weight: 400;
`
const Image = styled.img`width: 50px;`

class Notification extends React.Component {
  render() {
    return (
      <div>
        <NotificationWrapper>
          <Image src={alarm} />
          <p>
            You have no groups. Create a group to begin assigning tasks to your
            members
          </p>
          <Button border>Dismiss</Button>
        </NotificationWrapper>
      </div>
    )
  }
}

export default Notification
