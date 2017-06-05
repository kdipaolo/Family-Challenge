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

const Button = styled.button`
  ${props => createColorVariation(props.theme.colors.primary)}
  width: 100%;
  padding: 5%;
  border: none;
  color: #fff;
  text-transform: uppercase;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s all ease;
  ${props => props.notification && createColorVariation(props.theme.colors.primaryDark)}
`

export default Button
