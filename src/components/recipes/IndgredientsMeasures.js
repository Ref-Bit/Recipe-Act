import React from 'react'
import { Link } from 'react-router-dom'
import IngredientIcon from '../../assets/images/ingredients.png'

export default ({recipe}) => {
  if (recipe.strIndgredients1 === null || recipe.strMeasure1 === null) return ''
  else{
    const getValues = Object.values(recipe);

    // Slice desired arrays from the main array and clean them up from empty values
    let indgredients = getValues.slice(9, 29).filter( item => item );
    let measures = getValues.slice(29, 49).filter( item => item);

    // Define empty object to combine above arrays
    let joined = {}; 

    // Auto fill the empty object with CUSTOM KEYS AND VALUES(Properties)
    for(let i = 0; i < measures.length; i++){ 
      joined[indgredients[i]] = measures[i]; 
    } 
    
    // Define empty array to render the HTML elements properly
    const renderJoined = [];

    // Destructure the array into its key and property.
    for (const [indgredient, measure] of Object.entries(joined)) {
      renderJoined.push(
        <React.Fragment key={indgredient}>
          <Link to={`/recipes/ingredients/${indgredient}`} >
            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 inline-block">
              <img src={indgredient !== undefined
                ? `https://www.themealdb.com/images/ingredients/${indgredient}.png` 
                :  IngredientIcon
              }
                    alt={indgredient}/>                
                <p className="text-center capitalize"><span className="font-semibold hover:text-indigo-700 transition duration-500">{indgredient}</span><br /> {measure}</p>                
            </div>
          </Link>
        </React.Fragment>
      )
    }

    return(
      <div>
        {renderJoined.slice(0, -1)}
      </div>  
    )
  }
}
