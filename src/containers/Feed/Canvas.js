import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FriendList from './FriendList.js';

class Canvas extends Component {
	static propTypes = {
		id: PropTypes.number.isRequired,
		type: PropTypes.string.isRequired,
	};

	render() {
		const { type, children, friendLists } = this.props;

		let lists = [];

		for(let i = 0, length = children.length; i < length; i++) {
			let listId = children[i];
				
			lists.push(
				<div className="list-wrapper" key={listId}> 
					<div>
						<FriendList 
							type={type}
							id={listId}
							title={friendLists[listId].title}
							members={friendLists[listId].members}
							children={friendLists[listId].children} />
					</div>  
				</div>
			);
		}

		return(
			<div className="canvas">
				{lists}
			</div>
		);	
	}
}

const mapStateToProps = (state, ownProps) => {
	let children = [];
	if(state.entities.friendLists[ownProps.id])
		children = state.entities.friendLists[ownProps.id].children;

  	return {
    	children,
    	friendLists: state.entities.friendLists
  	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  	return {

  	}
}

Canvas = connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas);

export default Canvas
