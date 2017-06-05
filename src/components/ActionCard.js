import React from 'react'
import styled, { css } from 'styled-components'
import placeholder from '../../public/images/placeholder.png'
import Refresh from 'react-icons/lib/ti/refresh'
import Download from 'react-icons/lib/ti/download'

const CardWrapper = styled.div`
  border: 0.5px solid lightgray;
  margin: 3% auto;
  padding: 3%;
  box-shadow: 0px 1.5px 1px #888888;


  img {
    width: 50px;
    clip-path: circle(50% at 50% 50%);
    float: left;
    margin-right: 10px;
    margin-bottom: 3%;
  }

  h3 {
    margin: 0 0 5px;
    font-size: 18px;
  }
  h4 {
    margin: 0 0 5px;
    font-size: 12px;
    color: gray;
  }
  h5 {
    float: right;
    color: gray;
  }
  hr {
    clear: both;
  }
`

const Actions = styled.div`
  display: flex;
`
const ActionTextItem = styled.p`
    flex: 1;
    text-align: center;
    justify-content: center;
    margin: 10px auto 0 auto;
`
const icon = css`
  font-size: 22px;
  margin-right: 5px;
`

const RefreshIcon = styled(Refresh)`
  ${icon}
`
const DownloadIcon = styled(Download)`
  ${icon}
`

class ActionCard extends React.Component {
  render() {
    return (
      <CardWrapper>
        <h5>1/26/2017</h5>
        <img src={placeholder} alt="" />
        <h3>Entire Family</h3>
        <h4>2/12 Tasks Completed</h4>
        <hr />
        <Actions>
          <ActionTextItem><RefreshIcon />Approve</ActionTextItem>
          <ActionTextItem><DownloadIcon />Reply</ActionTextItem>
        </Actions>
      </CardWrapper>
    )
  }
}

export default ActionCard
