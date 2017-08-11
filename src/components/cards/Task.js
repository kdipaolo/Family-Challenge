import React from 'react'
import CardWrapper from '../../styles/CardWrapper'
import { Link } from 'react-router-dom'
import { Zap } from 'react-feather'
import styled from 'styled-components'

const ZapIcon = styled(Zap)`
  float: right;
  padding: 5px;
  color: ${props => props.theme.colors.gray}

`

class Task extends React.Component {
  render() {
    return (
      <Link to={`/task/${this.props.id}`}>
        <CardWrapper faded={this.props.completed}>
          <div>
            <h3>
              {this.props.title}
            </h3>
            <h4>Assigned By: Mom</h4>
          </div>
          <div>
            <h5>1/26/2017</h5>
          </div>
          <div>
            <ZapIcon />
          </div>
        </CardWrapper>
      </Link>
    )
  }
}

export default Task
