import React, {createContext, useEffect, useReducer} from 'react'
import Reducer from './Reducer'
import { getRandomRecipe } from '../api'

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    // Initial State
    const initialState = {
      recipe: [],
      heading: 'Heading Title'
    }

    
  const [state, dispatch] = useReducer(Reducer, initialState);
  
    // Actions
    function fetchRandomRecipe(recipe){
      dispatch({
        type: 'GET_RANDOM_RECIPE',
        payload: recipe
      });
    }
  
    useEffect(() => {
      getRandomRecipe()
      .then(data => {
        console.log(data)
        fetchRandomRecipe(data)
      })
      .catch( err => console.log(err))
      
    },[]);


  return (
    <GlobalContext.Provider value={{
      recipe: state.recipe,
      heading: state.heading,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
