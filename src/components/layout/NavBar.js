import React from 'react'
import Search from './Search'
import { Link } from 'react-router-dom'

export default () => {

  return (
    <React.Fragment>
      <nav className="flex items-baseline justify-between flex-wrap bg-orange-400 p-6 mb-5">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to={'/'}>
            <span className="font-semibold text-4xl tracking-tight" id="logo">Recipe Act</span>
          </Link>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-lg lg:flex-grow">
            {/* <Link to={'/recipes/random'} className="block mt-4 lg:inline-block lg:mt-0 text-red-600 hover:text-white mr-4 transition duration-300 font-semibold" onClick={refreshRecipe}>
              Random Recipe
            </Link> */}
            <Link to={'/recipes/categories'} className="block mt-4 lg:inline-block lg:mt-0 text-red-600 hover:text-white mr-4 transition duration-300 font-semibold">
              Recipe Categories
            </Link>
          </div>
          <div className="text-lg md:flex-grow" style={{display:'contents'}}>
            <Search />
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}
