import React from 'react';
import Like from '../Like';

function LikePopup(props) {
  const { card } = props;
  
  console.debug("render like popup");
  
  const popupRef = React.useRef();
  const [isTop, setIsTop] = React.useState(false);

  const getPosition = (popup) => {
    const popupBounds = popup.current.getBoundingClientRect();

    if (popupBounds.bottom > window.innerHeight) {
      setIsTop(true);
    } else {
      setIsTop(false);
    }
  };

  React.useEffect(
    () => {
      getPosition(popupRef);
    },
    [popupRef]
  );

  return (
    <div 
      className = {`likes-view popup_active${isTop ? " likes-view_pos_top" : ""}`} 
      ref = {popupRef}
    >
      <h2 className = "likes-view__title">Понравилось:</h2>
      <ul className = "list likes-view__items">
        {card.likes.map((like) => (
          <li key = {like._id} >
            <Like 
              name = {like.name} 
              avatar = {like.avatar} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LikePopup;