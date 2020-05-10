export const sortMealsAlphabetically = data => {
  data.sort((a, b) => {
    if(a.strMeal < b.strMeal) { return -1; }
    if(a.strMeal > b.strMeal) { return 1; }
    return 0;
  })
}

export const sortCategoriesAlphabetically = data => {
  data.sort((a, b) => {
    if(a.strCategory < b.strCategory) { return -1; }
    if(a.strCategory > b.strCategory) { return 1; }
    return 0;
  })
}