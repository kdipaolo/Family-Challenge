import React from 'react'
import CardWrapper from '../../styles/CardWrapper'
import { Link } from 'react-router-dom'
class Member extends React.Component {
  render() {
    return (
      <Link to="/group/1">
        <CardWrapper>
          <h3>Children</h3>
          <h4>Tasks: 5</h4>
          <h4>Created: 2/2/2018</h4>
          <h4>Due: 2/2/2018</h4>
        </CardWrapper>
      </Link>
    )
  }
}

export default Member
