import React, { useContext } from 'react';
import RecipesContext from '../../context/RecipesContext';

function DetailsIngredientList() {
  const { mealId } = useContext(RecipesContext);

  function conditionFor(idx) { // função para não deixar ser iteravel no for quando igrediente fo nulo
    return (mealId[`strIngredient${idx}`]) !== null
    && (mealId[`strIngredient${idx}`] !== '');
  }

  function gettingIngredients() {
    const list = [];
    for (let index = 1; conditionFor(index); index += 1) { // depois tentar fazer com filter, mas tem que tranformar as chaves e valores em objetos
      list.push(`${mealId[`strIngredient${index}`]} -- ${mealId[`strMeasure${index}`]}`); // cria um nova array com ingrediente e quantidade respectivamente
    }
    return list;
  }

  const ingredients = gettingIngredients();

  return (
    <div>
      <h4>Ingredientes</h4>
      <ol>
        {
          ingredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { ingredient }
            </li>
          ))
        }
      </ol>
    </div>
  );
}

export default DetailsIngredientList;
