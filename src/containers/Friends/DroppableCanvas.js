import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import { createList, moveList, removeFriend } from '../../actions/friends.js';
import Canvas from '../../components/Friends/Canvas.js';

function getPlaceholderIndex(mouseX, canvas, breakpoints) {
  let scrollX = canvas.scrollLeft;

  for(var i = 0, length = breakpoints.length; i < length; i++) {
    if(breakpoints[i] < mouseX + scrollX){
      if(i === length - 1)
        return i + 1;

      continue;
    }
    return i;
  }
}

const spec = {
  drop(props, monitor, component) {
  	if(monitor.isOver({ shallow: true })){
      const item = monitor.getItem();

      if(item.type === 'card') {
        const { id, parent } = item;
        const { id: canvasId, friendLists, removeCard } = props;

        if(parent !== -1 && parent !== -2){
          let currParent = parent;
          while(currParent !== canvasId) {
            // remove card from direct relative
            removeCard(id, currParent);
            currParent = friendLists[currParent].parent;
          }
        }
      }
      if(item.type === 'list') {
        const { id, parent } = item;
        const { placeholderIndex } = component.state;
        const { id: listId, children, moveList } = props;
        let previousId;

        if(placeholderIndex === 0) {
          previousId = 'first';
        }
        else {
          previousId = children[placeholderIndex - 1];
        }
        moveList(id, parent, listId, previousId);

        // Cause canvas won't re-render(?) 
        if(listId === parent){
          return {
            result: 'same group'
          };
        }
      }
    }
  },
  hover(props, monitor, component) {
    if(monitor.isOver({ shallow: true })){
      const item = monitor.getItem();

      if(item.type === 'list'){
        const selectors = `#${'list-'+item.id}`;   
        const list = document.querySelector( selectors );
        list.style.display = 'none';  

        const placeholderIndex = getPlaceholderIndex(
          monitor.getClientOffset().x,
          findDOMNode(component),
          component.state.breakpoints
        );
        const placeholderSize = item.style;

        component.setState({ placeholderIndex });
        component.setState({ placeholderSize });
      }  
    }
  },
  canDrop(props, monitor) {
    const item = monitor.getItem();

    if(item.type === 'list')
      return true;

    if(item.type === 'card') {
      if(item.parent === -1 || item.parent === -2)
        return false;
      else
        return true;
    }
  }
};

function collect(connect, monitor) {
  const item = monitor.getItem();
  let canDrop = true;

  // not showing placeholder while dragging card
  if(item && item.type === 'card')
    canDrop = false;

  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({ shallow: true }),
    canDrop: canDrop
  };
}

class DroppableCanvas extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    children: PropTypes.arrayOf(PropTypes.number).isRequired,
    friendLists: PropTypes.object.isRequired,
    createList: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    removeCard: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      breakpoints: [],
      placeholderIndex: -1,
      placeholderSize: {
        width: 100,
        height: 100
      }
    };

    this.getBreakpoints = this.getBreakpoints.bind(this);
  }

  // TODO: move this to reducer
  getBreakpoints() {
    const selector = '.list-wrapper > div > .list';   
    const lists = document.querySelectorAll( selector );
    const start = lists[0].getBoundingClientRect().left;
    const spacing = lists[1].getBoundingClientRect().left - lists[0].getBoundingClientRect().right;
    const widths = [];
    const breakpoints = [];

    lists.forEach((element) => {
      widths.push(element.getBoundingClientRect().width);
    });

    let prevWidth, currWidth, breakpoint;

    for(var i = 0, length = widths.length; i < length; i++) {
      currWidth = widths[i];

      if(i === 0) {
        breakpoint = start + currWidth / 2;
      }
      else {
        breakpoint = breakpoint + spacing + (prevWidth + currWidth) / 2;
      }
        
      breakpoints.push(breakpoint);
      prevWidth = currWidth;
    }

    this.setState({ breakpoints });
  }

  render() {
    const { id, children, createList, connectDropTarget, isOver, canDrop } = this.props;
    const { placeholderIndex, placeholderSize } = this.state;

    return connectDropTarget(
      <div className="droppable">
        <Canvas 
          parent={id}
          children={children}
          placeholderIndex={placeholderIndex}
          placeholderSize={placeholderSize}
          isOver={isOver}
          canDrop={canDrop}
          createList={createList}
          getBreakpoints={this.getBreakpoints} />
      </div>
    ) 
  }
}

const mapStateToProps = (state, ownProps) => {
  let children = [];
  if(state.entities.friendLists[ownProps.id])
    children = state.entities.friendLists[ownProps.id].children;

  return {
    children,
    friendLists: state.entities.friendLists,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createList: (title) => {
      dispatch(createList(title, ownProps.id));
    },
    moveList: (id, previousParent, nextParent, previousId) => {
      dispatch(moveList(id, previousParent, nextParent, previousId));
    },
    removeCard: (id, parent) => {
      dispatch(removeFriend(id, parent));
    }
  }
}

DroppableCanvas = DropTarget(['card','list'], spec, collect)(DroppableCanvas);

export default connect(mapStateToProps,mapDispatchToProps)(DroppableCanvas)