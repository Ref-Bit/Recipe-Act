import React, { useState, useEffect } from "react"
// import { GlobalContext } from "../../context/Global"

export default () => {
  const [userInput, setUserInput] = useState('');
  const [recipe, setRecipe] = useState({});
  // const { searchRecipes } = useContext(GlobalContext);

  useEffect(() => {

  },[]);

  const handleSubmit = e => {
    e.preventDefault();
    setRecipe(userInput);
  };

  const handleChange = e => {
    setUserInput(e.target.value);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="flex items-center border-b-2 border-white py-2 hover:border-red-600 transition duration-500">
          <input id="search" name="userInput" value={userInput} className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Type some recipe name..." aria-label="Recipe Name" onChange={handleChange}/>
          <button className="flex-shrink-0 bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600 text-sm border-4 text-white py-1 px-2 rounded shadow font-semibold transition duration-500" type="submit">
            Search
          </button>
        </div>
      </form>
    </React.Fragment>
  )
}
