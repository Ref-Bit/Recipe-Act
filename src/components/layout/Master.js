import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { filterByCategory, filterByFirstLetter } from '../../api'
import { GlobalContext } from '../../context/Global'
import { Spinner } from '..'
import RandomCard from '../recipes/RandomCard'

export default () => {
  const { recipe_categories, letters } = useContext(GlobalContext)
  const [ filteredData, setFilteredData ] = useState([])

  const getCategoryFilterResult = async (category) => {
    const data = await filterByCategory(category);
    setFilteredData(data)
  }

  const getFirstLetterFilterResult = async (letter) => {
    const data = await filterByFirstLetter(letter);
    setFilteredData(data)
  }
  //https://medium.com/@loons.create/react-hooks-how-to-use-usestate-and-useeffect-example-914c161df34d
  // useEffect(() => {
  //   getCategoryFilterResult()

  // }, [])

  if(recipe_categories === null || recipe_categories === undefined || recipe_categories.length === 0) return <Spinner />
  else{
    return (
      <React.Fragment>
      <div className="min-h-screen">
        <h1 className="text-4xl text-center">Random Recipe</h1>
        <RandomCard />
      </div>
      <div id="category_filter" className="py-6">
        <h1 className="text-4xl pb-4 text-center">Filter By Category</h1>
        <div className="button-group filter-button-group inline-flex">
          {
            recipe_categories.map((category, i) => (
              <React.Fragment key={i}>
                <button onClick={() => getCategoryFilterResult(category.strCategory) } className="ml-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow hover:shadow-lg transition duration-500">{category.strCategory}</button>
              </React.Fragment>
            ))
          }
        </div>
      </div>
      <div id="letters_filter" className="py-6">
        <h1 className="text-4xl pb-4 text-center">Filter By First Letter</h1>
        <div className="button-group filter-button-group inline-flex">
          {
            letters.map((letter, i) => (
              <React.Fragment key={i}>
                <button onClick={() => getFirstLetterFilterResult(letter) } className="ml-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow hover:shadow-lg transition duration-500 uppercase">{letter}</button>
              </React.Fragment>
            ))
          }
        </div>
      </div>

      {/* Render Filter Results */}
      <div className="my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {
            filteredData.map((recipe, i) => (
              <React.Fragment key={i}>
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
                  <article className="overflow-hidden rounded-lg shadow border-b-4 border-orange-600  hover:border-red-600 hover:shadow-2xl transtion duration-500">
                  <Link to={`/recipes/${recipe.idMeal}/view`}>  
                    <img alt={recipe.strCategory} className="block h-auto w-full" src={recipe.strMealThumb}/>
                    <div className="flex items-center justify-between leading-tight p-2 md:p-4">
                      <h1 className="text-xl font-semibold">{recipe.strMeal}</h1>
                      <button>
                        <i className="fa fa-heart text-orange-600 hover:text-red-600 transition duration-500 text-xl" title="Like"></i>
                      </button>
                    </div>
                  </Link>
                  </article>
                </div>
              </React.Fragment>
            ))
          }
        </div>
      </div>
    </React.Fragment>
  )}
}
