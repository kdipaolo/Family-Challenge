import React from 'react'
import styled, { css } from 'styled-components'
import Button from '../shared/Button'
import alarm from '../../../public/images/alarm-clock.svg'
import trophy from '../../../public/images/trophy.svg'
import { Link } from 'react-router-dom'
import { gql, compose, graphql } from 'react-apollo'

const NotificationWrapper = styled.div`
  background: ${props => props.theme.colors.primary};
  padding: 3%;
  text-align: center;
  margin: 3% auto 0 auto;
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.cardBorer};
  line-height: 25px;
  letter-spacing: 1px;
  font-weight: 400;
  position: relative;
`
const Image = styled.img`
  width: 40px;
`

const Dismiss = styled.span`
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 22px;
`

const Title = styled.p`
  margin: 0;
`

class Notification extends React.Component {
  handleDismiss = () => {
    this.props.updateNotification({
      variables: {
        id: this.props.match.params.taskid,
        seen: true
      }
    })
  }
  render() {
    return (
      <Link to={this.props.link}>
        <NotificationWrapper {...this.props}>
          <Image src={this.props.award ? trophy : alarm} />
          <Title>{this.props.title}</Title>
          <Dismiss onClick={this.handleDismiss}>X</Dismiss>
        </NotificationWrapper>
      </Link>
    )
  }
}

const UPDATE_NOTIFICATION_MUTATION = gql`
  mutation updateNotification($id: ID!, $seen: Boolean!) {
    updateNotification(id: $id, seen: $seen) {
      id
    }
  }
`

export default graphql(UPDATE_NOTIFICATION_MUTATION, {
  name: 'updateNotification'
})(Notification)
