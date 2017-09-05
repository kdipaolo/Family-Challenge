import React from 'react'
import styled, { css } from 'styled-components'
import ContentWrapper from '../../styles/ContentWrapper'
import ThumbUp from 'react-icons/lib/ti/thumbs-up'
import ThumbDown from 'react-icons/lib/ti/thumbs-down'

function response() {
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
  ${props => props.response && response()} ${props =>
      props.completed && completed()} ${props => props.rejected && rejected()};
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
  ${icon}
`
const ThumbDownIcon = styled(ThumbDown)`
  ${icon}
`

class Message extends React.Component {
  render() {
    const { response, completed, alert, rejected } = this.props
    return (
      <MessageWrapper
        response={response}
        completed={completed}
        rejected={rejected}>
        {!alert &&
          <Content>
            {this.props.content}
          </Content>}
        {completed &&
          <Content>
            <ThumbUpIcon />Task has been approved!
          </Content>}
        {rejected &&
          <Content>
            <ThumbDownIcon />Task has been rejected!
          </Content>}

        <Timestamp>1/1/2017</Timestamp>
      </MessageWrapper>
    )
  }
}

export default Message
