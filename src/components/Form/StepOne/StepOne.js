import * as React from 'react';

class StepOne extends React.Component {

  render() {
    return (
      <div>
        <div>Please Select a Meal</div>
        <select onChange={this.props.handleChange} name="meal">
          <option value={'breakfast'}>Breakfast</option>
          <option value={'lunch'}>Lunch</option>
          <option value={'dinner'}>Dinner</option>
        </select>
        <div>Please Enter Number of People</div>
        <select onChange={this.props.handleChange} name="groupSize">
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>
    )
  }
}

export default StepOne;
