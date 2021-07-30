import React, { Component } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

class ExplorarComidas extends Component {
  render() {
    const title = 'Explorar Comidas';
    const search = 'off';
    return (
      <main>
        <Header
          title={ title }
          search={ search }
        />
        <Footer />
      </main>
    );
  }
}

export default ExplorarComidas;
