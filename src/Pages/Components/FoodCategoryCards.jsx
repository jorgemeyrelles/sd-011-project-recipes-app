import React from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context_Configs/Context';

export default function FoodCategoryCards() {
  const { foodsForCategory } = React.useContext(Context);
  return (
    <div className="container">
      {foodsForCategory !== 0
      && foodsForCategory.map(({ strMeal, strMealThumb, idMeal }, i) => (
        <Link to={ `/comidas/${idMeal}` } key={ `${strMeal}-${i}` }>
          <div className="col-6 d-inline-block flex-column align-self-center align-items-center mt-3 mb-3" data-testid={ `${i}-recipe-card` }>
            <img
              src={ strMealThumb }
              className="food-card w-100 rounded-circle p-2"
              data-testid={ `${i}-card-img` }
              alt="Imagem de comida"
            />
            <h3 className="text-truncate" data-testid={ `${i}-card-name` }>{strMeal}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
