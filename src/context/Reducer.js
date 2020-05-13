export default (state, action) => {
  switch (action.type) {
    case 'GET_RECIPE_CATEGORIES_NAMES': return {...state, recipe_categories: action.payload, heading: 'Recipe Categories'};
    case 'GET_RECIPE_AREAS_NAMES': return {...state, areas: action.payload, heading: 'Recipe Areas'};
    case 'GET_LETTERS': return {...state, letters: action.payload };
    default: return state;
  }
}