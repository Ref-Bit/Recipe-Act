import React, { useContext } from 'react'
import { GlobalContext } from '../../context/Global'
// import { Link } from 'react-router-dom'

export default () => {
  const { recipe, heading } = useContext(GlobalContext)

  return (
    <React.Fragment>
      <div>
        <h1>{heading}</h1>
        <div className="border hover:shadow-lg hover:bg-gray-100 transition duration-300">
          <div className="px-6 py-4">
            <h4 className="font-semibold text-xl mb-2"><i className="fas fa-utensils"></i> {recipe.strMeal}</h4>
            <p className="text-gray-700 text-base"><i className="fas fa-flag"></i> {recipe.strArea}</p>
          </div>
          <div className="px-6 py-4">
            <a href={`recipes/random/${recipe.idMeal}`} className="btn btn-dark btn-block">
              <span className="inline-block bg-indigo-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2">View Recipe <i className="fas fa-chevron-right"></i></span>
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
