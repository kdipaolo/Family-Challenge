import React from 'react'
import CardWrapper from '../../styles/CardWrapper'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'

class Member extends React.Component {
  render() {
    const { id, title, tasks, created, dueDate } = this.props
    return (
      <Link to={`/group/${id}`}>
        <CardWrapper>
          <h3>
            {title}
          </h3>
          <h4>
            Tasks: {tasks}
          </h4>
          <h4>
            Created: {dateFormat(created, 'fullDate')}
          </h4>
          <h4>
            Due: {dateFormat(dueDate, 'fullDate')}
          </h4>
        </CardWrapper>
      </Link>
    )
  }
}

export default Member
