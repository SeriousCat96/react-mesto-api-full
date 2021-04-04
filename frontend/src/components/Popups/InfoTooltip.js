import React from 'react';
import Popup from '../Popup';

function InfoTooltip({isActive, image, title, onClose}) {

  return (
    <Popup
      id = "info-tooltip"
      isActive = {isActive}
      onClose = {onClose}
      viewClass = "form-view"
    >
      <button 
        className = "button popup__close-button" 
        type="button"
        onClick = {onClose}
      />
      <div className = "form-view__register">
        <img className = "form-view__image" alt = "Статус регистрации" src = {image} />
        <h2 className="form-view__title">{title}</h2>
      </div>
    </Popup>
  );
}

export default InfoTooltip;