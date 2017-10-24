import React from 'react'
import styled from 'styled-components'
import placeholder from '../../../public/images/placeholder.png'
import { graphql, gql } from 'react-apollo'
import dateFormat from 'dateformat'
import Settings from '../shared/Settings'
import { Motion, spring } from 'react-motion'
import house from '../../../public/images/house.svg'
import paperAirplane from '../../../public/images/paper-airplane.svg'
import { MinusCircle, Edit, CheckCircle } from 'react-feather'

const Info = styled.div`
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
const Header = styled.h3`
  margin: 0;
  padding: 2%;
`
const Detail = styled.p`
  font-size: 13px;
  width: 33%;
  color: ${props => props.theme.colors.gray};
`
const DetailWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const Highlight = styled.span`
  color: ${props => props.theme.colors.primaryDark};
  font-weight: bold;
  display: block;
`

const Image = styled.img`width: 75px;`

const MinusCircleIcon = styled(MinusCircle)`
  position: absolute;
  right: 10px;
  top: 10px;
  color: ${props => props.theme.colors.rejected};
`

const EditIcon = styled(Edit)`
  display: block;
  margin: auto;
  color: ${props => props.theme.colors.gray};
`

class InfoCard extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.handleUpdate({ title: this.props.title })
    this.props.handleStateUpdate(e, 'edit')
  }
  render() {
    const { member, task, title, created, tasks } = this.props
    return (
      <div>
        <Info>
          <MinusCircleIcon onClick={this.props.handleDelete} />

          {member && <Image src={placeholder} alt="" />}
          <Image src={task ? paperAirplane : house} />
          <EditIcon onClick={e => this.props.handleStateUpdate(e, 'edit')} />
          <Header>
            {task ? 'Task: ' : 'Group: '}
            <strong>
              {!this.props.edit && title}
              {this.props.edit &&
                <div>
                  <input
                    type="text"
                    name="title"
                    value={this.props.title}
                    onChange={this.props.handleStateUpdate}
                  />
                  <CheckCircle onClick={this.handleSubmit} />
                </div>}
            </strong>
          </Header>

          <DetailWrapper>
            {task
              ? <Detail>
                  Tasks Assigned By: <Highlight>Mom</Highlight>
                </Detail>
              : <Detail>
                  <Highlight>{tasks.length}</Highlight> Tasks Assigned
                </Detail>}
            {!task &&
              <Detail>
                <Highlight>
                  {tasks.filter(task => task.completed).length}
                </Highlight>{' '}
                Tasks Completed
              </Detail>}
            <Detail>
              <Highlight>{dateFormat(created, 'fullDate')}</Highlight>
              {member ? 'Signed up' : 'Created'} on{' '}
            </Detail>
            {member &&
              <Detail>
                Groups: <Highlight>Children</Highlight>
              </Detail>}
          </DetailWrapper>
        </Info>
      </div>
    )
  }
}

export default InfoCard
