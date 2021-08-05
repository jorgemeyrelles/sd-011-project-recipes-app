import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  function verifyLogin() {
    const validEmail = /\S+@\S+\.\S+/;
    const pwLength = 6;
    if ((password.length > pwLength) && (validEmail.test(email))) {
      return false;
    }
    return true;
  }

  function submitButton() {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    dispatch({ type: 'LOGIN', email });
    history.push('/comidas');
  }

  return (
    <form>
      <h1>Login</h1>
      <input
        type="email"
        value={ email }
        data-testid="email-input"
        onChange={ ({ target }) => setEmail(target.value) }
      />
      <input
        type="password"
        value={ password }
        data-testid="password-input"
        onChange={ ({ target }) => setPassword(target.value) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ submitButton }
        disabled={ verifyLogin() }
      >
        Entrar
      </button>
      <button
        type="button"
        onClick={ () => { setPassword('1234567'); setEmail('teste@teste.com'); } }
      >
        DEV BUTTON
      </button>
      <button
        type="button"
        onClick={ () => localStorage.clear() }
      >
        CLEAR LOCAL STORAGE
      </button>
    </form>
  );
}