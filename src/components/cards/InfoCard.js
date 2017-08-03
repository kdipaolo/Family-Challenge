import React from 'react'
import styled from 'styled-components'
import placeholder from '../../../public/images/placeholder.png'
import EditIcon from 'react-icons/lib/md/edit'
import CheckCircle from 'react-icons/lib/md/check-circle'
import { graphql, gql } from 'react-apollo'

const Info = styled.div`
  background-color: ${props => props.theme.colors.primaryDark};
  color: #fff;
  text-align: center;
  padding: 5%;
`
const Header = styled.h3`
  margin: 0;
  padding: 2%;
`
const Detail = styled.p`
  font-size: 13px;
  width: 50%;
  color: lightgray;
`
const DetailWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const Highlight = styled.div`
  color: #fff;
  font-weight: bold;
  display: inline;
`

const Image = styled.img`
  width: 100px;
  clip-path: circle(50% at 50% 50%);
`

class InfoCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      description: null
    }
  }
  render() {
    const { member, task } = this.props
    return (
      <Info>
        {member && <Image src={placeholder} alt="" />}
        {!this.state.edit
          ? <EditIcon onClick={() => this.setState({ edit: true })} />
          : <CheckCircle
              onClick={desc => {
                this.props.handleTaskUpdate(this.state.description)
                this.setState({ edit: false })
              }}
            />}

        <Header>
          {!this.state.edit
            ? this.props.title
            : <input
                defaultValue={this.props.title}
                onChange={e => this.setState({ description: e.target.value })}
                type="text"
              />}
        </Header>

        <DetailWrapper>
          {task
            ? <Detail>
                Tasks Assigned By: <Highlight>Mom</Highlight>
              </Detail>
            : <Detail>
                <Highlight>5</Highlight> Tasks Assigned
              </Detail>}
          {!task &&
            <Detail>
              <Highlight>35</Highlight> Tasks Completed
            </Detail>}
          <Detail>
            {member ? 'Signed up' : 'Created'} on:{' '}
            <Highlight>5/5/2017</Highlight>
          </Detail>
          {member &&
            <Detail>
              Groups: <Highlight>Children</Highlight>
            </Detail>}
        </DetailWrapper>
      </Info>
    )
  }
}

const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTaskMutation($title: String!, $content: String!, $id: ID!) {
    updateTask(title: $title, content: $content, id: $id) {
      id
      createdAt
      title
      content
      author {
        id
        name
      }
    }
  }
`

export default graphql(UPDATE_TASK_MUTATION, { name: 'updateTask' })(InfoCard)
