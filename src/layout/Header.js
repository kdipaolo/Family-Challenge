import React from 'react'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import placeholder from '../../public/images/placeholder.png'
import {
  Menu,
  Bell,
  Users,
  Settings,
  UserCheck,
  ChevronDown,
  X
} from 'react-feather'
import SettingsView from '../components/shared/Settings'
const NavigationBar = styled.div`
  background-color: ${props => props.theme.colors.primary};
  width: 100%;
  color: #333;
  padding: 1%;
  box-shadow: 0px 2px 2px #888888;
  box-sizing: border-box;
  & span {
    font-size: 28px;
      &:last-of-type {
        float: right;
      }
    }
  }
`
const NavigationMenu = styled.div`
  background-color: ${props => props.theme.colors.background};
  border-right: 4px solid ${props => props.theme.colors.gray};
  box-sizing: border-box;
  color: #333;
  width: 300px;
  height: 100vh;
  top: 0;
  position: absolute;
  z-index: 50000;
  transition: 0.2s all ease-out;
  transform: ${props =>
    props.open ? 'translateX(0px)' : 'translateX(-300px)'};
`

const SettingsMenu = NavigationMenu.extend`
  right: 0;
  transform: ${props => (props.open ? 'translateX(0px)' : 'translateX(300px)')};
`

const NavItem = styled.div`
  margin: 10% 0;
  font-size: 18px;
  svg {
    font-size: 20px;
    margin-right: 20px;
  }
`

const UserInfo = styled.div`
  ${/* background-color: ${props.theme.colors.primary}; */ ''} padding: 5%;
  height: 75px;
  position: relative;
  > svg {
    float: right;
    font-size: 32px;
  }
  img {
    width: 50px;
    clip-path: circle(50% at 50% 50%);
    float: left;
    margin-right: 10px;
  }
  p {
    float: right;
    color: #fff;
    font-size: 12px;
    position: absolute;
    bottom: 0;
    right: 10px;
  }
`

class Header extends React.Component {
  state = {
    openNav: false,
    openSettings: false
  }

  handleMenuClick = () => {
    this.setState({
      openNav: !this.state.openNav
    })
  }
  handleSettingsClick = () => {
    this.setState({
      openSettings: !this.state.openSettings
    })
  }
  render() {
    if (this.props.location.pathname === '/') {
      return null
    }
    return (
      <div>
        <NavigationBar>
          <span onClick={this.handleMenuClick}>
            <Menu />
          </span>
          <span onClick={this.handleSettingsClick}>
            <Settings />
          </span>
        </NavigationBar>
        <NavigationMenu open={this.state.openNav}>
          <UserInfo>
            <X onClick={this.handleMenuClick} />
            <img src={placeholder} alt="" />
            <p>
              DiPaolo Family <ChevronDown />
            </p>
          </UserInfo>
          <ul>
            <Link to="/dashboard" onClick={this.handleMenuClick}>
              <NavItem>
                <Bell /> Notifications
              </NavItem>
            </Link>
            <Link to="/groups" onClick={this.handleMenuClick}>
              <NavItem>
                <Users /> Groups
              </NavItem>
            </Link>
            <Link to="/members" onClick={this.handleMenuClick}>
              <NavItem>
                <UserCheck /> Memebers
              </NavItem>
            </Link>
            <Link to="/settings" onClick={this.handleMenuClick}>
              <NavItem>
                <Settings /> Settings
              </NavItem>
            </Link>
          </ul>
        </NavigationMenu>
        <SettingsMenu open={this.state.openSettings}>
          <X onClick={this.handleSettingsClick} />
        </SettingsMenu>
      </div>
    )
  }
}

export default withRouter(Header)
