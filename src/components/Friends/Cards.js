import React, { PropTypes } from 'react';
import DraggableFriendList from '../../containers/Friends/DraggableFriendList.js';
import DraggableCard from '../../containers/Friends/DraggableCard.js'

const Cards = ({canvas, childLists, childCards, placeholderIndex, isOver, canDrop, getBreakpoints}) => {
  let cardList = [];

  // show hint when list is empty
  if(childLists.length === 0 && childCards.length === 0){
    cardList.push(
      <div key="hint" className="hint">拖曳以新增成員</div>
    );
  }

  // insert childlists
  childLists.forEach((list) => {
    cardList.push(
      <DraggableFriendList 
        canvas={canvas}
        key={'list-'+list.id}
        id={list.id} 
        parent={list.parent}
        getBreakpoints={getBreakpoints} />
    );
  });
  
  // insert new list to bottom of childlists
  if(isOver && canDrop && placeholderIndex === -1)
    cardList.push(<div key="placeholder" className="list-card placeholder" />);

  // insert childcards
  if(isOver && canDrop && childCards.length <= placeholderIndex && placeholderIndex-childCards.length <= 1)
    cardList.push(<div key="placeholder" className="list-card placeholder" />);

  for(let i = 0, length = childCards.length, reverseIndex; i < length; i++) {
    let { id, parent } = childCards[i];
    reverseIndex = length - i - 1;

    cardList.push(
      <DraggableCard 
        key={'card'+id}           
        id={id}
        parent={parent} />
    );

    if(isOver && canDrop && reverseIndex === placeholderIndex)
      cardList.push(<div key="placeholder" className="list-card placeholder" />);
  }

  return (
    <div>
      {cardList}
    </div>
  );
}

Cards.propTypes = {
  canvas: PropTypes.number,
  childLists: PropTypes.arrayOf(PropTypes.object).isRequired,
  childCards: PropTypes.arrayOf(PropTypes.object).isRequired,
  placeholderIndex: PropTypes.number.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired
}

export default Cards