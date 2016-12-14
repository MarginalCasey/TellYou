import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { renameList, deleteList } from '../../actions/friends.js';
import FriendList from '../../components/Friends/FriendList.js';

const spec = {
	canDrag(props, monitor) {
		if(props.id === -1 || props.id === -2)
			return false;
		else
			return true;
	},
  	beginDrag(props, monitor, component) {   
        const list = findDOMNode(component).firstElementChild
  		const { height, width } = list.getBoundingClientRect();

  		props.getBreakpoints();

	    const item = { 
	    	type: 'list',
	      	id: props.id,
	      	parent: props.parent,
	      	style: {
	      		height, 
	      		width
	      	}
	    };

	    return item;
	},
  	endDrag(props, monitor, component) {
	    if(monitor.didDrop()){
	    	const { result } = monitor.getDropResult();

	    	if(result === 'same group') {
		        findDOMNode(component).style.display = 'block';
		    }
	     	return;
	    }

	    findDOMNode(component).style.display = 'block';
  	}
};

function collect(connect, monitor) {
  	return {
    	connectDragSource: connect.dragSource(),
    	isDragging: monitor.isDragging()
  	};
}

let DraggableFriendList = ({
	id, canvas, title, members, children, 
	isDragging, connectDragSource, 
	renameList, deleteList, friendLists, 
	getBreakpoints
}) => {
	let listId;

	if(id === -1)
  		listId = 'list-uncategorized';
	else if(id === -2)
  		listId = 'list-categorized';
	else
  		listId = 'list-' + id; 

  	const deleteListFamily = (id) => {
  		friendLists[id].children.forEach((id) => {
  			deleteListFamily(id);
  		})
  		deleteList(id);
  	}

	return connectDragSource(
		<div id={listId} className="draggable">
			<FriendList 
				id={id}
				canvas={canvas}
				title={title}
				members={members}
				children={children}
				renameList={renameList}
				deleteList={deleteListFamily}
				getBreakpoints={getBreakpoints} />
		</div>
	);
}

DraggableFriendList.propTypes = {
	id: PropTypes.number.isRequired,
	canvas: PropTypes.number.isRequired,
	parent: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	members: PropTypes.arrayOf(PropTypes.string).isRequired,
	children: PropTypes.arrayOf(PropTypes.number).isRequired,
	friendLists: PropTypes.object.isRequired,
	renameList: PropTypes.func.isRequired,
	deleteList: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
	const { title, members, children } = state.entities.friendLists[ownProps.id];
 	return {
    	title,
    	members,
    	children,
    	friendLists: state.entities.friendLists,
  	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  	return {
  		renameList: (title) => {
  			dispatch(renameList(ownProps.id, title));
  		},
  		deleteList: (id) => {
			dispatch(deleteList(id));
  		}
  	}
}

DraggableFriendList = connect(mapStateToProps,mapDispatchToProps)(DraggableFriendList);

export default DragSource('list', spec, collect)(DraggableFriendList)