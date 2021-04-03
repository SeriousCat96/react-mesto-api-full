import React from 'react';
import Popup from './Popup';

function ImagePopup(props) {
  const { isActive, selectedCard, onClose } = props;
  
  console.debug("render remove card popup");
  
  return (
    <Popup
      id = "card-preview"
      isActive = {isActive}
      onClose = {onClose}
      viewClass = "picture-view"
    >
      <div className = "picture-view__container">
        <button 
          className = "button popup__close-button" 
          type = "button"
          onClick = {onClose}
        />
        <img 
          className = "picture-view__image" 
          src = {selectedCard.link} 
          alt = "Изображение карточки"
        />
      </div>
      <h2 className = "picture-view__caption text-ellipsis">
        {selectedCard.name}
      </h2>
    </Popup>
  );
}

export default ImagePopup;