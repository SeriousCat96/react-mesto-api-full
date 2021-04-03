import React from 'react';

function Like(props) {
  const { name, avatar } = props;
  
  console.debug("render like");
  
  const tooltipRef = React.useRef();
  const [isToolTipOverflow, setIsToolTipOverflow] = React.useState(false);

  const getTooltipPosition = (tooltip) => {
    const tooltipBounds = tooltip.current.getBoundingClientRect();

    if (tooltipBounds.right > window.outerWidth) {
      setIsToolTipOverflow(true);
    } else {
      setIsToolTipOverflow(false);
    }
  };

  React.useEffect(
    () => {
      getTooltipPosition(tooltipRef);
    },
    [tooltipRef]
  );

  return (
    <article className = "like">
      <img className = "like__photo" src = {avatar} alt = "Аватар пользователя"/>
      <span
        ref = {tooltipRef} 
        className = "like__name-tooltip"
        style = {isToolTipOverflow ? 
          {
            left: '50%',
            right: '-50%'
          } 
          : 
          {}
        }
      >
        {name}
      </span>
    </article>
  );
}

export default Like;