import React from 'react';
import Card from './Card';

function Cards(props) {
  const { items, onRemoveCardPopupOpen, onImagePopupOpen, onCardLike } = props;
  
  return (
    <section className="cards-grid page__section page__section_indent-size_m">
      <ul className="list cards-grid__items">
        {items.map(item => (
        <li key={item._id}>
          <Card 
            item = {item} 
            onRemoveButtonClick = {onRemoveCardPopupOpen}
            onCardClick = {onImagePopupOpen}
            onCardLike = {onCardLike}
          />
        </li>
      ))}
      </ul>
    </section>
  );
}

export default Cards;
