export default (state, action) => {
  switch (action.type) {
    case 'GET_RANDOM_RECIPE': return {...state, recipe: action.payload, heading: 'Random Recip'};
    default: return state;
  }
}