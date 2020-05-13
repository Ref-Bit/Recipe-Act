import React, { useContext, useState, useEffect } from 'react'
import { filterByCategory, filterByFirstLetter, filterByArea } from '../../api'
import { useRandomMealsTimer } from '../../helpers'
import { GlobalContext } from '../../context/Global'
import { Spinner } from '..'
import { RandomRecipe, RecipeCard } from '../index'

export default () => {
  const randomMeals = useRandomMealsTimer()
  const { recipe_categories, letters, areas } = useContext(GlobalContext)
  const [ filteredData, setFilteredData ] = useState([])

  const getCategoryFilterResult = async e => {
    e.persist() //To access the event properties in an asynchronous way

    if (e.target.value !== "initial") {
      const data = await filterByCategory(e.target.value);
      setFilteredData(data)
    }else {
      return ''
    }
  }

  const getFirstLetterFilterResult = async e => {
    e.persist() //To access the event properties in an asynchronous way

    if (e.target.value !== "initial") {
      const data = await filterByFirstLetter(e.target.value);
      setFilteredData(data)
    }else {
      return ''
    }
  }

  const getAreaFilterResult = async e => {
    e.persist() //To access the event properties in an asynchronous way

    if (e.target.value !== "initial") {
      const data = await filterByArea(e.target.value);
      setFilteredData(data)
    }else {
      return ''
    }
  }

  if(recipe_categories === null || recipe_categories === undefined || recipe_categories.length === 0) return <Spinner />
  else{
    return (
      <React.Fragment>
      <div className="min-h-screen">
        <h1 className="text-4xl text-center">Random Recipe</h1>
        <RandomRecipe />
      </div>

      <div className="min-h-screen">
        <h1 className="text-4xl text-center">Random Recipes</h1>
          <div className="my-12 mx-auto px-4 md:px-12">
            <div className="flex flex-wrap -mx-1 lg:-mx-4 justify-evenly">
            {
              randomMeals.map((recipe, i) => (
                <React.Fragment key={i}>
                  <RecipeCard recipe={recipe} />
                </React.Fragment>
              ))
            }
          </div>
        </div>
      </div>

      {/* FILETRS */}
      <div id="filters" className="py-6 flex flex-wrap justify-center">
        <div id="cuisine_filter" className="relative inline-flex mx-2">
          <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero"/></svg>
          <select onChange={getAreaFilterResult} className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
            <option value="initial">Filter By Cuisine</option>
            {
              areas.map((area, i) => (
                <React.Fragment key={i}>
                  <option value={area.strArea}>{area.strArea}</option>
                </React.Fragment>
              ))
            }
          </select>
        </div>
        <div id="letters_filter" className="relative inline-flex mx-2">
          <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero"/></svg>
          <select onChange={getFirstLetterFilterResult} className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
            <option value="initial">Filter By First Letter</option>
            {
              letters.map((letter, i) => (
                <React.Fragment key={i}>
                  <option value={letter} className="uppercase">{letter}</option>
                </React.Fragment>
              ))
            }
          </select>
        </div>
        <div id="cuisine_filter" className="relative inline-flex mx-2">
          <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero"/></svg>
          <select onChange={getCategoryFilterResult} className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
            <option value="initial">Filter By Category</option>
            {
              recipe_categories.map((category, i) => (
                <React.Fragment key={i}>
                  <option value={category.strCategory}>{category.strCategory}</option>
                </React.Fragment>
              ))
            }
          </select>
        </div>
      </div>

      {/* Render Filter Results */}
      <div className="my-6 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {
            filteredData.map((recipe, i) => (
              <React.Fragment key={i}>
                <RecipeCard recipe={recipe} />
              </React.Fragment>
            ))
          }
        </div>
      </div>
    </React.Fragment>
  )}
}
