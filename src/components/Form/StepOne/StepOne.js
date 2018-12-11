import * as React from 'react';

class StepOne extends React.Component {
  handleChange = (e) => {
    console.log(e.target.value);
  }
  render() {
    return (
      <div>
        <select onChange={this.props.handleChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>
    )
  }
}

export default StepOne;
