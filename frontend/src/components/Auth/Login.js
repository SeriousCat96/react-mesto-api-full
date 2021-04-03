import React from 'react';
import { withRouter } from 'react-router-dom';
import Auth from './Auth';

function Login(props) {
  const { handleLogin } = props;

  return (
    <Auth 
      name = "login"
      title = "Вход"
      submitTitle = "Войти"
      handleSubmit = {handleLogin}
    />
  );
}

export default withRouter(Login);