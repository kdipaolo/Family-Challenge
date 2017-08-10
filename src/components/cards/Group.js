import React from 'react'
import CardWrapper from '../../styles/CardWrapper'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat'
import { Users } from 'react-feather'
import styled from 'styled-components'

const UsersIcon = styled(Users)`
  float: right;
  padding: 3px;
`

class Member extends React.Component {
  render() {
    const { id, name, tasks, created, dueDate } = this.props
    return (
      <Link to={`/group/${id}`}>
        <CardWrapper>
          <div>
            <h3>
              {name}
            </h3>
          </div>
          <div>
            <h4>
              Tasks: {tasks}
            </h4>
          </div>
          <div>
            <h4>
              Created: {dateFormat(created, 'fullDate')}
            </h4>
            <h4>
              Due: {dateFormat(dueDate, 'fullDate')}
            </h4>
          </div>
          <div>
            <UsersIcon />
          </div>
        </CardWrapper>
      </Link>
    )
  }
}

export default Member
