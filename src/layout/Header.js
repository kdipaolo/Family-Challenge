import React from 'react'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import placeholder from '../../public/images/placeholder.png'
import { AUTH_TOKEN, USER_ID } from '../utils/constants'
import {
  Menu,
  Bell,
  Users,
  UserCheck,
  Settings,
  ChevronDown,
  UserMinus,
  X
} from 'react-feather'

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

const FamilyName = styled.h4`
  font-size: 17px;
  margin: 0;
  padding: 0;
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

const NavItem = styled.div`
  margin: 10% 0;
  font-size: 18px;
  svg {
    font-size: 20px;
    margin-right: 20px;
  }
`

const UserInfo = styled.div`
  padding: 5%;
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
    color: #333;
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
  handleSignOut = e => {
    e.preventDefault()
    localStorage.removeItem(AUTH_TOKEN)
    localStorage.removeItem(USER_ID)
    window.location.href = '/login'
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
            {!this.props.getUser.loading && (
              <FamilyName>{this.props.getUser.User.name} Family</FamilyName>
            )}
          </span>
        </NavigationBar>
        <NavigationMenu open={this.state.openNav}>
          <UserInfo>
            <X onClick={this.handleMenuClick} />
            <img src={placeholder} alt="" />
            <p>
              {!this.props.getUser.loading && this.props.getUser.User.name}{' '}
              <ChevronDown />
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
                <UserCheck /> Members
              </NavItem>
            </Link>
            <Link to="/settings" onClick={this.handleMenuClick}>
              <NavItem>
                <Settings /> Settings
              </NavItem>
            </Link>
            <a href="" onClick={this.handleSignOut}>
              <NavItem>
                <UserMinus /> Sign Out
              </NavItem>
            </a>
          </ul>
        </NavigationMenu>
      </div>
    )
  }
}
//this.props.currentUser
export default withRouter(Header)
