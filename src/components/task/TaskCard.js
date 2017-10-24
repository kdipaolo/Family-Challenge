import React from "react"
import CardWrapper from "../../styles/CardWrapper"
import { Link } from "react-router-dom"
import { Zap } from "react-feather"
import styled from "styled-components"
import {
  CardText,
  CardHeader,
  Flex,
  CardIcon,
  Image
} from "../../styles/Cards.js"

class TaskCard extends React.Component {
  render() {
    return (
      <Link to={`/task/${this.props.id}`}>
        <CardWrapper faded={this.props.completed}>
          <Flex>
            <div>
              <CardHeader>{this.props.title}</CardHeader>
              <CardText secondary>Assigned By: Mom</CardText>
              <CardText secondary>1/26/2017</CardText>
            </div>
            <div>
              <CardIcon />
            </div>
          </Flex>
        </CardWrapper>
      </Link>
    )
  }
}

export default TaskCard
