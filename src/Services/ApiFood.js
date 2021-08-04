export const getFoodByIngredients = (input) => fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`)
  .then((response) => (
    response
      .json()
      .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
  ));

export const getFoodByName = (input) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
  .then((result) => (
    result
      .json()
      .then((json) => (result.ok ? Promise.resolve(json) : Promise.reject(json)))
  ));

export const getFoodByFirstLetter = (input) => fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`)
  .then((results) => (
    results
      .json()
      .then((json) => (results.ok ? Promise.resolve(json) : Promise.reject(json)))
  ));

//! ====================================================================
export const getDetailsFoodById = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((details) => (
      details
        .json()
        .then((json) => (details.ok ? Promise.resolve(json) : Promise.reject(json)))
    ));
};