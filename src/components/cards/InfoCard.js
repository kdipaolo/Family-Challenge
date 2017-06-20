import React from 'react'
import styled from 'styled-components'
import placeholder from '../../../public/images/placeholder.png'

const Info = styled.div`
  background-color: ${props => props.theme.colors.primaryDark};
  color: #fff;
  text-align: center;
  padding: 5%;

`
const Header = styled.h3`
  margin: 0;
  padding: 2%;
`
const Detail = styled.p`
  font-size: 13px;
  width: 50%;
  color: lightgray;

`
const DetailWrapper = styled.div`
  display: flex;
  flex-wrap:  wrap;
  justify-content: space-around;
`

const Highlight = styled.div`
  color: #fff;
  font-weight: bold;
  display: inline;
`

const Image = styled.img`
  width: 100px;
  clip-path: circle(50% at 50% 50%);
`

class InfoCard extends React.Component {
  render() {
    const { member, task } = this.props
    return (
      <Info>
        {member && <Image src={placeholder} alt="" />}
        <Header>Header Title</Header>
        <DetailWrapper>
          {task
            ? <Detail>Tasks Assigned By: <Highlight>Mom</Highlight></Detail>
            : <Detail><Highlight>5</Highlight> Tasks Assigned</Detail>}
          {!task && <Detail><Highlight>35</Highlight> Tasks Completed</Detail>}
          <Detail>
            {member ? 'Signed up' : 'Created'}
            {' '}
            on:
            {' '}
            <Highlight>5/5/2017</Highlight>
          </Detail>
          {member && <Detail>Groups: <Highlight>Children</Highlight></Detail>}

        </DetailWrapper>
      </Info>
    )
  }
}

export default InfoCard
