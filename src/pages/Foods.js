import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Foods() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [toggle, setToggle] = useState('');

  async function fetchFoods() {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endpoint);
    const json = await response.json();
    setData(json);
  }

  useEffect(() => {
    fetchFoods();
  }, []);

  async function categoriesFood() {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(endpoint);
    const json = await response.json();
    setCategories(json);
  }

  useEffect(() => {
    categoriesFood();
  }, []);

  function searchByCategory({ target }) {
    if (toggle === target.name) {
      setToggle('');
    } else if (toggle === '') {
      setToggle(target.name);
    } else {
      setToggle(target.name);
    }
  }

  useEffect(() => {
    if (toggle) {
      const changeCategorieFood = async () => {
        const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${toggle}`;
        const response = await fetch(endpoint);
        const json = await response.json();
        setData(json);
      };
      changeCategorieFood();
    } else {
      fetchFoods();
    }
  }, [toggle]);

  const maxArrayFoods = 12;
  const maxArrayCategories = 5;

  return (
    <main>
      <Header title="Comidas" />
      <button
        type="button"
        onClick={ () => fetchFoods() }
        data-testid="All-category-filter"
      >
        All
      </button>
      {categories.length === 0 ? <p>Loading</p>
        : categories.meals.slice(0, maxArrayCategories).map((categorie, index) => (
          <div key={ index }>
            <button
              type="button"
              data-testid={ `${categorie.strCategory}-category-filter` }
              onClick={ (e) => searchByCategory(e) }
              name={ categorie.strCategory }
            >
              {categorie.strCategory}
            </button>
          </div>
        ))}
      {data.length === 0 ? <p>Loading</p>
        : data.meals.slice(0, maxArrayFoods).map((food, index) => (
          <Link to={ `/comidas/${food.idMeal}` } key={ index }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                src={ food.strMealThumb }
                alt="comida_principal"
                data-testid={ `${index}-card-img` }
                width="50px"
              />
              <p data-testid={ `${index}-card-name` }>{food.strMeal}</p>
            </div>
          </Link>
        ))}
      <Footer />
    </main>
  );
}

export default Foods;