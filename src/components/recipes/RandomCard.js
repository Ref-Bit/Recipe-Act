import React, { useState, useEffect  } from 'react'
import { getRandomRecipe } from '../../api'
import Spinner from '../layout/Spinner'
import IngredientIcon from '../../assets/images/ingredients.png'
import YoutubeIcon from '../../assets/images/youtube.png'
import ReferenceIcon from '../../assets/images/reference.png'
import { Link } from 'react-router-dom'

export default () => {
  const [ recipe, setRecipe ] = useState({})
  
  useEffect(() => {
    getRandomRecipe()
    .then(data => {
      setRecipe(data)
    })
    .catch( err => console.log(err))
  }, [])

  if (recipe === null || recipe === undefined || recipe.length === 0) return <Spinner />
  
  else{
    window.onload = () => document.querySelector('.cont_modal').className = "cont_modal";

    const RenderTags = () => {
      if (recipe.strTags === undefined || recipe.strTags === null) return ''
      else{
        if(recipe.strTags.indexOf(",")){
          const tags = recipe.strTags.split(',')
          return(
            <React.Fragment>
              {
                tags.map( (tag, index) => (
                  <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1">#{tag}</span>
                ))
              }
            </React.Fragment>
          )
        }else{
        return (<span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#{recipe.strTags}</span>)
        }
      }
    }

    const RenderPrep = () => {
      if (recipe.strInstructions === undefined || recipe.strInstructions === null) return ''
      else{
        const steps = recipe.strInstructions.split('.').slice(0, -1);
        
        return(
          <div className="cont_text_det_preparation tab-content" id="preparation">
          {
            steps.map((step, i) => 
            (
              <React.Fragment key={i}>
                <div className="cont_title_preparation">
                  <p>STEP {i+1}</p>
                </div>
                <div className="cont_info_preparation">
                  <p>{step}.</p>
                </div> 
              </React.Fragment>
            ))
          }
        </div>  
        )
      }
    }

    const RenderIndgredientsMeasures = () => {
      if (recipe.strIndgredients1 === null || recipe.strMeasure1 === null) return ''
      else{
        const getValues = Object.values(recipe);

        // Slice desired arrays from the main array and clean them up from empty values
        let indgredients = getValues.slice(9, 29).filter( item => { return (item !== undefined || item !== '' || item !== null) });
        let measures = getValues.slice(29, 49).filter( item => { return (item !== undefined || item !== '' || item !== null) });
            
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
              <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 inline-block">
                <img src={indgredient !== undefined
                ? `https://www.themealdb.com/images/ingredients/${indgredient}.png` 
                :  IngredientIcon
                }
                    alt={indgredient}/>       
                <p className="text-center capitalize"><Link to={`/recipes/ingredients/${indgredient}`} className="font-semibold hover:text-indigo-700 transition duration-500"> {indgredient}</Link><br/> {measure}</p>                
              </div>
            </React.Fragment>
          )
        }

        return(
          <div id="ingredients-measures" className="cont_text_det_ingredients tab-content">
            {renderJoined.slice(0, -1)}
          </div>  
        )
      }
    }

    const openTabs = (e, tabName) => {
      let i, tabContent, tabLinks;
      tabContent = document.getElementsByClassName("tab-content");
      for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
      }
      tabLinks = document.getElementsByClassName("tab-link");
      for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
      }
      document.getElementById(tabName).style.display = "block";
      e.currentTarget.className += " active";
    }
    
    const openModal = () => {
      const ele = document.querySelector('.cont_modal');
      const eleParent = document.querySelector('#random-recipe');

      if(ele.className !== "cont_modal cont_modal_active") {
        ele.className = "cont_modal cont_modal_active"
        eleParent.style.left = "17.5rem"
      } else{
        eleParent.style.left = "30rem"
        ele.className = "cont_modal"
      }
    }
    
    return (
      <div id="random-recipe" className="my-12 mx-auto px-4 md:px-12">
        <div className="cont_principal">
          <div className="cont_central">
            <div className="cont_modal cont_modal_active">
              <div className="cont_photo">
                <div className="cont_img_back" style={{background: `url(${recipe.strMealThumb})`}}></div>
                <div className="cont_mins">
                  <div className="sub_mins">
                    <span>Category</span>
                    <h5>
                      <Link to={`recipes/categories/${recipe.strCategory}`}>
                        {recipe.strCategory}
                      </Link>
                    </h5>
                  </div>
                  <div className="cont_icon_right">
                    <button> <i className="fas fa-bookmark"></i></button>
                  </div>
                </div>
                <div className="cont_servings">
                  <span>Cuisine</span>
                  <h5>
                    <Link to={`recipes/cuisines/${recipe.strArea}`}>
                      {recipe.strArea}
                    </Link>
                  </h5>
                </div>
                <div className="px-2 cont_detalles">
                  <h3>{recipe.strMeal}</h3>
                  <RenderTags />
                </div>
              </div>
              <div className="cont_text_ingredients">
                <div className="cont_over_hidden">
                  <div className="cont_tabs">
                    <ul>
                      <li><button className="tab-link active" onClick={(e) => openTabs(e, 'ingredients-measures')}><h4>ingredients & measures</h4></button></li>
                      <li><button className="tab-link" onClick={(e) => openTabs(e, 'preparation')}><h4>preparation</h4></button></li>
                      <li><button className="tab-link" onClick={(e) => openTabs(e, 'view')}><h4>show how</h4></button></li>
                    </ul>  
                  </div>
                  <RenderIndgredientsMeasures />
                  <RenderPrep />
                  <div id="view" className="container mx-5">
                    <div className="flex justify-center align-center w-full pt-16">
                      <div className="mx-8 text-center">
                        <a data-fancybox href={recipe.strYoutube}>
                          <img src={YoutubeIcon} alt="Youtube Link" width="128px"/>
                          YouTube Video
                        </a>
                      </div>
                      <div className="mx-8 text-center">
                        <a href={recipe.strSource} target="_blank" rel="noopener noreferrer"><img src={ReferenceIcon} alt="Source Link" width="128px"/>View Source</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cont_btn_open_dets">
                  <button onClick={openModal}><i className="m-4 fas fa-chevron-right"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}