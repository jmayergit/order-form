import { dishes } from './dishes.json'

export const getRestaurantsThatServe = (meal) => {
  let restaurants = [];
  for (var i = 0; i < dishes.length; i++) {
    let dish = dishes[i];
    let restaurant = dish.restaurant;
    if (dish.availableMeals.includes(meal)) {
      if (!restaurants.includes(restaurant)) {
        restaurants.push(restaurant);
      }
    }
  }

  return restaurants;
}
