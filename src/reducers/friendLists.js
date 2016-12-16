import {
  	FETCH_LISTS_SUCCESS
} from '../actions/fetch.js';

import {
	CREATE_LIST, MOVE_LIST, RENAME_LIST, DELETE_LIST,
  	ADD_FRIEND, REMOVE_FRIEND
} from '../actions/friends.js';

function friendLists(state = {}, action) {
	const { type, listId, friendId, previousId, previousParent, nextParent, parent, title } = action;
	let newList, index, parentId;

	switch (type) {
	    case FETCH_LISTS_SUCCESS:
	      	return action.data;

	    case CREATE_LIST:
	    	return Object.assign({}, state, {
	    		[parent]: Object.assign({}, state[parent],{ 
		        	children: [...state[parent].children, state.nextId]
		        }),
	        	[state.nextId]: {
	        		id: state.nextId++,
	        		title: title,
	        		members: [],
	        		parent: parent,
	        		children: []
	        	}
	      	}); 

	    case MOVE_LIST:
	    	if(previousParent === nextParent) {
	    		newList = state[nextParent].children.filter((id) => (id !== listId));

	    		index = newList.indexOf(previousId) + 1;
	      		newList.splice(index, 0, listId);

	    		return Object.assign({}, state, {
		        	[nextParent]: Object.assign({}, state[nextParent],{ 
		        		children: newList
		        	}),
		      	}); 
	    	}

	    	newList = [...state[nextParent].children];

	    	if(previousId === 'first'){
	      		newList.unshift(listId);
	      	}
	      	else if(previousId === 'last'){
	      		newList.push(listId);
	      	}
	      	else{
	      		index = newList.indexOf(previousId) + 1;
	      		newList.splice(index, 0, listId);
	      	}

	      	return Object.assign({}, state, {
	      		[listId]: Object.assign({}, state[listId], {
	      			parent: nextParent
	      		}),
	        	[previousParent]: Object.assign({}, state[previousParent],{ 
	        		children: state[previousParent].children.filter((list) => (list !== listId)) 
	        	}),
	        	[nextParent]: Object.assign({}, state[nextParent],{ 
	        		children: newList
	        	})
	      	}); 

	    case RENAME_LIST:
	    	return Object.assign({}, state, {
	      		[listId]: Object.assign({}, state[listId], {
	      			title: title
	      		})
	      	}); 

		case DELETE_LIST:
			parentId = state[listId].parent;
			newList = Object.assign({}, state);
			delete newList[listId];

			newList[parentId] = Object.assign({}, state[parentId],{ 
	        	children: state[parentId].children.filter((list) => (list !== listId)) 
	        });

			return Object.assign({}, newList); 

	    case ADD_FRIEND:
	      	newList = {
	        	members: [...state[listId].members]
	      	};

	      	if(previousId === 'first'){
	      		index = 0;
	      	}
	      	else{
	      		index = newList.members.indexOf(previousId) + 1;
	      	}
	      	
	      	newList.members.splice(index, 0, friendId);
	      	newList = Object.assign({}, state[listId], newList); 

	      	return Object.assign({}, state, {
	        	[listId]: newList
	      	}); 

	    case REMOVE_FRIEND:
	      	return Object.assign({}, state, {
		        [listId]: Object.assign({}, state[listId], { 
		        	members: state[listId].members.filter((friend) => (friend !== friendId)) 
		        })
		    }); 

	    default:
	      	return state
  	}
}

export default friendLists