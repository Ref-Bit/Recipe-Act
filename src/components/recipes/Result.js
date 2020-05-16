import React, { useContext } from 'react'
import { GlobalContext } from '../../context/Global'
import RandomCard from './RandomCard'

export default props => {
  const { searched_recipe } = useContext(GlobalContext)

  if (searched_recipe === undefined || searched_recipe === null || searched_recipe.length === 0){
    return (
      <div className="flex flex-col flex-wrap justify-evenly">
        <h1 className="text-2xl text-center">No Recipe Found...</h1>
        <img className="inline-block mx-auto mt-2" src={`${process.env.PUBLIC_URL}/images/no-data.svg`} alt='No Data...' width="512px"/>
      </div>
    )
  } 
  else{
    return (
      <div>
        <h1 className="text-4xl text-center">Search Results for {props.location.state.term}</h1>
        <RandomCard recipe={searched_recipe} />
      </div>
    )
  }
}
