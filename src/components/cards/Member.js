import React from 'react'
import placeholder from '../../../public/images/placeholder.png'
import CardWrapper from '../../styles/CardWrapper'
import { Link } from 'react-router-dom'
class Member extends React.Component {
  render() {
    return (
      <Link to="/member/1">
        <CardWrapper>
          <img src={placeholder} alt="" />
          <h3>Kurt DiPaolo</h3>
          <h4>Tasks: 5</h4>
          <h4>Age: 28</h4>
        </CardWrapper>
      </Link>
    )
  }
}

export default Member
