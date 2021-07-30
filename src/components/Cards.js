import React, { useState, useEffect } from 'react';
import { fetchMealsAPI, fetchCocktailsAPI } from '../Services/Data';

function Cards(props) {
  const [mealsAPI, setMealsAPI] = useState([]);
  const [cocktailsAPI, SetCocktailsAPI] = useState([]);
  const { ApiCallMeals, ApiCallCockTails } = props;

  const getData = () => {
    const dataReceived = [];
    if (ApiCallMeals) {
      const dataReceved = fetchMealsAPI(setMealsAPI);
    }
    if (ApiCallCockTails) {
      const dataReceived = fetchCocktailsAPI(SetCocktailsAPI);
    }
    return dataReceived;
  };

  useEffect(getData, []);

  const renderMeailList = () => {
    if (ApiCallMeals) {
      console.log(ApiCallMeals);
      const maxListRender = 12;
      return (
        mealsAPI.filter((__, index) => index < maxListRender)
          .map((meal, indexMap) => (
            <div
              key={ indexMap }
              data-testid={ `${indexMap}-recipe-card` }
            >
              <h5 data-testid={ `${indexMap}-card-name` }>{meal.strMeal}</h5>
              <img src="" alt={ meal.strMeal } data-testid={ `${indexMap}-card-img` } />
            </div>
          ))
      );
    }
  };

  const renderCocktailsList = () => {
    if (ApiCallCockTails) {
      const maxListRender = 12;
      return (
        cocktailsAPI.filter((__, index) => index < maxListRender)
          .map((meal, indexMap) => (
            <div
              key={ indexMap }
              data-testid={ `${indexMap}-recipe-card` }
            >
              <h5 data-testid={ `${indexMap}-card-name` }>{meal.strDrink}</h5>
              <img src="" alt={ meal.strDrink } data-testid={ `${indexMap}-card-img` } />
            </div>
          ))
      );
    }
  };

  return (
    <div>
      {renderMeailList()}
      {renderCocktailsList()}
    </div>

  );
}

export default Cards;
