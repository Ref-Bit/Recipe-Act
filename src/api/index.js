import axios from 'axios'
import { sortCategoriesAlphabetically, sortMealsAlphabetically } from '../helpers'

const apiURL = 'https://www.themealdb.com/api/json/v1/1'

export const getExactRecipe = async (id) => {
  let changeURL = `${apiURL}/lookup.php?i=${id}`

  const { data: {meals} } = await axios.get(changeURL);

  return meals[0]
}

export const getRandomRecipe = async () => {
  let changeURL = `${apiURL}/random.php`
  try {
    const { data: {meals} } = await axios.get(changeURL);
  
    return meals[0]   
  } catch (error) {
    console.log(error)
  }
}

export const getRecipeCategories = async () => {
  let changeURL = `${apiURL}/categories.php`

  const { data: {categories} } = await axios.get(changeURL);
  sortCategoriesAlphabetically(categories)

  return categories
}

export const getRecipeCategoriesNamesOnly = async () => {
  let changeURL = `${apiURL}/list.php?c=list`

  const { data: {meals} } = await axios.get(changeURL);
  sortCategoriesAlphabetically(meals)

  return meals
}

export const getRecipeAreasNamesOnly = async () => {
  let changeURL = `${apiURL}/list.php?a=list`

  const { data: {meals} } = await axios.get(changeURL);

  return meals
}

export const filterByCategory = async (category) => {
  let changeURL = `${apiURL}/filter.php?c=${category}`

  const { data: {meals} } = await axios.get(changeURL);
  sortCategoriesAlphabetically(meals)

  return meals
}

export const filterByArea = async (area) => {
  let changeURL = `${apiURL}/filter.php?a=${area}`

  const { data: {meals} } = await axios.get(changeURL);
  sortMealsAlphabetically(meals)

  return meals
}

export const filterByIngredient = async (ingredient) => {
  let changeURL = `${apiURL}/filter.php?i=${ingredient}`

  const { data: {meals} } = await axios.get(changeURL);
  sortMealsAlphabetically(meals)

  return meals
}

export const filterByFirstLetter = async (letter) => {
  let changeURL = `${apiURL}/search.php?f=${letter}`

  try {
    const { data: {meals} } = await axios.get(changeURL);
   
    if (meals !== null){
      sortMealsAlphabetically(meals)
      return meals
    }else{
      return []
    } 
      
  } catch (error) {
    console.log(error)
  }
}

export const searchForRecipe = async (term) => {
  let changeURL = `${apiURL}/search.php?s=${term}`

  try {
    const { data: {meals} } = await axios.get(changeURL);
    
    return meals[0]
  } catch (error) {
    console.log(error)
  }

}