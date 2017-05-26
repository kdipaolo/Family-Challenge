import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import baseStyles from './styles/index'

const render = () => {
  baseStyles()
  ReactDOM.render(<App />, document.getElementById('root'))
}
render()
