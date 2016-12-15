import { combineReducers } from 'redux';
import feed from './feed.js';
import friendLists from './friendLists.js';

import {
  DEMO_START, DEMO_END
} from '../actions/demo.js';

import {
  LOGIN
} from '../actions/user.js';

import {
  FETCH_LISTS_START, FETCH_LISTS_SUCCESS, FETCH_LISTS_FAILURE,
  FETCH_FRIENDS_START, FETCH_FRIENDS_SUCCESS, FETCH_FRIENDS_FAILURE
} from '../actions/fetch.js';

import {
  CREATE_LIST, MOVE_LIST, RENAME_LIST, DELETE_LIST,
  ADD_FRIEND, REMOVE_FRIEND
} from '../actions/friends.js';

function demo(state = false, action) {
  switch (action.type) {
    case DEMO_START:
      return true;

    case DEMO_END:
      return false;

    default:
      return state;
  }
}

function user(state = {
  uid: '',
  email: '',
  name: '',
  photo: '',
  accessToken: ''
}, action) {
  const { type, uid, email, name, photo, accessToken } = action;

  switch (type) {
    case LOGIN:
      return Object.assign({}, state, {
        uid,
        email,
        name,
        photo,
        accessToken
      });

    default:
      return state;
  }
}

function friendsFromFB(state = {
  isFetching: false,
  error: null,
  items: []
}, action) {
  switch (action.type) {
    case FETCH_FRIENDS_START:
      return Object.assign({}, state, {
        isFetching: true
      });

    case FETCH_FRIENDS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.data.map(friend => friend.id)
      });

    case FETCH_FRIENDS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    default:
      return state;
  }
}

function friendListsFromDB(state = {
  isFetching: false,
  error: null
}, action) {
  switch (action.type) {
    case FETCH_LISTS_START:
      return Object.assign({}, state, {
        isFetching: true
      });

    case FETCH_LISTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false
      });

    case FETCH_LISTS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });

    default:
      return state;
  }
}

function entities(state = {
  friends: {},
  friendLists: {
    nextId: 1,
    0: {
      id: 0,
      title: "所有朋友",
      members: [],
      parent: -1,
      children: []
    },
  }
}, action) {
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      let friends = {};
      action.data.forEach(friend => {
        friends[friend.id] = {
          id: friend.id,
          name: friend.name,
          photo: friend.picture.data.url
        }
      });
      return Object.assign({}, state, {
        friends: friends
      });

    case FETCH_LISTS_SUCCESS:
    case CREATE_LIST:
    case MOVE_LIST:
    case RENAME_LIST:
    case DELETE_LIST:
    case ADD_FRIEND:
    case REMOVE_FRIEND:
      return Object.assign({}, state, {
        friendLists: friendLists(state.friendLists, action)
      });

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  demo,
  user,
  feed,
  friendsFromFB,
  friendListsFromDB,
  entities
})

export default rootReducer