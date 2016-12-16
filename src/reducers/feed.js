import {
  POST_FEED, EDIT_FEED,
  ADD_FRIEND_TO_INCLUDE, REMOVE_FRIEND_FROM_INCLUDE,
  ADD_FRIEND_TO_EXCLUDE, REMOVE_FRIEND_FROM_EXCLUDE
} from '../actions/feed.js';

function feed(state = {
  	content: '',
  	include: [],
  	exclude: []
}, action) {
	const { type, id, content } = action;
	let newList;

	switch (type) {
		case POST_FEED:
			return {
				content: '',
			  	include: [],
			  	exclude: []
			};
			
	    case EDIT_FEED:
	    	return Object.assign({}, state, {
	    		content: content
	    	});

	    case ADD_FRIEND_TO_INCLUDE:
	    	newList = state.include;

	    	if(newList.indexOf(id) === -1)
	    		newList = [...state.include, id];

	    	return Object.assign({}, state, {
	    		include: newList
	    	});

	    case REMOVE_FRIEND_FROM_INCLUDE:
	    	return Object.assign({}, state, {
	    		include: state.include.filter(friendId => friendId !== id)
	    	});

	    case ADD_FRIEND_TO_EXCLUDE:
	    	newList = state.exclude;

	    	if(newList.indexOf(id) === -1)
	    		newList = [...state.exclude, id];

	    	return Object.assign({}, state, {
	    		exclude: newList
	    	});

	    case REMOVE_FRIEND_FROM_EXCLUDE:
	    	return Object.assign({}, state, {
	    		exclude: state.exclude.filter(friendId => friendId !== id)
	    	});

	    default:
	      	return state
  	}
}

export default feed