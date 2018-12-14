import * as React from 'react';
import styles from './Form.module.css';
import dishes from '../../constants/dishes';
import { getRestaurantsThatServe } from '../../data/api';
import FormSelect from './FormSelect/FormSelect';

class Form extends React.Component {
  state = {
    step: 1,
    groupSize: 1,
    meal: 'breakfast',
    restaurant: '',
    order: [
      {
        id: 0,
        dish_id: null,
        no_serverings: 1
      },
    ],
  }

  addItem = () => {
    this.setState((prevState) => ({
      order: [...prevState.order,
        {
          id: prevState.order.length,
          dish_id: null,
          no_serverings: 1,
        }
      ]
    }));
  }

  removeItem = () => {
    this.setState((prevState) => {
      let copy = [...prevState.order]
      let index = copy.length - 1;
      copy.splice(index, 1)
      return { order: copy }
    })
  }

  updateItemDish = (event) => {
    let item_id = event.target.id;
    let dish_id = event.target.value;
    this.setState(prevState => (
      {
        order: prevState.order.map(item => item.id == item_id ? {...item, dish_id: dish_id} : item)
      }
    ))
  }

  updateItemServing = (event) => {
    let id = event.target.id;
    let no_servings = event.target.value;
    this.setState((prevState) => ({
      order: prevState.order.map(item => item.id == id ? Object.assign({}, item, {no_servings: no_servings}) : item)
    }))
  }

  updateRestaurant = (event, restaurant) => {
    let value
    if (event) {
      value = event.target.value
    } else if (restaurant) {
      value = restaurant
    }

    this.setState({
      restaurant: value
    })
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
      case 'itemDish':
        this.updateItemDish(event)
        break;
      case 'itemServing':
        this.updateItemServing(event)
        break;
      default:
        console.log('default');
    }
  }

  previousClick = () => {
    this.setState((prevState) => ({
      step: prevState.step - 1
    }))
  }

  nextClick = () => {
    this.setState((prevState) => ({
      step: prevState.step + 1
    }))
  }

  render() {
    const { step, meal, groupSize, restaurant, order } = this.state;
    const dishesByMeal = dishes.filter(dish => dish.availableMeals.includes(meal))
    const restaurants = getRestaurantsThatServe(meal);
    const dishesToChooseFrom = dishesByMeal.filter(dish => dish.restaurant === restaurant)
    console.log(order);

    return (
      <div className={styles.form}>
        <div className={styles.progressBar}>
          <div className={styles.step}>Step 1</div>
          <div className={styles.step}>Step 2</div>
          <div className={styles.step}>Step 3</div>
          <div className={styles.step}>Review</div>
        </div>
        <div>step:{step}groupSize:{groupSize}meal:{meal}resto:{restaurant}</div>

        {step === 1 && (
          <div>
            <div>Please Select a Meal</div>
            <select onChange={this.handleChange} name="meal" defaultValue={meal}>
              <option value={'breakfast'}>Breakfast</option>
              <option value={'lunch'}>Lunch</option>
              <option value={'dinner'}>Dinner</option>
            </select>
            <div>Please Enter Number of People</div>
            <select onChange={this.handleChange} name="groupSize" defaultValue={groupSize}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
            <button onClick={this.nextClick}>
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <div>Please Select a Restaurant</div>
            <FormSelect
              options={restaurants}
              handleChange={this.updateRestaurant}
              default_value={restaurant}
            />
            <button onClick={this.previousClick}>
              Previous
            </button>
            <button onClick={this.nextClick} disabled={restaurant === ''}>
              Next
            </button>
          </div>
        )}
        {step === 3 && (
          <div>
            {order.map( item =>
              <div key={item.id} onChange={this.handleChange}>
                <div>Please Select a Dish</div>
                <select name="itemDish" id={item.id} defaultValue={item.dish_id}>
                  {dishesToChooseFrom.map(availableDish => (
                    <option key={availableDish.id} value={availableDish.id}>{availableDish.name}</option>
                  ))}
                </select>
                <select name="itemServing" id={item.id} defaultValue={item.no_servings}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                </select>
                {item.id === order.length - 1 && item.id !== 0 && (
                  <button onClick={this.removeItem}>
                    Remove
                  </button>
                )}
              </div>
            )}
            <button onClick={this.addItem}>
              Add Another Item
            </button>
            <button onClick={this.previousClick}>
              Previous
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default Form;
