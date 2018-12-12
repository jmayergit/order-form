import * as React from 'react';

const StepThree = ({ dishes, meal, restaurant, orders, handleChange, addOrder, removeOrder }) => {
  const availableDishes = dishes.filter(
    dish => dish.restaurant === restaurant
  ).filter(
    dish => dish.availableMeals.includes(meal)
  )

  return (
    <div>
      {orders.map( order =>
        <div key={order.id} onChange={handleChange}>
          <div>Please Select a Dish</div>
          <select name="orderDish" orderid={order.id}>
            {availableDishes.map(availableDish => (
              <option key={availableDish.id} value={availableDish.id}>{availableDish.name}</option>
            ))}
          </select>
          <select name="orderServing" orderid={order.id}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          {order.id === orders.length - 1 && order.id !== 0 && (
            <button onClick={removeOrder}>
              Remove
            </button>
          )}
        </div>
      )}
      <button onClick={addOrder}>
        Add Another order
      </button>
    </div>
  );
}

export default StepThree;
