import React from 'react'
import CardWrapper from '../../styles/CardWrapper'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'
import { Users } from 'react-feather'
import styled from 'styled-components'
import {
  CardText,
  CardHeader,
  Flex,
  CardIcon,
  Image
} from '../../styles/Cards.js'

class Member extends React.Component {
  render() {
    const { id, name, tasks, created, dueDate } = this.props
    return (
      <Link to={`/group/${id}`}>
        <CardWrapper>
          <CardHeader>
            {name}
          </CardHeader>
          <Flex>
            <div>
              <CardText secondary>
                Tasks: {tasks}
              </CardText>

              <CardText secondary>
                Created: {dateFormat(created, 'fullDate')}
              </CardText>
              <CardText secondary>
                Due: {dateFormat(dueDate, 'fullDate')}
              </CardText>
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

export default Member
