import styled, { css } from 'styled-components'
import { Zap } from 'react-feather'

export const CardHeader = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin: 0;
`

export const CardText = styled.p`
  margin: 5px 0;
  ${props => props.bold && css`font-weight: bold`};
  ${props =>
    props.secondary &&
    css`color: ${props.theme.colors.gray}; font-size: 12px;`};
`

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    flex: 3;
    align-items: center;
    justify-content: flex-end;
  }
  & > div:last-of-type {
    flex: 1;
    text-align: right;
  }
  ${props =>
    props.image &&
    css`
      & > div:nth-of-type(1) {
        flex: 2;
      }
      & > div:nth-of-type(2) {
        flex: 8;
      }
      & > div:nth-of-type(3) {
        flex: 1;
      }

    `};
`

export const CardIcon = styled(Zap)`
 color: ${props => props.theme.colors.secondary};
 opacity: 0.75;
`

export const Image = styled.img`float: left;`
