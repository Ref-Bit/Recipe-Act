import React from 'react'
import { Link } from 'react-router-dom'

export default ({ recipe }) => {

  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 xl:w-1/4">
      <article id={'recipe-' + recipe.idMeal} className="overflow-hidden rounded-lg shadow border-b-4 border-orange-600 hover:border-red-600 hover:shadow-2xl transtion duration-500">
        <Link to={`/recipes/${recipe.idMeal}/view`}>
          <img id="image_card" alt={recipe.strMeal} className="block h-auto w-full" src={recipe.strMealThumb}/>
        </Link>
        <div className="flex items-center justify-between leading-tight p-2 md:p-4">
          <Link to={`/recipes/${recipe.idMeal}/view`}>
            <h1 className="text-xl font-semibold">{recipe.strMeal}</h1>
          </Link>
          <button>
            <i className="fas fa-heart text-orange-600 hover:text-red-600 transition duration-500 text-xl" title="Like"></i>
          </button>
        </div>
      </article>
    </div>
  )
}
