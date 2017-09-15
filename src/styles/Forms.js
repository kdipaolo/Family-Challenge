import styled from 'styled-components'

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 3% 0;
  border-radius: 3px;
  background: transparent;
  margin: 2% 0;
  border: none;
  padding-left: 10px;
  color: ${props => props.theme.colors.secondary};
  border: 1px solid ${props => props.theme.colors.secondary};
  &::-webkit-input-placeholder {
    color: ${props => props.theme.colors.secondary};
    padding-left: 10px;
  }
`
export const Textarea = styled.textarea`
  width: 100%;
  background: ${props => props.theme.colors.background};
  height: 100px;
  border: none;
  margin: 2% 0;
  border-radius: 3px;
  padding: 5px;
  color: ${props => props.theme.colors.secondary};
`
export const Label = styled.label`
  color: ${props => props.theme.colors.secondary};
  margin: 2% 0;
  font-size: 16px;
  margin: 5% 0 1% 0;
  margin-left: 10px;
  text-align: left;
  display: block;
`

export const Form = styled.form`margin: 6% 0;`
