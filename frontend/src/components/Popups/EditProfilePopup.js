import React from 'react';
import PopupWithForm from '../PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const { isActive, isProcessing, onEditProfile, onClose } = props;
  const { name, about } = React.useContext(CurrentUserContext);
  const inputs = React.useMemo(() => [
    {
      id: 'name',
      name: 'name',
      type: 'text',
      placeholder: 'Имя',
      minLength: 2,
      maxLength: 40,
      value: name,
      required: true,
    },
    {
      id: 'about',
      name: 'about',
      type: 'text',
      placeholder: 'О себе',
      minLength: 2,
      maxLength: 200,
      value: about,
      required: true,
    }
  ], [about, name]);

  console.debug("render edit profile popup");
  
  return (
    <PopupWithForm
      id = "edit-profile"
      name = "profile"
      title = "Редактировать профиль"
      isProcessing = {isProcessing}
      isActive = {isActive}
      inputs = {inputs}
      onSubmit = {onEditProfile}
      onClose = {onClose}
    />
  );
}

export default EditProfilePopup;