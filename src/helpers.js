import { useState, useEffect } from 'react';
import axios from 'axios';

export const sortMealsAlphabetically = data => {
  data.sort((a, b) => {
    if(a.strMeal < b.strMeal) { return -1; }
    if(a.strMeal > b.strMeal) { return 1; }
    return 0;
  })
}

export const sortCategoriesAlphabetically = data => {
  data.sort((a, b) => {
    if(a.strCategory < b.strCategory) { return -1; }
    if(a.strCategory > b.strCategory) { return 1; }
    return 0;
  })
}

/* CUSTOM HOOK */
export const useRandomMealsTimer=()=>{
  const [randomMeals, setRandomMeals] = useState([]);
  const mealsArr = [];
  let counter = 0;
  
  useEffect(() => {
    const timer = setInterval(() => {
      counter++;
      
      axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(({ data: {meals} }) => {
        mealsArr.push(meals[0])
        setRandomMeals(mealsArr)
      })
      .catch( err => console.log(err))
      
      if (counter === 10) {
        clearInterval(timer);
      }
    
    }, 1000);

  }, [counter]);

  return randomMeals
} 

export const shuffle = (array) => {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}