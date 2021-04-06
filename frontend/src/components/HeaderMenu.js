import React from 'react';
import MenuToggle from './MenuToggle';
import { NavLink, Route, Switch, } from 'react-router-dom';

function HeaderMenu({ userEmail, onLogout }) {
  return userEmail ? (
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
          <Switch>
            <Route exact path = "/signin">
              <NavLink to = "/signup" className = "link header__link">Регистрация</NavLink>
            </Route>
            <Route exact path = "/signup">
              <NavLink to = "/signin" className = "link header__link">Войти</NavLink>
            </Route>
          </Switch>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderMenu;