import React, { Component } from 'react'
import getRestaurantsThatServe from './data/api'

class Test extends Component {
  render() {
    console.log(getRestaurantsThatServe('breakfast'));
    return (
      <div>Hello</div>
    )
  }
}

export default Test;
