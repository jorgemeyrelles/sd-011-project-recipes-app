import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ index, foodOrDrinkBtn, id }) {
  const { idDetails } = useContext(AppContext);
  const details = idDetails[0];
  console.log('details', details);
  const [favorite, setFavorite] = useState(false);
  const favRecipes = {
    id: foodOrDrinkBtn === 'comidas' ? details.idMeal : details.idDrink,
    type: foodOrDrinkBtn === 'comidas' ? 'comida' : 'bebida',
    area: details.strArea || '',
    category: details.strCategory || '',
    alcoholicOrNot: details.strAlcoholic || '',
    name: foodOrDrinkBtn === 'comidas' ? details.strMeal : details.strDrink,
    image: foodOrDrinkBtn === 'comidas' ? details.strMealThumb : details.strDrinkThumb,
  };

  const local = localStorage.getItem('favoriteRecipes');
  const favRec = JSON.parse(local);
  const hasId = local && Object.keys(favRec)
    .map((el) => favRec[el].id).some((x) => x === id);

  function handleFavorite() {
    setFavorite(!favorite);
    if (!local) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favRecipes]));
    } else if (!hasId) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favRec, favRecipes]));
    } else {
      const filter = favRec.filter((el) => el.id !== id);
      // localStorage.removeItem('favoriteRecipes');
      localStorage.setItem('favoriteRecipes', JSON.stringify(filter));
    }
  }

  return (
    <button
      type="button"
      onClick={ () => handleFavorite() }
      data-testid={ `${index}-horizontal-favorite-btn` }
    >
      <img
        data-testid="favorite-btn"
        src={ hasId ? blackHeartIcon : whiteHeartIcon }
        alt="Imagem do ícone de favorito"
      />
    </button>
  );
}

export default FavoriteButton;

FavoriteButton.propTypes = {
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  foodOrDrinkBtn: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

FavoriteButton.defaultProps = {
  index: 0,
};