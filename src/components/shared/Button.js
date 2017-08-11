import styled, { css } from 'styled-components'
import { darken } from 'polished'

const createColorVariation = color => css`
      background-color: ${color};
      &:hover {
        background-color: ${darken(0.2, color)};
      }
    `

const stickyButton = () => css`
      position: fixed;
      left: 3%;
      width: 95%;
      bottom: 2%;
      z-index: 999999999;
      border: 3px solid #fff;
    `

const border = () => css`
    border: 2px solid ${props => props.theme.colors.secondary};
    background: transparent;
    color: ${props => props.theme.colors.secondary};
    width: auto;
    border-radius: 5px;
    padding: 2% 5%;
  `

const Button = styled.button`
  ${props => createColorVariation(props.theme.colors.secondary)} width: 100%;
  cursor: pointer;
  padding: 5%;
  border: none;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s all ease;
  ${props => props.sticky && stickyButton()};
  ${props => props.danger && createColorVariation(props.theme.colors.rejected)};
  ${props => props.border && border()};
`

export default Button
