import React from "react"
import styled, { css } from "styled-components"
import placeholder from "../../../public/images/placeholder.png"
import { ThumbsUp, Mail } from "react-feather"
import CardWrapper from "../../styles/CardWrapper"
import { CardText, Flex, CardIcon, Image } from "../../styles/Cards.js"
import { Link } from "react-router-dom"
const Action = styled.div`
  padding: 3%;
  margin: 4%;
  text-transform: uppercase;
  font-size: 12px;
  width: 100%;
  font-weight: bold;
  text-align: center;
  background: ${props => props.theme.colors.background};
`

const ActionIcon = css`
  display: block;
  margin: auto;
  width: 20px;
  margin-bottom: 3px;
`
const ThumbsUpIcon = styled(ThumbsUp)`${ActionIcon};`
const MailIcon = styled(Mail)`${ActionIcon};`

export const FlexAction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    flex: 1
    align-items: center;

  }
`

class ActionCard extends React.Component {
  render() {
    return (
      <Link to={`/task/${this.props.data.id}`}>
        <CardWrapper>
          <Flex image>
            <div>
              <Image src={placeholder} alt="" />
            </div>
            <div>
              <CardText bold>{this.props.data.title} </CardText>
              <CardText secondary>1/26/2017</CardText>
              <CardText>Completed: Mowing the lawn</CardText>
            </div>
            <div>
              <CardIcon />
            </div>
          </Flex>

          <FlexAction>
            <Action>
              <ThumbsUpIcon />Approve
            </Action>
            <Action>
              <MailIcon />Reply
            </Action>
          </FlexAction>
        </CardWrapper>
      </Link>
    )
  }
}

export default ActionCard
