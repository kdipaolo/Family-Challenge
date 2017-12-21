import React from 'react'
import CardWrapper from '../../styles/CardWrapper'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'
import { CardText, CardHeader, Flex, CardIcon } from '../../styles/Cards'

class GroupCard extends React.Component {
  render() {
    const { id, title, tasks, created, dueDate } = this.props
    return (
      <Link to={`/group/${id}`}>
        <CardWrapper>
          <CardHeader>{title}</CardHeader>
          <Flex>
            <div>
              <CardText secondary>Tasks: {tasks}</CardText>

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

export default GroupCard
