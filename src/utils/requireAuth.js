import React, { Component } from "react"
import { AUTH_TOKEN } from "./constants"

export default function(Component) {
  return class Authentication extends Component {
    componentWillMount() {
      if (!localStorage.getItem(AUTH_TOKEN)) {
        this.props.history.push("/")
      }
    }
    componentWillUpdate(nextProps) {
      if (!localStorage.getItem(AUTH_TOKEN)) {
        this.props.history.push("/")
      }
    }
    render() {
      return <Component {...this.props} />
    }
  }
}
