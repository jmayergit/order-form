import * as React from 'react';
import styles from './Form.module.css';
import dishes from '../../constants/dishes';
import StepOne from './StepOne/StepOne';
import StepTwo from './StepTwo/StepTwo';
import StepThree from './StepThree/StepThree';

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
    orders: [
      {
        id: 0,
        dish_id: null,
        no_serverings: 1
      },
    ],
  }

  addOrder = () => {
    this.setState((prevState) => ({
      orders: [...prevState.orders,
        {
          id: prevState.orders.length,
          dish_id: null,
          no_serverings: 1,
        }
      ]
    }));
  }

  removeOrder = () => {
    this.setState((prevState) => {
      let copy = [...prevState.orders]
      let index = copy.length - 1;
      copy.splice(index, 1)
      return { orders: copy }
    })
  }

  updateOrderDish = (event) => {
    let id = event.target.orderid;
    let dish_id = event.target.value;
    this.setState((prevState) => ({
      orders: prevState.orders.map(order => order.id === id ? Object.assign({}, order, { dish_id: dish_id}) : order)
    }))
  }

  updateOrderServing = (event) => {
    // let id = event.target.dishid;
    // let value = event.target.value;
    // this.setState((prevState) => {
    //   return;
    // })
  }


    // make copy
    // replace index of copy with new value

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
      case 'orderDish':
        this.updateOrderDish(event)
        break;
      case 'orderServing':
        this.updateOrderServing(event)
        break;
      default:
        console.log('default');
    }
  }

  handleClick = () => {
    this.setState((state) => ({
      step: state.step + 1
    }))
  }

  render() {
    const { step, meal, restaurant, orders } = this.state;

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
            <StepOne
              handleChange={this.handleChange}
            />
            <button onClick={this.handleClick}>
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <StepTwo
              dishes={dishes}
              meal={meal}
              handleChange={this.handleChange}
            />
            <button onClick={this.handleClick}>
              Next
            </button>
          </div>
        )}
        {step === 3 && (
          <StepThree
            dishes={dishes}
            meal={meal}
            restaurant={restaurant}
            orders={orders}
            addOrder={this.addOrder}
            removeOrder={this.removeOrder}
            handleChange={this.handleChange}
          />
        )}
      </div>
    )
  }
}

export default Form;
