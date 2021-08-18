import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CardRecipes from '../Components/CardRecipes'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RecipesFoods.css';

export default function ExploreDrinksIngredient() {
  
const [drinkIngredients, setDrinkIngredients] = useState([]);
const numberOfIngredients = 12;
const showMaxRecipes = 12;

useEffect(() => {
  const getIngredients = async () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const { drinks } = await fetch(endpoint).then((data) => data.json());
    setDrinkIngredients(drinks);
  };
  getIngredients();
}, []);

const getRecipesByIngredient = async (param) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${param}`;
  const { drinks } = await fetch(endpoint).then((data) => data.json());

  return (
    <div className="cardlist">
        {drinks.length > 0 && drinks.map((recp, index) => (
          index < showMaxRecipes
          && (
            <Link
              className="link"
              key={ recp.idMeal }
              to={ {
                pathname: `/comidas/${recp.idMeal}`,
              } }
            >
              <CardRecipes
                key={ index }
                index={ index }
                thumb={ recp.strMealThumb }
                title={ recp.strMeal }
              />
            </Link>
          )
        ))}
      </div>
  )
  };

const getTwelveIngredients = () => {
  const twelveIngredients = drinkIngredients
    .filter((ingredient, index) => index < numberOfIngredients);
  return (
    twelveIngredients.map((ingredient, index) => {
      const name = ingredient.strIngredient1;
      return (
        <div className='cardlist'>
        <Link
          to="/bebidas"
          key={ index }
          className="ingredient link"
          data-testid={ `${index}-ingredient-card` }
          onClick={ (e) => getRecipesByIngredient(e.target.innerText || e.target.alt) }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png` }
            alt={ name }
            className="foodimg"
          />
          <p
            data-testid={ `${index}-card-name` }
            className="ingredient-title"
          >
            { name }
          </p>
        </Link>
        </div> 
      );
    })
  );
};
return (
  <div>
    <Header />
    <main className="main-ingredients">
      <section className="ingredients-container cardlist">
        { getTwelveIngredients() }
      </section>
    </main>
    <Footer />
  </div>
);
}
