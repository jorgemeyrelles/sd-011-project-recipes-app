import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import FoodDetails from '../pages/FoodDetails';
import DrinkDetails from '../pages/DrinkDetails';
import FoodRecipeInProgress from '../pages/FoodRecipeInProgress';
import DrinkRecipeInProgress from '../pages/DrinkRecipeInProgress';
import Explore from '../pages/Explore';
import FoodExplore from '../pages/FoodExplore';
import DrinkExplore from '../pages/DrinkExplore';
import FoodExploreIngredients from '../pages/FoodExploreIngredients';
import DrinkExploreIngredients from '../pages/DrinkExploreIngredients';
import FoodExploreArea from '../pages/FoodExploreArea';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoritesRecipes from '../pages/FavoritesRecipes';
import NotFound from '../pages/NotFound';

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/"
      component={ Login }
    />
    <Route
      exact
      path="/comidas"
      component={ Foods }
    />
    <Route
      exact
      path="/bebidas"
      component={ Drinks }
    />
    <Route
      exact
      path="/comidas/:id"
      component={ FoodDetails }
    />
    <Route
      exact
      path="/bebidas/:id"
      component={ DrinkDetails }
    />
    <Route
      exact
      path="/comidas/:id/in-progress"
      component={ FoodRecipeInProgress }
    />
    <Route
      exact
      path="/bebidas/:id/in-progress"
      component={ DrinkRecipeInProgress }
    />
    <Route
      exact
      path="/explorar"
      component={ Explore }
    />
    <Route
      exact
      path="/explorar/comidas"
      component={ FoodExplore }
    />
    <Route
      exact
      path="/explorar/bebidas"
      component={ DrinkExplore }
    />
    <Route
      exact
      path="/explorar/comidas/ingredientes"
      component={ FoodExploreIngredients }
    />
    <Route
      exact
      path="/explorar/bebidas/ingredientes"
      component={ DrinkExploreIngredients }
    />
    <Route
      exact
      path="/explorar/comidas/area"
      component={ FoodExploreArea }
    />
    <Route
      exact
      path="/perfil"
      component={ Profile }
    />
    <Route
      exact
      path="/receitas-feitas"
      component={ DoneRecipes }
    />
    <Route
      exact
      path="/receitas-favoritas"
      component={ FavoritesRecipes }
    />
    <Route
      component={ NotFound }
    />
  </Switch>
);

export default Routes;
