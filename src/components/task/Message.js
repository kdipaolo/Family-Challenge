import React from 'react'
import styled, { css } from 'styled-components'
import ThumbUp from 'react-icons/lib/ti/thumbs-up'

import moment from 'moment'
function submitted() {
  return css`
    border: 1px solid ${props => props.theme.colors.cardBorer};
    color: #333;
  `
}

function completed() {
  return css`
    background-color: ${props => props.theme.colors.completed};
    color: #fff;
    border: none;
  `
}
function rejected() {
  return css`
    background-color: ${props => props.theme.colors.rejected};
    color: #fff;
    border: none;
  `
}

const Content = styled.p`
  flex: 4;
  margin: 0;
`

const MessageWrapper = styled.div`
  border: 1px solid ${props => props.theme.colors.cardBorer};
  padding: 4%;
  margin: 3% 0;
  font-size: 13px;
  border-radius: 4px;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  ${props => props.status === 'Completed' && completed()};
  ${props => props.status === 'Submitted' && submitted()};
  ${props => props.rejected && rejected()};
`

const Timestamp = styled.p`
  flex: 1;
  text-align: right;

  font-weight: bold;
  margin: 0;
`

const icon = css`
  font-size: 22px;
  margin-right: 5px;
`

const ThumbUpIcon = styled(ThumbUp)`
  ${icon};
`

class Message extends React.Component {
  render() {
    const { alert, date } = this.props
    return (
      <MessageWrapper status={this.props.status}>
        {!alert && (
          <Content>
            {this.props.content} - {this.props.status}
          </Content>
        )}
        {this.props.status === 'Completed' && (
          <Content>
            <ThumbUpIcon />Task has been approved!
          </Content>
        )}

        <Timestamp>{moment(date).format('MMM Do YY')}</Timestamp>
      </MessageWrapper>
    )
  }
}

export default Message
