import React from 'react'
import styled from 'styled-components'
import placeholder from '../../../public/images/placeholder.png'
import CardWrapper from '../../styles/CardWrapper'
import { Link } from 'react-router-dom'
class Task extends React.Component {
  render() {
    return (
      <Link to="/task/1">
        <CardWrapper>
          <h5>1/26/2017</h5>
          <img src={placeholder} alt="" />
          <h3>Entire Family</h3>
          <h4>2/12 Tasks Completed</h4>
        </CardWrapper>
      </Link>
    )
  }
}

export default Task
