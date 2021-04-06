import React from 'react';
import MenuToggle from './MenuToggle';
import { NavLink } from 'react-router-dom';

function HeaderMenu({ isLoggedIn, userEmail, linkPath, linkText, onLogout }) {
  return isLoggedIn ? (
    <>
      <MenuToggle />
      <div className = "header__menu">
        <h2 className = "text-ellipsis header__email">{userEmail}</h2>
        <nav>
          <ul className = "list header__menu-items">
            <li>
              <NavLink to = "/signout" className = "link header__link" onClick = {onLogout}>Выйти</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  ) : (
    <nav className = "header__menu">
      <ul className = "list header__menu-items">
        <li>
          <NavLink to={linkPath} className="link header__link">{linkText}</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderMenu;