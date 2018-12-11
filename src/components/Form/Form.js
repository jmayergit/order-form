import * as React from 'react';
import styles from './Form.module.css';
import dishes from '../../constants/dishes';

// meal: breakfast, lunch, dinner
// no of people 1-10
// restaurant
// dish -- no of servings

class Form extends React.Component {
  state = {
    step: 1,
    groupSize: 1,
    meal: 'breakfast',
    restaurant: 'Mc Donalds',
    dishes: [],
  }

  handleChange = (event) => {
    const name = event.target.name;
    switch (name) {
      case 'groupSize':
        this.setState({ groupSize: event.target.value })
        break;
      case 'meal':
        this.setState({ meal: event.target.value })
        break;
      case 'restaurant':
        this.setState({ restaurant: event.target.value })
        break;
      default:
        console.log('default');
    }
  }

  handleClick = () => {
    this.setState((state) => ({
      step: state.step + 1
    }));
  }

  render() {
    const { step, meal, restaurant } = this.state;
    const restaurantsThatServe = dishes.filter(
      dish => dish.availableMeals.includes(meal)
    )
    const dishesBy = dishes.filter(
      dish => dish.restaurant === restaurant
    ).filter(
      dish => dish.availableMeals.includes(meal)
    )

    return (
      <div className={styles.form}>
        <div className={styles.progressBar}>
          <div className={styles.step}>Step 1</div>
          <div className={styles.step}>Step 2</div>
          <div className={styles.step}>Step 3</div>
          <div className={styles.step}>Review</div>
        </div>
        <div>{step}{meal}{restaurant}</div>
        {step === 1 && (
          <div>
            <div>Please Select a Meal</div>
            <select onChange={this.handleChange} name="meal">
              <option value={'breakfast'}>Breakfast</option>
              <option value={'lunch'}>Lunch</option>
              <option value={'dinner'}>Dinner</option>
            </select>
            <div>Please Enter Number of People</div>
            <select onChange={this.handleChange} name="groupSize">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
            <button onClick={this.handleClick}>
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <div>Please Select a Restaurant</div>
            <select name="restaurant" onChange={this.handleChange}>
              {restaurantsThatServe.map(dish => (
                <option value={dish.restaurant} key={dish.id}>{dish.restaurant}</option>
              ))}
            </select>
            <button onClick={this.handleClick}>
              Next
            </button>
          </div>
        )}
        {step === 3 && (
          <div>
            <div>Please Select a Dish</div>
            <select>
              {dishesBy.map(dish => (
                <option key={dish.id} value={dish.id}>{dish.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    )
  }
}

export default Form;
