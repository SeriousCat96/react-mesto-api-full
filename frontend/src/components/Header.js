import React from 'react';
import HeaderMenu from './HeaderMenu';
import logo from '../images/logo.svg';

function Header(props) {
  return (
    <header className = "header page__section page__section_indent-size_s">
      <img src = {logo} className = "header__logo" alt = "logo"/>
      <HeaderMenu {...props} />
    </header>
  )
}

export default React.memo(Header);