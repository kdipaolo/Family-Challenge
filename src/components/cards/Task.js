import React from 'react'
import CardWrapper from '../../styles/CardWrapper'
import { Link } from 'react-router-dom'
class Task extends React.Component {
  render() {
    return (
      <Link to={'/task/' + this.props.id}>
        <CardWrapper faded={this.props.completed}>
          <h5>1/26/2017</h5>
          <h3>
            {this.props.title}
          </h3>
          <h4>Assigned By: Mom</h4>
        </CardWrapper>
      </Link>
    )
  }
}

export default Task
