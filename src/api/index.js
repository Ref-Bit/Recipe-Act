import axios from 'axios'

const apiURL = 'https://www.themealdb.com/api/json/v1/1'

export const getRandomRecipe = async () => {
  let changeURL = `${apiURL}/random.php`

  const { data: {meals} } = await axios.get(changeURL);

  return meals[0]
}

export const getRecipeCategories = async () => {
  let changeURL = `${apiURL}/categories.php`

  const { data: {categories} } = await axios.get(changeURL);

  return categories
}