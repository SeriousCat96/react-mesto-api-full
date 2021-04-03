import React from 'react';
import PopupWithForm from '../PopupWithForm';

function EditAvatarPopup(props) {
  const { isActive, isProcessing, onEditAvatar, onClose } = props;
  
  console.debug("render add card popup");
  
  return (
    <PopupWithForm
      id = "edit-avatar"
      name = "avatar"
      title = "Обновить аватар"
      isProcessing = {isProcessing}
      isActive = {isActive}
      inputs = {[
        {
            id: 'avatar-link',
            name: 'avatar',
            type: 'url',
            placeholder: 'Ссылка на картинку',
            required: true,
        }
      ]}
      onSubmit = {onEditAvatar}
      onClose = {onClose}
    />
  );
}

export default EditAvatarPopup;