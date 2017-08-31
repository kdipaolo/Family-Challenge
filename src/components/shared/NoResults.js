import styled from 'styled-components'

const NoResults = styled.div`
  padding: 5%;
  width: 100%;
  background: ${props => props.theme.colors.cardBackground};
  color: ${props => props.theme.colors.primaryDark};
  font-weight: bold;
  text-align: center;
  box-sizing: border-box;
`

export default NoResults
