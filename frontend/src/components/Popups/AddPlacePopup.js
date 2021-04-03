import React from 'react';
import PopupWithForm from '../PopupWithForm';

function AddPlacePopup(props) {
  const { isActive, isProcessing, onAddPlace, onClose } = props;
  
  const inputs = React.useMemo(() => [
    {
      id: 'card-name',
      name: 'name',
      type: 'text',
      placeholder: 'Название',
      minLength: 2,
      maxLength: 30,
      required: true,
    },
    {
        id: 'card-link',
        name: 'link',
        type: 'url',
        placeholder: 'Ссылка на картинку',
        required: true,
    }
  ], []);

  console.debug("render add card popup");
  
  return (
    <PopupWithForm
      id = "add-card"
      name = "card"
      title = "Новое место"
      isActive = {isActive}
      isProcessing = {isProcessing}
      inputs = {inputs}
      onSubmit = {onAddPlace}
      onClose = {onClose}
    />
  );
}

export default AddPlacePopup;