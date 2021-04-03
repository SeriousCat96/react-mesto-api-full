import React from 'react';

function Popup(props) {
  const { id, children, isActive, viewClass, onClose } = props;

  console.debug("render popup");

  const handlePopupOverlayMouseDown = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <section 
      className = {`popup${isActive ? " popup_active" : ""}`} 
      id = { id }
      onMouseDown = {handlePopupOverlayMouseDown}
    >
      <div className = {`${viewClass} popup__view`}>
        {children}
      </div>
    </section>
  );
}

export default Popup;