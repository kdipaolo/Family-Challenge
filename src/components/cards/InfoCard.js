import React from 'react'
import styled from 'styled-components'
import placeholder from '../../../public/images/placeholder.png'
import EditIcon from 'react-icons/lib/md/edit'
import gear from 'react-icons/lib/fa/cog'
import CheckCircle from 'react-icons/lib/md/check-circle'
import { graphql, gql } from 'react-apollo'
import dateFormat from 'dateformat'
import Settings from '../shared/Settings'

const Info = styled.div`
  background-color: ${props => props.theme.colors.primaryDark};
  color: #fff;
  text-align: center;
  padding: 5%;
  position: relative;
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

const Highlight = styled.span`
  color: #fff;
  font-weight: bold;
  display: inline;
`

const Image = styled.img`
  width: 100px;
  clip-path: circle(50% at 50% 50%);
`

const Gear = styled(gear)`
  font-size: 30px;
  position: absolute;
  right: 15px;
  top: 15px;
`

class InfoCard extends React.Component {
  updateSettings = e => this.props.handleStateUpdate(e, 'settings')
  render() {
    const { member, task, name, created, tasks } = this.props
    return (
      <div>
        {this.props.settings &&
          <Settings
            name={name}
            handleStateUpdate={this.props.handleStateUpdate}
            handleGroupUpdate={this.props.handleGroupUpdate}
          />}
        <Info>
          <Gear onClick={this.updateSettings} />
          {member && <Image src={placeholder} alt="" />}

          <Header>
            {name}
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
              {member ? 'Signed up' : 'Created'} on:{' '}
              <Highlight>{dateFormat(created, 'fullDate')}</Highlight>
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
