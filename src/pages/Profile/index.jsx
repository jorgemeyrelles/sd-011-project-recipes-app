import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ContainerProfile, ButtonProfile, ButtonLogout } from './styles';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  function Logout() {
    localStorage.clear();
    history.push('/');
  }
  return (
    <div>
      <ContainerProfile>
        <Header title="PERFIL" />

        <h1 data-testid="profile-email">{user && user.email}</h1>

        <div>
          <ButtonProfile
            type="button"
            onClick={ () => history.push('/receitas-feitas') }
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </ButtonProfile>
          <ButtonProfile
            type="button"
            onClick={ () => history.push('/receitas-favoritas') }
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </ButtonProfile>
          <ButtonLogout
            type="button"
            onClick={ Logout }
            data-testid="profile-logout-btn"
          >
            Sair
          </ButtonLogout>
        </div>
      </ContainerProfile>
      <Footer />
    </div>
  );
}
