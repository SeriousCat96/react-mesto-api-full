import React from 'react';
import Popup from '../Popup';
import success from '../../images/success.png';
import fail from '../../images/fail.png';

function InfoTooltip({isActive, isSuccess, onClose}) {
  const img = isSuccess ? success : fail;
  const title = isSuccess ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так! Попробуйте ещё раз.'
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
        <img className = "form-view__image" alt = "Статус регистрации" src = {img} />
        <h2 className="form-view__title">{title}</h2>
      </div>
    </Popup>
  );
}

export default InfoTooltip;