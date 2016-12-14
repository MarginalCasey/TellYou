import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import Card from '../../components/Friends/Card.js'

const spec = {
  beginDrag(props) {
    const item = { 
      type: 'card',
      id: props.id ,
      parent: props.parent      
    };

    return item;
  },
  endDrag(props, monitor, component) {
    if(monitor.didDrop()) {
      const { result } = monitor.getDropResult();

      if(result === 'already in group') {
        findDOMNode(component).style.display = 'block';
      }
      return;
    }

    const { parent } = props;
    if(parent !== -1 && parent !== -2) {
      findDOMNode(component).style.display = 'block';
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

let DraggableCard = ({id, parent, person, isDragging, connectDragSource}) => (
	connectDragSource(
    <div id={'card-'+id} className="draggable">
      <Card 
        name={person.name} 
        photo={person.photo} />
    </div>
	)
);

DraggableCard.propTypes = {
  id: PropTypes.string.isRequired,
  parent: PropTypes.number.isRequired,
  person: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    person: state.entities.friends[ownProps.id]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}

DraggableCard = connect(mapStateToProps,mapDispatchToProps)(DraggableCard);

export default DragSource('card', spec, collect)(DraggableCard)