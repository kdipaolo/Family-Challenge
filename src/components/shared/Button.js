import styled, { css } from 'styled-components'

import { darken } from 'polished'

const createColorVariation = color => {
  return css`
      background-color: ${color};
      &:hover {
        background-color: ${darken(0.2, color)};
      }
    `
}

function stickyButton() {
  return css`
      position: fixed;
      left: 3%;
      width: 95%;
      bottom: 2%;
      z-index: 999999999;
      border: 3px solid #fff;
    `
}

const Button = styled.button`
  ${props => createColorVariation(props.theme.colors.primary)}
  width: 100%;
  cursor: pointer;
  padding: 5%;
  border: none;
  color: #fff;
  text-transform: uppercase;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s all ease;
  ${props => props.notification && createColorVariation(props.theme.colors.primaryDark)}
  ${props => props.secondary && createColorVariation(props.theme.colors.secondary)}
  ${props => props.sticky && stickyButton()}
`

export default Button