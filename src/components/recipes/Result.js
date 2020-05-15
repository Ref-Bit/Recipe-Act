import React, { useContext } from 'react'
import { GlobalContext } from '../../context/Global'
import RandomCard from './RandomCard'

export default () => {
  const { searched_recipe } = useContext(GlobalContext)

  if (searched_recipe === undefined || searched_recipe === null || searched_recipe.length === 0) return (<h1 className="text-4xl text-center">No Recipe Found...</h1>)
  else{
    return (
      <div>
        <h1 className="text-4xl text-center">Search Results for {searched_recipe.strMeal}</h1>
        <RandomCard recipe={searched_recipe} />
      </div>
    )
  }
}
