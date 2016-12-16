import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { moveList, addFriend, removeFriend } from '../../actions/friends.js';
import Cards from '../../components/Friends/Cards.js';

function getPlaceholderIndex(mouseY, list, card) {
  let placeholderIndex;

  const { height, marginBottom } = window.getComputedStyle(card);

  const cardHeight = Number(height.slice(0, height.length - 2));
  const cardMargin = Number(marginBottom.slice(0, marginBottom.length - 2));

  const bottomY = list.getBoundingClientRect().bottom;
  const scrollY = list.scrollHeight - list.scrollTop - (list.getBoundingClientRect().height);

  const toBottom = bottomY - mouseY + scrollY;

  if (toBottom < cardHeight / 2 + cardMargin) {
    placeholderIndex = 0; 
  } else {
    placeholderIndex = Math.floor((toBottom - cardHeight / 2 - cardMargin) / (cardHeight + cardMargin)) + 1;
  }

  return placeholderIndex;
}

function changeOrder(childCards, id, parent, listId, placeholderIndex, addCard, removeCard) {
  const otherCards = childCards.filter((cardId) => (cardId !== id));
  let previousId;

  // only ungrouped card in the list
  if(otherCards.length === 0) {
    previousId = 'last';
  }
  else {
    previousId = otherCards[childCards.length - 2 - placeholderIndex];
  }

  removeCard(id, parent);
  addCard(id, listId, previousId);
}

const spec = {
  drop(props, monitor, component) {
    if(monitor.isOver({ shallow: true })){
      const item = monitor.getItem();

      if(item.type === 'card') {
        const { id, parent } = item;
        const { placeholderIndex } = component.state;
        const { id: listId, canvas: canvasId, friendLists, childCards, addCard, removeCard } = props;
        let previousId;

        if(parent !== -1 && parent !== -2) {
          // change order in same list
          if(listId === parent) {
            changeOrder(childCards, id, parent, listId, placeholderIndex, addCard, removeCard)
            return;
          }   
          else {
            // check whether moving to parent
            let currParent = parent;
            while(currParent !== listId && currParent !== 0) {
              currParent = friendLists[currParent].parent;
            }
            if(currParent === listId) {
              // move to parent
              currParent = parent;
              while(currParent !== listId) {
                // remove card from direct relative
                removeCard(id, currParent);
                currParent = friendLists[currParent].parent;
              }
                // change card order in parent
              changeOrder([...childCards, id], id, listId, listId, placeholderIndex, addCard, removeCard)
              return;
            }

            // check whether moving to children
            currParent = listId;
            while(currParent !== parent && currParent !== 0) {
              currParent = friendLists[currParent].parent;
            }
            if(currParent === parent) {
              // move to children
              currParent = listId;

              if(childCards.length === 0 || childCards.length - 1 - placeholderIndex < 0) {
                previousId = 'first';
              }
              else {
                previousId = childCards[childCards.length - 1 - placeholderIndex];
              }
              
              while(currParent !== parent) {
                // add card to all direct relative
                addCard(id, currParent, previousId);
                currParent = friendLists[currParent].parent;
              }
              return;
            }
          }
        }
        
        // moving to other list  
        if(friendLists[listId].members.indexOf(id) !== -1) {
          // already in list
          return {
            result: 'already in group'
          };
        }
        else if(childCards.length === 0 || childCards.length - 1 - placeholderIndex < 0) {
          // only ungroup card in the list
          previousId = 'first';
        }
        else {
          previousId = childCards[childCards.length - 1 - placeholderIndex];
        }
        
        if(parent !== -1 && parent !== -2){
          let currParent = parent;
          while(currParent !== canvasId) {
            // remove card from direct relative
            removeCard(id, currParent);
            currParent = friendLists[currParent].parent;
          }
        }

        let currentList = listId;
        while(currentList !== canvasId) {
          // add card to all direct relative
          addCard(id, currentList, previousId);
          currentList = friendLists[currentList].parent;
        }
      }
      if(item.type === 'list') {
        const { id, parent } = item;
        const { id: listId, moveList } = props;

        // drop in same group
        if(listId === parent) {
          return {
            result: 'same group'
          };
        }

        moveList(id, parent, listId, 'last');
      }
    }
  },
  hover(props, monitor, component) {
    if(monitor.isOver({ shallow: true })){
      const item = monitor.getItem();

      if(item.type === 'card') {
        let listId;

        if(item.parent === -1)
          listId = 'list-uncategorized';
        else if(item.parent === -2)
          listId = 'list-categorized';
        else
          listId = 'list-' + item.parent;  

        const selector = `#${listId} #card-${item.id}`; 
        const droppableCard = document.querySelector( selector );
        const card = droppableCard.firstElementChild;

        // card in sidebar can only be copied 
        if(item.parent !== -1 && item.parent !== -2)
          droppableCard.style.display = 'none';

        const placeholderIndex = getPlaceholderIndex(
          monitor.getClientOffset().y,
          findDOMNode(component),
          card
        );

        component.setState({ placeholderIndex });
      }
      if(item.type === 'list') {
        const placeholderIndex = -1;

        const selector = `#list-${item.id}`;   
        const list = document.querySelector( selector );
        list.style.display = 'none';

        component.setState({ placeholderIndex });
      }
    }
  },
  canDrop(props, monitor) {
      return true;
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop()
  };
}

class DroppableCards extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    canvas: PropTypes.number.isRequired,
    members: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.arrayOf(PropTypes.number).isRequired,
    friendLists: PropTypes.object.isRequired,
    childCards: PropTypes.arrayOf(PropTypes.string).isRequired,
    moveList: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired,
    removeCard: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      placeholderIndex: -1,
    };
  }

  render() {
    const { id, canvas, children, childCards, connectDropTarget, isOver, canDrop, getBreakpoints } = this.props;
    const { placeholderIndex } = this.state;

    return connectDropTarget(
      <div className="droppable list-cards">
        <Cards 
          canvas={canvas}
          childLists={children.map((listId) => ({id: listId, parent: id}))} 
          childCards={childCards.map((cardId) => ({id: cardId, parent: id}))}
          placeholderIndex={placeholderIndex}
          isOver={isOver} 
          canDrop={canDrop}
          getBreakpoints={getBreakpoints} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { members, children } = ownProps;
  let childCards = [...members];

  children.forEach((childrenId) => {
    if(state.entities.friendLists[childrenId]) {
      state.entities.friendLists[childrenId].members.forEach((memberId) => {
        let i = childCards.indexOf(memberId);
        (i !== -1) &&childCards.splice(i, 1);
      });
    }
  });

  return {
    friendLists: state.entities.friendLists,
    childCards
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    moveList: (id, previousParent, nextParent, previousId) => {
      dispatch(moveList(id, previousParent, nextParent, previousId));
    },
    addCard: (id, parent, index) => {
      dispatch(addFriend(id, parent, index));
    },
    removeCard: (id, parent) => {
      dispatch(removeFriend(id, parent));
    }
  }
}

DroppableCards = DropTarget(['card', 'list'], spec, collect)(DroppableCards);

export default connect(mapStateToProps,mapDispatchToProps)(DroppableCards)