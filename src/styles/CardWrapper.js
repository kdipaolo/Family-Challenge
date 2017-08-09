import styled, { css } from 'styled-components'

const CardWrapper = styled.div`
  border: 0.5px solid lightgray;
  margin: 2% 0;
  padding: 3%;
  box-shadow: 0px 1.5px 1px #888888;
  ${props =>
    props.faded &&
    css`
     opacity: 0.3;
  `} img {
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
export default CardWrapper
