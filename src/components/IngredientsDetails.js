import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipes } from '../redux/slices/fetchReceitas';
import './IngredientsDetails.css';

function IngredientsDetails() {
  const {
    foodIngredients,
    drinkIngredients,
  } = useSelector((state) => state.fetchReceitas);
  const dispatch = useDispatch();

  const { pathname } = window.location;
  const currentURL = pathname.split('/')[2];

  const recipeTypeDictionary = useCallback(() => ({
    comidas: 'foodIngredients',
    bebidas: 'drinkIngredients',
  }), []);

  useEffect(() => {
    dispatch(getRecipes(recipeTypeDictionary()[currentURL]));
  }, [dispatch, currentURL, recipeTypeDictionary]);

  if (foodIngredients.length !== 0 || drinkIngredients.length !== 0) {
    const limitCards = 12;
    let ingredientKey = 'strIngredient';
    let recipeType = foodIngredients.meals;
    let imageURL = 'themealdb';
    if (currentURL === 'bebidas') {
      recipeType = drinkIngredients.drinks;
      ingredientKey = 'strIngredient1';
      imageURL = 'thecocktaildb';
    }

    return (
      <section className="ingredients-container">
        {recipeType.slice(0, limitCards).map((ingredient, index) => (
          <div
            data-testid={ `${index}-ingredient-card` }
            key={ index }
            className="ingredient-card"
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.${imageURL}.com/images/ingredients/${ingredient[ingredientKey]}-Small.png` }
              alt={ ingredient[ingredientKey] }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              {ingredient[ingredientKey]}
            </p>
          </div>
        ))}
      </section>
    );
  }
  return null;
}

export default IngredientsDetails;
