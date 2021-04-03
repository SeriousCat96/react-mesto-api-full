import React from 'react';
import PopupWithForm from '../PopupWithForm';

function RemoveCardPopup(props) {
  const { isActive, isProcessing, onCardRemove, onClose } = props;
  
  console.debug("render remove card popup");
  
  return (
    <PopupWithForm
      id = "remove-card"
      name = "removeCard"
      title = "Вы уверены?"
      submitTitle = "Да"
      processingTitle = "Удаление..."
      isProcessing = {isProcessing}
      isActive = {isActive}
      onSubmit = {onCardRemove}
      onClose = {onClose}
    />
  );
}

export default RemoveCardPopup;