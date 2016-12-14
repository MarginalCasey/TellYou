export const CREATE_LIST = 'CREATE_LIST';
export const MOVE_LIST = 'MOVE_LIST';
export const RENAME_LIST = 'RENAME_LIST';
export const DELETE_LIST = 'DELETE_LIST';

export const ADD_FRIEND = 'ADD_FRIEND';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';

const firebase = require("firebase/app");
require("firebase/database");

function postList() {
  return (dispatch, getState) => {
    const { user, entities } = getState();
    firebase.database().ref('users/' + user.uid +'/friendLists').set(entities.friendLists);
  }
}
  

export function createList(title, parent) {
  return (dispatch) => {
    dispatch({ 
      type: CREATE_LIST,
      title,
      parent
    });
    dispatch(postList());
  }
}

export function moveList(id, previousParent, nextParent, previousId) {
  return (dispatch) => {
    dispatch({ 
      type: MOVE_LIST,
      listId: id,
      previousParent,
      nextParent,
      previousId
    });
    dispatch(postList());
  }
}

export function renameList(id, title) {
  return (dispatch) => {
    dispatch({ 
      type: RENAME_LIST,
      listId: id,
      title: title
    });
    dispatch(postList());
  }
}

export function deleteList(id) {
  return (dispatch) => {
    dispatch({ 
      type: DELETE_LIST,
      listId: id
    });
    dispatch(postList());
  }
}

export function addFriend(id, parent, previousId) {
  return (dispatch) => {
    dispatch({ 
      type: ADD_FRIEND,
      listId: parent,
      friendId: id,
      previousId
    });
    dispatch(postList());
  }
}

export function removeFriend(id, parent) {
  return (dispatch) => {
    dispatch({ 
      type: REMOVE_FRIEND,
      listId: parent,
      friendId: id
    });
    dispatch(postList());
  }
}