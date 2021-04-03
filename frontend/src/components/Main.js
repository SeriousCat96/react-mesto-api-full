import React from 'react';
import Profile from './Profile';
import Cards from './Cards';

function Main(props) {
  const { 
    onAddPlacePopupOpen,
    onEditAvatarPopupOpen, 
    onEditProfilePopupOpen, 
    onRemoveCardPopupOpen,
    onImagePopupOpen,
    onCardLike,
    cards } = props;

  return (
    <main className = "content">
      <Profile
        onAddPlacePopupOpen = {onAddPlacePopupOpen}
        onEditAvatarPopupOpen = {onEditAvatarPopupOpen}
        onEditProfilePopupOpen = {onEditProfilePopupOpen}
      />
      <Cards
        items = {cards}
        onRemoveCardPopupOpen = {onRemoveCardPopupOpen}
        onImagePopupOpen = {onImagePopupOpen}
        onCardLike = {onCardLike}
      />
    </main>
  );
}

export default Main;