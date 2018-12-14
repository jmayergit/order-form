import React, { Component } from 'react'

class FormSelect extends Component {
  componentDidMount() {
    this.props.handleChange(null, this.props.options[0])
  }

  render() {
    const { props } = this
    return (
      <select onChange={props.handleChange} defaultValue={props.default_value}>
        {props.options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    )
  }
}

export default FormSelect;
