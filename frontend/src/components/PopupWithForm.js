import React from 'react';
import Popup from './Popup';
import Form from './Form';
import { popupFormClass, popupInputClass, popupLabelClass, popupSubmitClass, inactiveSubmitClass } from '../utils/constants';

function PopupWithForm(props) {
  const { 
    id, 
    name, 
    title, 
    isActive,
    isProcessing,
    submitTitle,
    processingTitle,
    onSubmit,
    onClose,
    inputs } = props;
  
  console.debug("Rendering Form Popup");

  return (
    <Popup
      id = {id}
      isActive = {isActive}
      onClose = {onClose}
      viewClass = "form-view"
    >
      <button 
        className = "button popup__close-button" 
        type="button"
        onClick = {onClose}
      />
      <h2 className="form-view__title">{title}</h2>
      <Form
        name = {name}
        isActive = {isActive}
        submitTitle = {isProcessing ? processingTitle : submitTitle}
        inputs = {inputs}
        onSubmit = {onSubmit}
        formClass = {popupFormClass}
        submitClass = {popupSubmitClass}
        inputClass = {popupInputClass}
        labelClass = {popupLabelClass}
        inactiveSubmitClass = {inactiveSubmitClass}
      />
    </Popup>
  );
}

PopupWithForm.defaultProps = {
  submitTitle: 'Сохранить',
  processingTitle: 'Сохранение...',
  inputs: [],
};

function propsAreEqual(props, nextProps) {
  return props.isActive === nextProps.isActive && props.isProcessing === nextProps.isProcessing;
}

export default React.memo(PopupWithForm, propsAreEqual);