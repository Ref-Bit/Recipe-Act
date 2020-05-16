import axios from 'axios'
import { sortCategoriesAlphabetically, sortMealsAlphabetically } from '../helpers'

const apiURL = 'https://www.themealdb.com/api/json/v1/1'

export const getExactRecipe = async (id) => {
  let changeURL = `${apiURL}/lookup.php?i=${id}`

  try {
    const { data: {meals} } = await axios.get(changeURL);

    if(meals !== null){
      return meals[0]   
    }else{
      return []
    }
  } catch (error) {
    console.log(error)
  }
}

export const getRandomRecipe = async () => {
  let changeURL = `${apiURL}/random.php`
  
  try {
    const { data: {meals} } = await axios.get(changeURL);

    if(meals !== null){
      return meals[0]   
    }else{
      return []
    }
  } catch (error) {
    console.log(error)
  }
}

export const getRecipeCategories = async () => {
  let changeURL = `${apiURL}/categories.php`

  try {
    const { data: {categories} } = await axios.get(changeURL);
    
    if (categories !== null){
    sortCategoriesAlphabetically(categories)
  
    return categories
    }else{
      return []
    }
  } catch (error) {
    console.log(error)
  }
}

export const getRecipeCategoriesNamesOnly = async () => {
  let changeURL = `${apiURL}/list.php?c=list`

  try {
    const { data: {meals} } = await axios.get(changeURL);

    if (meals !== null){
      sortCategoriesAlphabetically(meals)
    
      return meals
    }else{
      return []
    }
  } catch (error) {
    console.log(error)
  }
}

export const getRecipeAreasNamesOnly = async () => {
  let changeURL = `${apiURL}/list.php?a=list`

  try {
    const { data: {meals} } = await axios.get(changeURL);

    if (meals !== null){  
      return meals
    }else{
      return []
    }
  } catch (error) {
    console.log(error)
  }
}

export const filterByCategory = async (category) => {
  let changeURL = `${apiURL}/filter.php?c=${category}`

  try {
    const { data: {meals} } = await axios.get(changeURL);

    if (meals !== null){
      sortCategoriesAlphabetically(meals)
    
      return meals
    }else{
      return []
    }
  } catch (error) {
    console.log(error)
  }
}

export const filterByArea = async (area) => {
  let changeURL = `${apiURL}/filter.php?a=${area}`

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

export const filterByIngredient = async (ingredient) => {
  let changeURL = `${apiURL}/filter.php?i=${ingredient}`

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
    
    if (meals !== null){
      return meals[0]
    }else{
      return []
    } 
  } catch (error) {
    console.log(error)
  }

}