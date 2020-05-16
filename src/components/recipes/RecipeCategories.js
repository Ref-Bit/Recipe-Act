import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getRecipeCategories } from '../../api'
import { Spinner } from '..'

export default () => {
  const [ categories, setCategories] = useState([])

  useEffect(() => {
    getRecipeCategories()
    .then(data => setCategories(data))
    .catch( err => console.log(err))
  }, [])

  if(categories === null || categories === undefined || categories.length === 0) return <Spinner />
  
  else{
    return (
      <div className="my-12 mx-auto px-4 md:px-12">
        <h1 className="text-4xl text-center mb-5">Recipe Categories</h1>
        <div className="flex flex-wrap justify-evenly items-center -mx-1 lg:-mx-4">
          {
            categories.map((category, i) => (
              <React.Fragment key={i}>
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                  <article className="overflow-hidden rounded-lg shadow border-b-4 border-orange-600  hover:border-red-600 hover:shadow-2xl transtion duration-500">
                    <img alt={category.strCategory} className="block h-auto w-full" src={category.strCategoryThumb}/>
                    <div className="flex items-center justify-between leading-tight p-2 md:p-4">
                      <Link to={`/recipes/categories/${category.strCategory}`}>
                        <h1 className="text-xl font-semibold">{category.strCategory}</h1>
                      </Link>
                      <button>
                        <i className="fa fa-heart text-orange-600 hover:text-red-600 transition duration-500 text-xl" title="Like"></i>
                      </button>
                    </div>
                    <div className="flex items-center justify-between leading-none p-2 md:p-4">
                      <div>
                        <input type="checkbox" className="read-more-state" id={`category-${category.idCategory}`} />
                        <p className="read-more-wrap">{category.strCategoryDescription.substring(0, 40)}<span className="read-more-target">{category.strCategoryDescription.substring(40)}</span></p>
                        <label htmlFor={`category-${category.idCategory}`} className="read-more-trigger"></label>
                      </div>
                    </div>
                  </article>
                </div>
              </React.Fragment>
            ))
          }
        </div>
      </div>
    )
  }
}
