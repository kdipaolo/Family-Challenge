import React from 'react'
import styled from 'styled-components'
import placeholder from '../../public/images/placeholder.png'

// How do you handle nested elements in styled components?

const CardWrapper = styled.div`
  border: 0.5px solid lightgray;
  margin: 2% 0;
  padding: 3%;
  box-shadow: 0px 1.5px 1px #888888;

  img {
    width: 50px;
    clip-path: circle(50% at 50% 50%);
    float: left;
    margin-right: 10px;
  }

  h3 {
    margin: 0 0 5px;
    font-size: 18px;
  }
  h4 {
    margin: 0 0 5px;
    font-size: 12px;
    color: gray;
  }
  h5 {
    float: right;
    color: gray;
  }
`

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
