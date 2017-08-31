import styled, { css } from 'styled-components'

const CardWrapper = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  margin: 2% 0;
  padding: 3%;
  border: 1px solid ${props => props.theme.colors.cardBorer};

  ${props =>
    props.faded &&
    css`
     opacity: 0.3;
  `} img {
    width: 50px;
    clip-path: circle(50% at 50% 50%);
  }

  ${'' /* display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    flex: 1;
  } */};
`
export default CardWrapper
