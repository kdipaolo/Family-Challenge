import React from 'react'
import styled from 'styled-components'

const SwitcherWrapper = styled.div`
  display: flex;
  background: ${props => props.theme.colors.cardBackground};
  z-index: 99999;
`
const SwitcherItem = styled.p`
  cursor: pointer;
  flex: 1;
  text-align: center;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 14px;
  margin: 0;
  padding: 3% 0;
  color: ${props => (props.active ? props.theme.colors.secondary : '#333')};
  border: 1px solid ${props => props.theme.colors.cardBorer};
  border-bottom: ${props =>
    props.active ? '2px solid' + props.theme.colors.secondary : 'none'};
`

class Switcher extends React.Component {
  render() {
    return (
      <SwitcherWrapper>
        {this.props.links.map((link, i) =>
          <SwitcherItem
            data-item={link}
            key={i}
            onClick={this.props.handleSwitcherClick}
            active={this.props.active === link}>
            {link}
          </SwitcherItem>
        )}
      </SwitcherWrapper>
    )
  }
}

export default Switcher
