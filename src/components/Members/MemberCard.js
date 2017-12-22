import React from 'react'
import placeholder from '../../../public/images/placeholder.png'
import CardWrapper from '../../styles/CardWrapper'
import { Link } from 'react-router-dom'
import { CardText, Flex, CardIcon, Image } from '../../styles/Cards'

class MemberCard extends React.Component {
  render() {
    return (
      <Link to={`/member/${this.props.user.id}`}>
        <CardWrapper>
          <Flex image>
            <div>
              <Image src={placeholder} alt="" />
            </div>
            <div>
              <CardText bold>{this.props.user.name}</CardText>
              <CardText secondary>Tasks: 8</CardText>
              <CardText secondary>Age: 24</CardText>
            </div>
            <div>
              <CardIcon />
            </div>
          </Flex>
        </CardWrapper>
      </Link>
    )
  }
}

export default MemberCard
