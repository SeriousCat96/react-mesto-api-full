import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
  const { userEmail, isLoggedIn, onLogout } = props;
  const location = useLocation();

  const linkText = location.pathname === '/sign-in' ? 'Регистрация' : 'Войти';
  const linkPath = location.pathname === '/sign-in' ? 'sign-up' : '/sign-in';

  return (
    <header className = "header page__section page__section_indent-size_s">
      <img src = {logo} className = "header__logo" alt = "logo"/>
      {
        isLoggedIn ? (
          <div className="header__auth">
              <p className="header__text">{userEmail}</p>
              <button className="button header__button" onClick = {onLogout}>Выйти</button>
          </div>
        ) : (
          <div className="header__auth">
              <Link to={linkPath} className="header__link">{linkText}</Link>
          </div>
        )
      }
    </header>
  )
}

export default React.memo(Header);