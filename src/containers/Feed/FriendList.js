import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { addToInclude, removeFromInclude, addToExclude, removeFromExclude } from '../../actions/feed.js';
import Cards from './Cards.js';

class FriendList extends Component {
	static propTypes = {
		type: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		members: PropTypes.arrayOf(PropTypes.string).isRequired,
		children: PropTypes.arrayOf(PropTypes.number).isRequired,
		friendLists: PropTypes.object.isRequired,
		isChecked: PropTypes.bool.isRequired,
		addToList: PropTypes.func.isRequired, 
    	removeFromList: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			isOpen: true,
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleClick() {
		this.setState(prevState => ({
	      isOpen: !prevState.isOpen
	    }));
	}

	handleChange() {
		const { id, isChecked, addToList, removeFromList} = this.props;
		if(isChecked === true){
			removeFromList(id, 'list');
		}
		if(isChecked === false){
			addToList(id, 'list');
		}
	}

	render() {
		const { type, id, title, members, children, friendLists, isChecked, addToList, removeFromList } = this.props;
		const { isOpen } = this.state; 
		let listId;
		let childCards = [...members];

		if(id === -1)
			listId = 'list-uncategorized';
		if(id === -2)
			listId = 'list-categorized';

		children.forEach((childrenId) => {
	    	friendLists[childrenId].members.forEach((memberId) => {
	      		let i = childCards.indexOf(memberId);
	      		(i !== -1) &&childCards.splice(i, 1);
	    	});
	  	});

      	return (
			<div id={listId} className="list">
				<div className="list-header">
					<div>
						<input type="checkbox" checked={isChecked} onChange={this.handleChange} />
					</div>
					
					<div className="title">{title}</div>	

				{
					(id !== -1 && id !== -2) && 
					<div className="button-groups">
						<button onClick={this.handleClick}><i className="fa fa-caret-down" aria-hidden="true"></i></button>		
					</div>
				}	
				</div>

				{
					// Sidebar
					(id === -1 ||  id === -2) && 
					<div className="list-cards">
						<Cards 
							type={type}
				         	childLists={[]} 
				          	childCards={members} 
				          	addToList={addToList}
				          	removeFromList={removeFromList} />
			        </div>
				}

				{ 
					// Canvas
					(id !== -1 && id !== -2) && isOpen && 
					<div className="list-cards">
						<Cards 
							type={type}
				         	childLists={children} 
				          	childCards={childCards} 
				          	addToList={addToList}
				          	removeFromList={removeFromList} />
			        </div>
				}

				
				<div className="list-footer">
				{
					(id !== -1 && id !== -2) && !(members.length === 0 && children.length === 0) && isOpen &&
					<Link to={{ pathname: '/feed/'+type, query: { listId: id } }} className="list-header-extra" activeClassName="active">
						詳細檢視	
					</Link>
				}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const friendLists = state.entities.friendLists;
	let isChecked = true;

	const { type: listType, id, members } = ownProps;

	if(id !== -1 && id !== -2) {
		// empty list
		if(friendLists[id].members === undefined) {
			isChecked = false;
		}
		else {
			for(let i = 0, length = friendLists[id].members.length; i < length; i++) {
				if(state.feed[listType].indexOf(friendLists[id].members[i]) === -1) {
					isChecked = false;
					break;
				}
			}
		}
	}

	if(id === -1 || id === -2) {
		// empty list
		if(members.length === 0) {
			isChecked = false;
		}
		for(let i = 0, length = members.length; i < length; i++) {
			if(state.feed[listType].indexOf(members[i]) === -1) {
				isChecked = false;
				break;
			}
		}
	}

  	return {
    	friendLists,
    	isChecked
  	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  	const { type: listType, members } = ownProps;
  	
  	return {
	    addToList: (id, type) => {
	      	if(listType === 'include') {
	      		if(type === 'list' && (id === -1 || id === -2)) {
	      			members.forEach(friendId => {
	      				dispatch(addToInclude(friendId, 'friend'));
	      			})
	      		}
	      		else
	        		dispatch(addToInclude(id, type));
	      	}

	      	if(listType === 'exclude') {
	      		if(type === 'list' && (id === -1 || id === -2)) {
	      			members.forEach(friendId => {
	      				dispatch(addToExclude(friendId, 'friend'));
	      			})
	      		}
	      		else
	        		dispatch(addToExclude(id, type));
	      	}
	    },
	    removeFromList: (id, type) => {
	      	if(listType === 'include') {
	      		if(type === 'list' && (id === -1 || id === -2)) {
	      			members.forEach(friendId => {
	      				dispatch(removeFromInclude(friendId, 'friend'));
	      			})
	      		}
	      		else
	        		dispatch(removeFromInclude(id, type));
	      	}

	      	if(listType === 'exclude') {
	      		if(type === 'list' && (id === -1 || id === -2)) {
	      			members.forEach(friendId => {
	      				dispatch(removeFromExclude(friendId, 'friend'));
	      			})
	      		}
	      		else
	        		dispatch(removeFromExclude(id, type));
	      	}
	    },
	}
}

FriendList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendList);

export default FriendList