import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fetchReceiveFood from '../Actions/food';
import fetchReceiveDrink from '../Actions/drink';

class RecipesList extends Component {
  constructor() {
    super();
    this.state = {
      filters: [],
      usedButton: 'All',
    };
    this.renderRecipes = this.renderRecipes.bind(this);
    this.fetchFiltersFood = this.fetchFiltersFood.bind(this);
    this.fetchFiltersDrink = this.fetchFiltersDrink.bind(this);
    this.renderFilters = this.renderFilters.bind(this);
    this.fetchFilters = this.fetchFilters.bind(this);
    this.fetchAllDrinksOrFoods = this.fetchAllDrinksOrFoods.bind(this);
  }

  componentDidMount() {
    this.fetchFilters();
  }

  componentWillUnmount() {
    const { onClick } = this.props;
    onClick(false);
  }

  fetchFilters() {
    const { pathName } = this.props;
    if (pathName === '/comidas') {
      this.fetchFiltersFood();
    } else {
      this.fetchFiltersDrink();
    }
  }

  fetchFiltersFood() {
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((response) => this.setState({ filters: response }));
  }

  fetchFiltersDrink() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((response) => this.setState({ filters: response }));
  }

  fetchAllDrinksOrFoods() {
    const { pathName, fetchRecipesDrink, fetchRecipesFood } = this.props;
    this.setState({
      usedButton: 'All',
    });
    if (pathName === '/comidas') {
      return fetchRecipesFood();
    }
    return fetchRecipesDrink();
  }

  renderFilters() {
    const { pathName, fetchRecipesFood, fetchRecipesDrink, onClick } = this.props;
    let mealOrDrink;
    if (pathName === '/comidas') {
      mealOrDrink = 'meals';
    } else {
      mealOrDrink = 'drinks';
    }
    const { filters } = this.state;
    const maxFilters = 5;
    return (
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ this.fetchAllDrinksOrFoods }
        >
          All
        </button>
        {filters[mealOrDrink] && filters[mealOrDrink].map((item, index) => (
          index < maxFilters
          && (
            <button
              type="button"
              key={ index }
              name={ item.strCategory }
              onClick={ (event) => {
                onClick(true);
                this.setState({
                  usedButton: event.target.name,
                });
                if (pathName === '/comidas') {
                  const { usedButton } = this.state;
                  if (usedButton === event.target.name) {
                    this.setState({
                      usedButton: 'All',
                    });
                    return fetchRecipesFood();
                  }
                  return fetchRecipesFood(event.target.name, 'filter');
                }
                const { usedButton } = this.state;
                if (usedButton === event.target.name) {
                  this.setState({
                    usedButton: 'All',
                  });
                  return fetchRecipesDrink();
                }
                return fetchRecipesDrink(event.target.name, 'filter');
              } }
              data-testid={ `${item.strCategory}-category-filter` }
            >
              { item.strCategory }
            </button>)
        ))}
      </div>
    );
  }

  renderRecipes() {
    const { foodAPIResponse: { meals },
      drinkAPIResponse: { drinks },
      pathName } = this.props;
    const maxRecipes = 12;
    if (meals.length !== 0 && pathName === '/comidas') {
      return (
        <>
          {this.renderFilters()}
          {meals.map((meal, index) => {
            if (index < maxRecipes) {
              return (
                <Link to={ { pathname: `/comidas/${meal.idMeal}`, state: meal } }>
                  <div
                    key={ meal.idMeal }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ meal.strMealThumb }
                      alt="Thumb Meal"
                    />
                    <h2 data-testid={ `${index}-card-name` }>{ meal.strMeal }</h2>
                  </div>
                </Link>
              );
            }
            return undefined;
          })}
        </>
      );
    }
    if (drinks.length !== 0 && pathName === '/bebidas') {
      return (
        <>
          {this.renderFilters()}
          {drinks.map((drink, index) => {
            if (index < maxRecipes) {
              return (
                <Link to={ { pathname: `/bebidas/${drink.idDrink}`, state: drink } }>
                  <div
                    key={ drink.idDrink }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ drink.strDrinkThumb }
                      alt="Thumb Drink"
                    />
                    <h2 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h2>
                  </div>
                </Link>
              );
            }
            return undefined;
          })}
        </>
      );
    }
  }

  render() {
    return (
      <>
        { this.renderRecipes() }
      </>
    );
  }
}

RecipesList.propTypes = {
  drinkAPIResponse: PropTypes.shape({
    drinks: PropTypes.arrayOf(),
  }),
  foodAPIResponse: PropTypes.shape({
    meals: PropTypes.arrayOf(),
  }),
  pathName: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  foodAPIResponse: state.recipeReducer.foodRecipes,
  drinkAPIResponse: state.recipeReducer.drinksRecipes,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRecipesFood: (name, filter) => dispatch(fetchReceiveFood(name, filter)),
  fetchRecipesDrink: (name, filter) => dispatch(fetchReceiveDrink(name, filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipesList);