import React, { useState, useEffect } from 'react'
import { filterByCategory } from '../../api'
import { Spinner } from '..'
import RecipeCard from './RecipeCard'

export default props => {
  const [ recipes, setRecipes] = useState([])

  useEffect(() => {
    filterByCategory(props.match.params.category)
    .then(data => {
      setRecipes(data)
    })
    .catch( err => console.log(err))
  }, [props.match.params.category])


  if(recipes === null || recipes === undefined || recipes.length === 0) return <Spinner />
  
  else{
    return (
      <div className="my-12 mx-auto px-4 md:px-12">
        <h1 className="text-4xl text-center mb-5">{props.match.params.category} Recipes</h1>
        <div className="flex flex-wrap justify-evenly -mx-1 lg:-mx-4">
         {recipes.map(recipe => (<RecipeCard key={recipe.idMeal} recipe={recipe} />))}
        </div>
      </div>
    )
  }
}
