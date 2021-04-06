import React from 'react';

function MenuToggle() {
  return (
    <>
      <input id = "btn" className = "toggle" type = "checkbox" />
      <label className= "toggle__button" htmlFor = "btn">
        <span className = "toggle__icon" />
      </label>
    </>
  );
}

export default MenuToggle;