import React, { Component, PropTypes } from 'react';
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

class DraggableFriendList extends Component {
	static propTypes = {
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

	constructor(props) {
    	super(props);

	    this.deleteListFamily = this.deleteListFamily.bind(this);
	}

	deleteListFamily(id) {
		const { friendLists, deleteList } = this.props;

  		friendLists[id].children.forEach((id) => {
  			this.deleteListFamily(id);
  		})
  		deleteList(id);
  	}

  	render() {
  		const {
			id, canvas, title, members, children, 
			connectDragSource, 
			renameList,
			getBreakpoints
		} = this.props;

		let listId;

		if(id === -1)
	  		listId = 'list-uncategorized';
		else if(id === -2)
	  		listId = 'list-categorized';
		else
	  		listId = 'list-' + id; 

		return connectDragSource(
			<div id={listId} className="draggable">
				<FriendList 
					id={id}
					canvas={canvas}
					title={title}
					members={members}
					children={children}
					renameList={renameList}
					deleteList={this.deleteListFamily}
					getBreakpoints={getBreakpoints} />
			</div>
		);
  	}
}

const mapStateToProps = (state, ownProps) => {
	if(state.entities.friendLists[ownProps.id]) {
		const { title, members, children } = state.entities.friendLists[ownProps.id];
	 	return {
	    	title,
	    	members,
	    	children,
	    	friendLists: state.entities.friendLists
	  	};
	}
	else {
		return {
			title: '',
			members: [],
			children: [],
			friendLists: state.entities.friendLists
		};
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
  	};
}

DraggableFriendList = connect(mapStateToProps,mapDispatchToProps)(DraggableFriendList);

export default DragSource('list', spec, collect)(DraggableFriendList)