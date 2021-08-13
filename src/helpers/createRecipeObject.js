import identifyRecipeType from './identifyRecipeType';

function createRecipeObject(foods, drinks) {
  const recipeType = identifyRecipeType();
  let recipeObject = {};
  if (recipeType === 'comidas') {
    recipeObject = {
      linkToGo: 'comidas',
      recipes: foods,
      type: 'meals',
      id: 'idMeal',
      name: 'strMeal',
      image: 'strMealThumb',
      category: 'strCategory',
      area: 'strArea',
      alcoholic: '',
      storage: 'meals',
      fetchId: 'foods',
      title: 'Comidas',
      categoriesId: 'allFoodsCategories',
      filterByCategory: 'filterByFoodCategorie',
      filterByIngredient: 'foodByIngredients',
    };
  } else {
    recipeObject = {
      linkToGo: 'bebidas',
      recipes: drinks,
      type: 'drinks',
      id: 'idDrink',
      name: 'strDrink',
      image: 'strDrinkThumb',
      category: 'strAlcoholic',
      area: '',
      alcoholic: 'strAlcoholic',
      storage: 'cocktails',
      fetchId: 'drinks',
      title: 'Bebidas',
      categoriesId: 'allDrinksCategories',
      filterByCategory: 'filterByDrinkCategorie',
      filterByIngredient: 'drinkByIngredients',
    };
  }
  return recipeObject;
}

export default createRecipeObject;