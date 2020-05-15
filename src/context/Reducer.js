export default (state, action) => {
  switch (action.type) {
    case 'GET_RECIPE_CATEGORIES_NAMES': return {...state, recipe_categories: action.payload};
    case 'GET_RECIPE_AREAS_NAMES': return {...state, areas: action.payload};
    case 'GET_LETTERS': return {...state, letters: action.payload};
    case 'SEARCH_RECIPE': return {...state, searched_recipe: action.payload};
    default: return state;
  }
}