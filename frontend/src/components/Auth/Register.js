import React from 'react';
import { withRouter } from 'react-router-dom';
import Auth from './Auth';

function Register(props) {
  const { handleRegister } = props;

  return (
    <Auth 
      name = "register"
      title = "Регистрация"
      submitTitle = "Зарегистрироваться"
      handleSubmit = {handleRegister}
    />
  );
}

export default withRouter(Register);