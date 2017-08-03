import React from 'react'
import Button from '../shared/Button'
import ActionSlide from '../shared/ActionSlide'
import Task from '../cards/Task'
import Member from '../cards/Member'
import styled from 'styled-components'
import ContentWrapper from '../../styles/ContentWrapper'
import InfoCard from '../cards/InfoCard'
import Switcher from '../shared/Switcher'
import { graphql, gql, withApollo } from 'react-apollo'

class Group extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openMenu: false,
      active: 'Members',
      name: null,
      tasks: []
    }
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleSwitcherClick = this.handleSwitcherClick.bind(this)
  }
  componentDidMount() {
    this.props.client
      .query({
        query: GET_GROUP,
        variables: { id: this.props.location.pathname.split('group/')[1] }
      })
      .then(results => {
        console.log(results)
        this.setState({
          name: results.data.getGroup.name,
          tasks: results.data.getGroup.tasks.edges.map(item => {
            return {
              description: item.node.description,
              id: item.node.id
            }
          })
        })
      })
  }

  handleButtonClick(e) {
    e.preventDefault()
    this.setState({
      openMenu: !this.state.openMenu
    })
  }
  handleSwitcherClick(e) {
    this.setState({
      active: e.target.dataset.item
    })
  }
  render() {
    return (
      <div>
        <InfoCard title={this.state.name} />

        <Switcher
          active={this.state.active}
          handleSwitcherClick={this.handleSwitcherClick}
          links={['Tasks', 'Members']}
        />
        <ContentWrapper>
          {this.state.active === 'Tasks'
            ? <div>
                {this.state.tasks.map(task => {
                  return <Task description={task.description} id={task.id} />
                })}

                <Button sticky onClick={this.handleButtonClick}>
                  + Add A Todo
                </Button>
              </div>
            : <div>
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Button sticky onClick={this.handleButtonClick}>
                  + Add A Memeber
                </Button>
              </div>}
        </ContentWrapper>
        <ActionSlide
          open={this.state.openMenu}
          handleCloseClick={this.handleButtonClick}
          type={this.state.active}
        />
      </div>
    )
  }
}

const GET_GROUP = gql`
  query getGroup($id: ID!) {
    getGroup(id: $id) {
      name
      tasks {
        edges {
          node {
            id
            description
          }
        }
      }
    }
  }
`

export default withApollo(Group)
