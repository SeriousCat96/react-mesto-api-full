import React from 'react';
import LikePopup from './Popups/LikePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const { item, onRemoveButtonClick, onCardClick, onCardLike } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const isOwned = item.owner._id === currentUser._id;
  
  item['isUserLiked'] = item.likes.some((like) => like._id === currentUser._id);

  const handleLikeAnimationEnd = (evt) => evt.target.classList.remove('scaling');
  const [isLikePopupActive, setIsLikePopupActive] = React.useState(false);

  return (
    <article className = "card">
      {
        isOwned && 
        <button 
          className = "button card__remove-button" 
          type = "button"
          onClick = {onRemoveButtonClick.bind(undefined, item)}
        />
      }
      <img 
        className = "card__image" 
        src = {item.link} 
        alt = {`Изображение карточки ${item.name}`}
        onClick = {onCardClick.bind(undefined, item)} 
      />
      <h2 className = "card__caption text-ellipsis">{item.name}</h2>
      <div 
        className = "card__like"
        onMouseEnter = {() => setIsLikePopupActive(true)}
        onMouseLeave = {() => setIsLikePopupActive(false)}
      >
        <button 
          className = {`button scaling card__like-button${item.isUserLiked ? ' card__like-button_checked' : ''}`}
          type = "button"
          onClick = {onCardLike.bind(undefined, item)}
          onAnimationEnd = {handleLikeAnimationEnd}
        />
        <span className = "card__like-count">{item.likes.length}</span>
        {isLikePopupActive && item.likes.length > 0 && <LikePopup card = {item} />}
      </div>
    </article>
  );
}

export default Card;
