import React, { Component } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

class ReceitasFavoritas extends Component {
  render() {
    const title = 'Receitas Favoritas';
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

export default ReceitasFavoritas;
