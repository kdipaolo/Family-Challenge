export const handleStateUpdate = (e, textValue) => {
  if (textValue) {
    this.setState(state => ({
      [textValue]: !state[textValue]
    }))
  } else {
    const { value, name } = e.target
    if (value) {
      this.setState({
        [name]: value
      })
    } else {
      this.setState(state => ({
        [name]: !state[name]
      }))
    }
  }
}
