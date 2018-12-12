import * as React from 'react';

class StepTwo extends React.Component {
  render() {
    const { props } = this;
    const restaurantsThatServe = props.dishes.filter(
      dish => dish.availableMeals.includes(props.meal)
    )
    return (
      <div>
        <div>Please Select a Restaurant</div>
        <select name="restaurant" onChange={props.handleChange}>
          {restaurantsThatServe.map(dish => (
            <option value={dish.restaurant} key={dish.id}>{dish.restaurant}</option>
          ))}
        </select>
      </div>
    )
  }
}

export default StepTwo;
