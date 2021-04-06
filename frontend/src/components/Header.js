import React from 'react';
import { useLocation } from 'react-router-dom';
import Menu from './Menu';
import logo from '../images/logo.svg';

function Header(props) {
  const location = useLocation();

  const linkText = location.pathname === '/signin' ? 'Регистрация' : 'Войти';
  const linkPath = location.pathname === '/signin' ? '/signup' : '/signin';

  return (
    <header className = "header page__section page__section_indent-size_s">
      <img src = {logo} className = "header__logo" alt = "logo"/>
      <Menu
        {...props}
        linkText = {linkText}
        linkPath = {linkPath}
      />
    </header>
  )
}

export default React.memo(Header);