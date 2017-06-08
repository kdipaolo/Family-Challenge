import React from 'react'
import styled from 'styled-components'
import placeholder from '../../public/images/placeholder.png'
import CardWrapper from '../styles/CardWrapper'

class Card extends React.Component {
  render() {
    return (
      <CardWrapper>
        <h5>1/26/2017</h5>
        <img src={placeholder} alt="" />
        <h3>Entire Family</h3>
        <h4>2/12 Tasks Completed</h4>

      </CardWrapper>
    )
  }
}

export default Card
