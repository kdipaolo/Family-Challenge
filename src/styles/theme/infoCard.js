import styled from "styled-components"
import { Edit, CheckCircle, MinusCircle } from "react-feather"

export const EditIcon = styled(Edit)`
  display: block;
  margin: auto;
  color: ${props => props.theme.colors.gray};
`

export const Info = styled.div`
  background: ${props => props.theme.colors.primary};
  padding: 5%;
  text-align: center;
  position: relative;
  margin: 3% auto 0 auto;
  color: ${props => props.theme.colors.text};
  border-top: 1px solid ${props => props.theme.colors.cardBorer};
  border-left: 1px solid ${props => props.theme.colors.cardBorer};
  border-right: 1px solid ${props => props.theme.colors.cardBorer};
  line-height: 25px;
  letter-spacing: 1px;
  font-weight: 400;
`

export const MinusCircleIcon = styled(MinusCircle)`
  position: absolute;
  right: 10px;
  top: 10px;
  color: ${props => props.theme.colors.rejected};
`

export const Image = styled.img`width: 75px;`

export const Header = styled.h3`
  margin: 0;
  padding: 2%;
`
export const Detail = styled.p`
  font-size: 13px;
  width: 33%;
  color: ${props => props.theme.colors.gray};
`
export const DetailWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

export const Highlight = styled.span`
  color: ${props => props.theme.colors.primaryDark};
  font-weight: bold;
  display: block;
`
