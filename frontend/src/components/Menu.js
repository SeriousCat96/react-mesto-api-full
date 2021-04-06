import React from 'react';
import { Link } from 'react-router-dom';

function Menu({ isLoggedIn, userEmail, linkPath, linkText, onLogout}) {
  return (
    <div className="header__menu">
    {
      isLoggedIn ? (
        <>
          <p className="header__text">{userEmail}</p>
          <Link to="/signout" className="link header__link" onClick = {onLogout}>Выйти</Link>
        </>
      ) : (
        <Link to={linkPath} className="link header__link">{linkText}</Link>
      )
    }
    </div>
  );
}

export default Menu;