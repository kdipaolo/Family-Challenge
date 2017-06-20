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
`
const Detail = styled.p`

`
const DetailWrapper = styled.div`
  display: flex;
`
const Image = styled.img`
  width: 100px;
  clip-path: circle(50% at 50% 50%);
`

class InfoCard extends React.Component {
  render() {
    return (
      <Info>
        {this.props.member ? <Image src={placeholder} alt="" /> : ''}
        <Header>Children</Header>
        <DetailWrapper>
          <Detail>5/25 Tasks Completed</Detail>
          <Detail>Created on: 5/5/2017</Detail>
        </DetailWrapper>
      </Info>
    )
  }
}

export default InfoCard
