import React, {createContext, useEffect, useReducer} from 'react'
import Reducer from './Reducer'
import { getRecipeCategoriesNamesOnly, getRecipeAreasNamesOnly } from '../api'
import { letters } from '../data/letters.json'

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    // Initial State
    const initialState = {
      recipe_categories: [],
      areas: [],
      letters: [],
      searched_recipe: []
    }

    
  const [state, dispatch] = useReducer(Reducer, initialState);
  
    // Actions
    function fetchRecipeCategories(recipe_categories){
      dispatch({
        type: 'GET_RECIPE_CATEGORIES_NAMES',
        payload: recipe_categories
      });
    }

    function fetchRecipeAreas(areas){
      dispatch({
        type: 'GET_RECIPE_AREAS_NAMES',
        payload: areas
      });
    }

    function fetchLetters(letters){
      dispatch({
        type: 'GET_LETTERS',
        payload: letters
      });
    }

    function searchRecipe(recipe){
      dispatch({
        type: 'SEARCH_RECIPE',
        payload: recipe
      });
    }

    useEffect(() => {
      /* GET RECIPE CATEGORIES NAMES */
      getRecipeCategoriesNamesOnly()
      .then(data => {
        fetchRecipeCategories(data)
      })
      .catch( err => console.log(err))

      /* GET RECIPE AREAS NAMES */
      getRecipeAreasNamesOnly()
      .then(data => {
        fetchRecipeAreas(data)
      })
      .catch( err => console.log(err))

      /* GET LETTERS */
      fetchLetters(letters)
      
    },[]);


  return (
    <GlobalContext.Provider value={{
      recipe_categories: state.recipe_categories,
      areas: state.areas,
      letters: state.letters,
      searched_recipe: state.searched_recipe,
      searchRecipe
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
