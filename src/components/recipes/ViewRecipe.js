import React, { useState, useEffect, useContext } from 'react'
import { getExactRecipe, filterByCategory } from '../../api'
import { shuffle } from '../../helpers'
import { Link } from 'react-router-dom'
import { Spinner, IndgredientsMeasures } from '..'
import YoutubeIcon from '../../assets/images/youtube.png'
import ReferenceIcon from '../../assets/images/reference.png'
import { GlobalContext } from '../../context/Global'

export default props => {
  const [ recipe, setRecipe ] = useState([])
  const [ related, setRelated ] = useState([])
  const { recipe_categories } = useContext(GlobalContext)

  useEffect(() => {
    getExactRecipe(props.match.params.id)
    .then((data)=>{
      setRecipe(data)
      filterByCategory(data.strCategory)
      .then((data) => {
        setRelated(data)
      }).catch( err => console.log(err) )
    }).catch( err => console.log(err))

  }, [props.match.params.id])
  
  if(recipe === null || recipe === undefined || recipe.length === 0) return <Spinner />
  
  else{
    return (
      <React.Fragment>
        <div className="flex justify-center flex-row flex-wrap my-5">
          <div className="w-3/5 border-b-4 border-orange-600 hover:border-red-600 rounded-b shadow hover:shadow-xl transition duration-500">
            <hr />
            <figure className="imghvr-shutter-out-diag-2 w-full">
              <img className="w-full" src={recipe.strMealThumb} alt={recipe.strMeal} />
              <figcaption className="flex justify-center items-center">
              </figcaption>
              <figcaption className="flex justify-between items-end content-end">
                <Link to={`/recipes/categories/${recipe.strCategory}`}>
                  <p className="text-white text-2xl">
                    <img className="inline-block mx-1 mb-2" src={`${process.env.PUBLIC_URL}/images/${recipe.strCategory.toLowerCase()}-white.png`} alt={recipe.strCategory} width="28px"/>
                    <span>{recipe.strCategory}</span>
                  </p>
                </Link>
                <Link to={`/recipes/cuisines/${recipe.strArea}`}>
                  <p className="text-white text-2xl">
                    <svg className="inline-block mx-1 mb-2 fill-current text-white" enableBackground="new 0 0 512.001 512.001" height="24" viewBox="0 0 512.001 512.001" width="24" xmlns="http://www.w3.org/2000/svg"><g><path d="m401.903 120.522c-10.038-27.464-27.936-51.99-51.239-69.945-27.339-21.063-60.073-32.196-94.663-32.196s-67.325 11.133-94.664 32.196c-23.303 17.955-41.201 42.481-51.239 69.945-60.917 1.204-110.098 51.132-110.098 112.332 0 29.326 11.232 57.077 31.627 78.14 16.937 17.491 38.677 28.823 62.322 32.708v55.298h324.102v-55.298c23.646-3.885 45.386-15.217 62.322-32.708 20.395-21.063 31.627-48.814 31.627-78.14.001-61.2-49.18-111.128-110.097-112.332z"/><path d="m93.95 478.62c0 8.284 6.716 15 15 15h294.102c8.284 0 15-6.716 15-15v-49.62h-324.102z"/></g></svg>
                  {recipe.strArea}</p>
                </Link>
              </figcaption>
            </figure>
            <div className="px-6 py-4">
              <div className="my-2">
                <h4 className="text-center font-semibold text-4xl mb-2">{recipe.strMeal}</h4>
                <br />
                <h4 className="text-2xl text-center mb-2">Directions</h4>
                <p className="text-md text-justify">{recipe.strInstructions}</p>
              </div>
              <hr />
            </div>
            <div className="px-6 py-4">
              <h4 className="text-2xl text-center mb-2">Ingredients</h4>
              <div className="flex flex-wrap justify-evenly overflow-hidden -mx-1 lg:-mx-4">
                <IndgredientsMeasures recipe={recipe} />
              </div>
              <hr />
            </div>
              {recipe.strSource === null && recipe.strYoutube === null 
                ? ''
                : <div className="px-6 py-4">
                    <h4 className="text-2xl text-center">Learn How</h4>
                    <div className="flex flex-wrap justify-evenly">
                    {recipe.strYoutube !== null 
                      ? <figure className="w-16 text-center">
                          <a data-fancybox href={recipe.strYoutube}>
                            <img src={YoutubeIcon} alt="Youtube Link" width="64px"/>
                            <figcaption>YouTube</figcaption>
                          </a>
                        </figure>
                      : ''  
                    }
                    {recipe.strSource !== null 
                      ? <figure className="w-16 text-center">
                          <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">
                            <img src={ReferenceIcon} alt="Source Link"/>
                            <figcaption>Source</figcaption>
                          </a>
                        </figure>
                      : ''
                    }
                    </div>
                  </div>
              } 
          </div>
          <div className="w-2/5 text-center">
            <h4 className="font-semibold text-2xl mb-2">Related Recipes</h4>
            <div className="flex flex-wrap mx-2 lg:mx-4 my-6">
            {
              shuffle(related).slice(0, 6).map((item, i) => (
              <React.Fragment key={i}>
                <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                  <Link to={`/recipes/${item.idMeal}/view`}>
                    <figure className="imghvr-shutter-out-diag-2 overflow-hidden">
                      <img className="w-full" src={item.strMealThumb} alt={item.strMeal} />
                      <figcaption className="flex justify-center items-end content-end">
                        <h4>{item.strMeal}</h4>
                      </figcaption>
                    </figure>
                  </Link>
                </div>
              </React.Fragment>
              ))
            }
            </div>
            <h4 className="font-semibold text-2xl mb-2">Recipes Categories</h4>
            <div className="flex flex-wrap justify-evenly mx-2 lg:mx-4 my-6">
              {
              recipe_categories.map((category, i) => (
                <React.Fragment key={i}>
                  <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
                    <Link to={`/recipes/categories/${category.strCategory}`}>
                      <figure className="text-center overflow-hidden">
                        <img src={`${process.env.PUBLIC_URL}/images/${category.strCategory.toLowerCase()}.png`} alt={category.strCategory} />
                        <figcaption>
                          <h4 className="text-center m-2">{category.strCategory}</h4>
                        </figcaption> 
                      </figure>
                    </Link>
                  </div>
                </React.Fragment>
              ))
              }
            </div>
          </div>

        </div>
      </React.Fragment>
    )
  }
}
