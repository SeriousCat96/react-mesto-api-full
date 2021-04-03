import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Profile(props) {
  const { avatar, name, about } = React.useContext(CurrentUserContext);
  const { onAddPlacePopupOpen, onEditAvatarPopupOpen, onEditProfilePopupOpen } = props;

  return (
    <section className = "profile page__section page__section_indent-size_m">
      <div className = "profile__avatar">
        <button 
          className = "button profile__button profile__button_type_edit-image" 
          type = "button"
          onClick = {onEditAvatarPopupOpen}
        />
        <img className = "profile__image" src = {avatar} alt = "Аватар" />
      </div>
      <div className = "profile__info">
        <h1 className = "profile__title text-ellipsis">{name}</h1>
        <p className = "profile__subtitle text-ellipsis">{about}</p>
        <button 
          className = "button profile__button profile__button_type_edit" 
          type = "button"
          onClick = {onEditProfilePopupOpen}
        />
      </div>
      <button 
        className = "button profile__button profile__button_type_add" 
        type = "button"
        onClick = {onAddPlacePopupOpen}
      />
    </section>
  );
}

export default Profile;