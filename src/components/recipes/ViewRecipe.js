import React, { useContext } from 'react'
import { GlobalContext } from '../../context/Global'

export default () => {
  const { recipe } = useContext(GlobalContext)

  const CategoryIcon = () => {
    switch (recipe.strCategory) {
      case 'Beef': return <i className="fas fa-bacon"></i>
      case 'Breakfast': return <i className="fas fa-egg"></i>
      case 'Chicken': return <i className="fas fa-drumstick-bite"></i>
      case 'Dessert': return <i className="fas fa-stroopwafel"></i>
      case 'Goat': return <i className="fas fa-bacon"></i>
      case 'Lamb': return <i className="fas fa-bacon"></i>
      case 'Miscellaneous': return <i className="fas fa-cookie"></i>
      case 'Pasta': return <i className="fas fa-bacon"></i>
      case 'Pork': return <i className="fas fa-bacon"></i>
      case 'Seafood': return <i className="fas fa-fish"></i>
      case 'Side': return <i className="fas fa-hamburger"></i>
      case 'Starter': return <i className="fas fa-hotdog"></i>
      case 'Vegan': return <i className="fas fa-carrot"></i>
      case 'Vegetarian': return <i className="fas fa-seedling"></i>

      default: return <i className="fas fa-utensils"></i>
    }
  }

  return (
    <React.Fragment>
      <div className="flex justify-center flex-col my-5">
        <div className="w-1/2 border hover:shadow-lg transition duration-300">
          <div className="px-6 py-4">
            <h4 className="font-semibold text-xl mb-2"><i className="fas fa-utensils"></i> {recipe.strMeal}</h4>
            <p className="text-gray-700 text-sm"><CategoryIcon /> {recipe.strCategory}</p>
          </div>
          <hr />
          <div className="px-6 py-4">
            <div className="my-2">
              <h4 className="text-xl font-semibold mb-2">Directions</h4>
              <p className="text-sm">{recipe.strInstructions}</p>
            </div>
            <hr />
            <div className="btn btn-dark btn-block my-3">
              <a href={recipe.strYoutube} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 transition duration-300 ease-in-out bg-red-700 hover:bg-gray-700 transform hover:-translate-y-1 hover:scale-110" target="_blank" rel="noopener noreferrer">View on Youtube <i className="fab fa-youtube"></i></a>
              <a href={recipe.strSource} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 transition duration-300 ease-in-out bg-teal-700 hover:bg-gray-700 transform hover:-translate-y-1 hover:scale-110" target="_blank" rel="noopener noreferrer">View Source <i className="fas fa-external-link-alt"></i></a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
