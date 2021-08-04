import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import Carousel from 'react-bootstrap/Carousel';
import favoriteImg from '../images/blackHeartIcon.svg';
import home from '../images/Home.svg';

class FoodDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodDetail: [],
      ingredient: [],
      measure: [],
      recomandation: [],
      disableButton: false,
    };
    this.fetchDetail = this.fetchDetail.bind(this);
    this.renderRecomendations = this.renderRecomendations.bind(this);
    this.saveOnLocalStorage = this.saveOnLocalStorage.bind(this);
  }

  componentDidMount() {
    this.fetchDetail();
    const { match: { params: { id } } } = this.props;
    this.newFunction = () => {
      const favRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      let newFavLocal;
      if (favRecipes !== null) {
        const newFavRecipe = favRecipes[0].id;
        newFavLocal = newFavRecipe;
      }
      console.log(JSON.stringify(newFavLocal));
      if (newFavLocal === id) {
        this.setState({
          disableButton: true,
        });
      }
    };
    this.newFunction();
  }

  saveOnLocalStorage() {
    const { match: { params: { id } } } = this.props;
    const { foodDetail } = this.state;
    const doneRecipes = [{
      id: foodDetail[0].idMeal,
      type: foodDetail[0].strMeal,
      area: foodDetail[0].strArea,
      category: foodDetail[0].strCategory,
      alcoholicOrNot: '',
      name: foodDetail[0].strMeal,
      image: foodDetail[0].strSource,
      doneDate: new Date(),
      tags: foodDetail[0].strTags,
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const favRecipes = JSON.parse(localStorage.getItem('doneRecipes'))[0].id;
    if (favRecipes === id) {
      this.setState({
        disableButton: true,
      });
    }
  }

  async fetchDetail() {
    const { match: { params: { id } } } = this.props;

    const result = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const json = await result.json();

    this.setState({
      foodDetail: json.meals,
    });

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((item) => item.json())
      .then((mewResult) => this.setState({
        recomandation: mewResult.drinks,
      }));

    const filteredIngredients = Object.entries(json.meals[0]).filter(
      (arr) => arr[0].includes('Ingredient') && arr[1],
    );
    const ingredients = filteredIngredients.map((ing) => ({
      ingredient: ing[1],
    }));
    this.setState({
      ingredient: ingredients,
    });
    const filteredMeasure = Object.entries(json.meals[0]).filter(
      (arr) => arr[0].includes('Measure') && arr[1],
    );
    const measure = filteredMeasure.map((eachIngredient) => eachIngredient[1]);
    this.setState({
      measure,
    });
  }

  renderRecomendations() {
    const { recomandation } = this.state;
    const number6 = 6;
    const sliceOfRecomandation = recomandation.slice(0, number6);
    return (
      <Carousel className="rec-carousel" variant="dark">
        { sliceOfRecomandation.map((item, index) => (
          <Carousel.Item
            key={ `rec-${index}` }
            data-testid={ `${index}-recomendation-card` }
          >
            <img className="detailImg" src={ item.strDrinkThumb } alt="imagem" />
            <Carousel.Caption>
              <h5 data-testid={ `${index}-recomendation-title` }>{ item.strDrink }</h5>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }

  render() {
    const { foodDetail, ingredient, measure, recomandation, disableButton } = this.state;
    return (
      <div className="detailContainer">
        {foodDetail && foodDetail.map((result, index) => (
          <div key={ index }>
            <div className="header-detail-recipe">
              <Link to="/comidas">
                <img className="homeImg" src={ home } alt="home" />
              </Link>
              <div className="containerForTitle">
                <h1 data-testid="recipe-title">
                  { result.strMeal }
                </h1>
                <hr id="seraquevai" />
                <p data-testid="recipe-category">
                  { result.strCategory }
                </p>
              </div>
              <button className="hearth" type="button" data-testid="favorite-btn">
                <img src={ favoriteImg } alt="favorite-img" />
              </button>
            </div>
            <img
              className="detailImg"
              data-testid="recipe-photo"
              alt="product-detail-img"
              src={ result.strMealThumb }
            />
            <button
              style={ { color: 'white',
                backgroundColor: 'rgb(151, 0, 0)',
                width: '100%' } }
              type="button"
              data-testid="share-btn"
            >
              Compartilhar
            </button>
            <div className="wrapper">
              <ReactPlayer
                className="player"
                width="100%"
                height="100%"
                url={ result.strYoutube }
                data-testid="video"
              />
            </div>
            { recomandation && this.renderRecomendations() }
            { ingredient && ingredient.map((item, ingredientIndex) => (
              <ul className="instructions" key={ ingredientIndex }>
                <li data-testid={ `${ingredientIndex}-ingredient-name-and-measure` }>
                  { `${item.ingredient} - ${measure[ingredientIndex]}` }
                </li>
              </ul>
            )) }
            <p className="instructions" data-testid="instructions">
              { result.strInstructions }
            </p>
            <button
              id="initRecipe"
              type="button"
              style={ { display: disableButton ? 'none' : 'initial' } }
              data-testid="start-recipe-btn"
              onClick={ () => this.saveOnLocalStorage() }
            >
              Iniciar Receita
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  foodAPIResponse: state.recipeReducer.foodRecipes,
});

FoodDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.objectOf(),
  }),
}.isRequired;

export default connect(mapStateToProps)(FoodDetails);