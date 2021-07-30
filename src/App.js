import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Drinks from './pages/Drinks/Drinks';
import Explore from './pages/Explore/Explore';
import Foods from './pages/Foods/Foods';
import Profile from './pages/Profile/Profile';
import ExploreFoods from './pages/Explore/ExploreFoods';
import ExploreDrinks from './pages/Explore/ExploreDrinks';
import ExploreFoodIngredients from './pages/Explore/ExploreFoodIngredients';
import ExploreDrinksIngredients from './pages/Explore/ExploreDrinksIngredients';
import ExploreFoodsArea from './pages/Explore/ExploreFoodsArea';
import FoodDetails from './pages/Details/FoodDetails';
import FoodInProgress from './pages/InProgress/FoodInProgress';
import DrinkDetails from './pages/Details/DrinkDetails';
import DrinkInProgress from './pages/InProgress/DrinkInProgress';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route path="/comidas/:id" component={ FoodDetails } />
        <Route path="/comidas/:id/in-progress" component={ FoodInProgress } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route path="/bebidas/:id" component={ DrinkDetails } />
        <Route path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
        <Route exact path="/explorar" component={ Explore } />
        <Route path="/explorar/comidas" component={ ExploreFoods } />
        <Route path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodIngredients }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinksIngredients }
        />
        <Route path="/explorar/comidas/area" component={ ExploreFoodsArea } />
        <Route path="/perfil" component={ Profile } />
      </Switch>
    </div>
  );
}
export default App;
