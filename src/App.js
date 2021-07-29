import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import FooterMenu from './pages/FooterMenu/FooterMenu';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* <Route path="/comidas"component={} />
        <Route path="/bebidas"component={} />
        <Route path="/comidas/:id-da-receita"component={} />
        <Route path="/bebidas/{id-da-receita}"component={} />
        <Route path="/comidas/{id-da-receita}/in-progress"component={} />
        <Route path="/bebidas/{id-da-receita}/in-progress"component={} />
        <Route path="/explorar"component={} />
        <Route path="/explorar/comidas"component={} />
        <Route path="/explorar/bebidas"component={} />
        <Route path="/explorar/comidas/ingredientes"component={} />
        <Route path="/explorar/bebidas/ingredientes"component={} />
        <Route path="/explorar/comidas/area"component={} />
        <Route path="/perfil"component={} />
        <Route path="/receitas-feitas"component={} />
        <Route path="/receitas-favoritas"component={} /> */}
      </Switch>
      <FooterMenu />
    </BrowserRouter>
  );
}

export default App;
