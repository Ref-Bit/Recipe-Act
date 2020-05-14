import React, { useContext, useState, useEffect } from 'react'
import { filterByCategory, filterByFirstLetter, filterByArea, getRandomRecipe } from '../../api'
import { useRandomMealsTimer } from '../../helpers'
import { GlobalContext } from '../../context/Global'
import { Spinner } from '..'
import { RandomRecipe, RecipeCard } from '../index'

export default () => {
  const randomMeals = useRandomMealsTimer()
  const { recipe_categories, letters, areas } = useContext(GlobalContext)
  const [ filteredData, setFilteredData ] = useState([])
  const [ randomRecipe, setRandomRecipe ] = useState([])

  useEffect(() => {
    getNewRecipe()
    setFilteredData(randomMeals)
  }, [randomMeals])
  
  const getNewRecipe = () => {
    getRandomRecipe()
    .then(data => {
      setRandomRecipe(data)
    })
    .catch( err => console.log(err))
  }

  const getCategoryFilterResult = async e => {
    e.persist() //To access the event properties in an asynchronous way
    
    if (e.target.value !== "initial") {
      const data = await filterByCategory(e.target.value);
      setFilteredData(data)
      document.querySelector("#cuisine_filter>option:first-child").selected = true;
      document.querySelector("#letters_filter>option:first-child").selected = true;
    }else {
      setFilteredData(randomMeals)
    }
  }

  const getFirstLetterFilterResult = async e => {
    e.persist() //To access the event properties in an asynchronous way

    if (e.target.value !== "initial") {
      const data = await filterByFirstLetter(e.target.value);
      setFilteredData(data)
      document.querySelector("#category_filter>option:first-child").selected = true;
      document.querySelector("#cuisine_filter>option:first-child").selected = true;
    }else {
      setFilteredData(randomMeals)
    }
  }

  const getAreaFilterResult = async e => {
    e.persist() //To access the event properties in an asynchronous way

    if (e.target.value !== "initial") {
      const data = await filterByArea(e.target.value);
      setFilteredData(data)
      document.querySelector("#letters_filter>option:first-child").selected = true;
      document.querySelector("#category_filter>option:first-child").selected = true;
    }else {
      setFilteredData(randomMeals)
    }
  }

  if(recipe_categories === null || recipe_categories === undefined || recipe_categories.length === 0) return <Spinner />
  else{
    return (
      <React.Fragment>
      <div className="min-h-screen">
        <div className="flex flex-wrap justify-center items-center">
          <h1 className="text-4xl text-center mx-2">Random Recipe</h1>
          <button id="random-btn" onClick={getNewRecipe} className="bg-red-500 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 32 32"><path fill="#fff" fillRule="nonzero" stroke="none" strokeWidth="0" d="M7.38 5.555l15.592-1.367A3.419 3.419 0 0126.673 7.3L28.05 23.06a3.422 3.422 0 01-3.106 3.71L9.352 28.137a3.419 3.419 0 01-3.702-3.113L4.275 9.265a3.422 3.422 0 013.106-3.71zm.2 2.274a1.14 1.14 0 00-1.036 1.237l1.375 15.759a1.14 1.14 0 001.234 1.038l15.591-1.368a1.14 1.14 0 001.036-1.236l-1.376-15.76a1.14 1.14 0 00-1.234-1.037L7.58 7.829zm3.254 5.39a1.69 1.69 0 01-1.825-1.545 1.692 1.692 0 011.53-1.84 1.69 1.69 0 011.825 1.546 1.692 1.692 0 01-1.53 1.839zm10.065-.883a1.69 1.69 0 01-1.826-1.545 1.692 1.692 0 011.53-1.84 1.69 1.69 0 011.825 1.546 1.692 1.692 0 01-1.53 1.84zM11.72 23.373a1.69 1.69 0 01-1.825-1.545 1.692 1.692 0 011.53-1.84 1.69 1.69 0 011.825 1.545 1.692 1.692 0 01-1.53 1.84zm10.065-.883a1.69 1.69 0 01-1.825-1.545 1.692 1.692 0 011.53-1.84 1.69 1.69 0 011.825 1.546 1.692 1.692 0 01-1.53 1.84zm-5.476-4.635a1.69 1.69 0 01-1.825-1.546 1.692 1.692 0 011.53-1.839 1.69 1.69 0 011.825 1.545 1.692 1.692 0 01-1.53 1.84zM29.183 6.823l-.015.002A.915.915 0 0128.167 6c-.265-2.544-2.523-4.39-5.045-4.121h-.007a.916.916 0 01-1.002-.824.922.922 0 01.808-1.018h.002l.007-.001a6.387 6.387 0 014.718 1.408 6.498 6.498 0 012.347 4.363.922.922 0 01-.812 1.016zM8.547 32h-.008a6.395 6.395 0 01-4.578-1.818 6.51 6.51 0 01-1.96-4.553.92.92 0 01.895-.942h.016c.503-.008.917.4.926.91.044 2.559 2.134 4.595 4.67 4.55h.006a.918.918 0 01.927.91.92.92 0 01-.894.943z"></path></svg>
          </button>
        </div>
        <RandomRecipe recipe={randomRecipe} />
      </div>


      {/* FILETRS */}
      <div id="filters" className="py-6 flex flex-wrap justify-center items-center">
        <div className="relative inline-flex mx-2">
          <svg className="w-3 h-3 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero"/></svg>
          <select id="cuisine_filter" onChange={getAreaFilterResult} className="border-2 border-gray-400 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-500 transition duration-300 focus:outline-none appearance-none">
            <option value="initial" defaultValue>Filter By Cuisine</option>
            {
              areas.map((area, i) => (
                <React.Fragment key={i}>
                  <option value={area.strArea}>{area.strArea}</option>
                </React.Fragment>
              ))
            }
          </select>
        </div>
        <div className="relative inline-flex mx-2">
          <svg className="w-3 h-3 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero"/></svg>
          <select id="letters_filter" onChange={getFirstLetterFilterResult} className="border-2 border-gray-400 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-500 transition duration-300 focus:outline-none appearance-none">
            <option value="initial" defaultValue>Filter By First Letter</option>
            {
              letters.map((letter, i) => (
                <React.Fragment key={i}>
                  <option value={letter}>{letter.toUpperCase()}</option>
                </React.Fragment>
              ))
            }
          </select>
        </div>
        <div className="relative inline-flex mx-2">
          <svg className="w-3 h-3 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero"/></svg>
          <select id="category_filter" onChange={getCategoryFilterResult} className="border-2 border-gray-400 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-500 transition duration-300 focus:outline-none appearance-none">
            <option value="initial" defaultValue>Filter By Category</option>
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
      <div id="filter-results" className="my-6 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap justify-evenly items-center -mx-1 lg:-mx-4 mb-6">
          {filteredData.length !== 0
           ? filteredData.map((recipe, i) => (
              <React.Fragment key={i}>
                <RecipeCard recipe={recipe} />
              </React.Fragment>
            ))
          : <h4 className="text-2xl">No Meals Found... <span role="img" aria-label="sad-face">😢</span></h4>
          }
        </div>
      </div>
    </React.Fragment>
  )}
}
