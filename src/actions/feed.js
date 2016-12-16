import swal from 'sweetalert';

export const EDIT_FEED = 'EDIT_FEED';
export const POST_FEED = 'POST_FEED';

export const ADD_FRIEND_TO_INCLUDE = 'ADD_FRIEND_TO_INCLUDE';
export const REMOVE_FRIEND_FROM_INCLUDE = 'REMOVE_FRIEND_FROM_INCLUDE';

export const ADD_FRIEND_TO_EXCLUDE = 'ADD_FRIEND_TO_EXCLUDE';
export const REMOVE_FRIEND_FROM_EXCLUDE = 'REMOVE_FRIEND_FROM_EXCLUDE';

export function editFeed(content) {
  return { 
    type: EDIT_FEED,
    content: content
  };
}

export function postFeed() {
  return (dispatch, getState) => {
    const { content, include, exclude } = getState().feed;
    const { demo } = getState();

    if(demo) {
      postResult(dispatch, {});
    }
    else {
      let finalList = [...include], index;

      for(let i = 0, length = include.length; i < length; i++) {
        if(exclude.indexOf(include[i]) !== -1){
          index = finalList.indexOf(include[i]);
          finalList.splice(index, 1);
        }
      }

      if(finalList.length === 0) {
        window.FB.api(
          '/me/feed',
          'POST',
          {
            'message': content,
            'privacy': '{value: "SELF"}'
          },
          postResult.bind(null, dispatch)
        );  
      }
      else {
        window.FB.api(
          '/me/feed',
          'POST',
          {
            'message': content,
            'privacy': '{value: "CUSTOM", allow:"' + finalList.toString() +'"}'
          },
          postResult.bind(null, dispatch)
        );  
      }
    }
  };
}

export function addToInclude(id, type) { 
  return (dispatch, getState) => {
    if(type === 'friend'){
      dispatch({ 
        type: ADD_FRIEND_TO_INCLUDE,
        id: id
      });
    }
    if(type === 'list'){
      const { entities } = getState();
      entities.friendLists[id].members.forEach(friendId => {
        dispatch({ 
          type: ADD_FRIEND_TO_INCLUDE,
          id: friendId
        });
      })
    }
  }
}

export function removeFromInclude(id, type) { 
  return (dispatch, getState) => {
    if(type === 'friend'){
      dispatch({ 
        type: REMOVE_FRIEND_FROM_INCLUDE,
        id: id
      });
    }
    if(type === 'list'){
      const { entities } = getState();
      entities.friendLists[id].members.forEach(friendId => {
        dispatch({ 
          type: REMOVE_FRIEND_FROM_INCLUDE,
          id: friendId
        });
      })
    }
  }
}

export function addToExclude(id, type) { 
  return (dispatch, getState) => {
    if(type === 'friend'){
      dispatch({ 
        type: ADD_FRIEND_TO_EXCLUDE,
        id: id
      });
    }
    if(type === 'list'){
      const { entities } = getState();
      entities.friendLists[id].members.forEach(friendId => {
        dispatch({ 
          type: ADD_FRIEND_TO_EXCLUDE,
          id: friendId
        });
      })
    }
  }
}

export function removeFromExclude(id, type) { 
  return (dispatch, getState) => {
    if(type === 'friend'){
      dispatch({ 
        type: REMOVE_FRIEND_FROM_EXCLUDE,
        id: id
      });
    }
    if(type === 'list'){
      const { entities } = getState();
      entities.friendLists[id].members.forEach(friendId => {
        dispatch({ 
          type: REMOVE_FRIEND_FROM_EXCLUDE,
          id: friendId
        });
      })
    }
  }
}

function postResult(dispatch, response) {
  if(response.error) {
    if(response.error.code === 200) {
      swal({
        title: "尚未授權",
        text: "TellYou 吐露友想替你在 Facebook 發表貼文",
        type: "error",
        showCancelButton: true,
        confirmButtonColor: "#3b5998",
        cancelButtonColor: "#E2E4E6",
        confirmButtonText: "確定",
        cancelButtonText: "稍後再說",
      },
      function(isConfirm){
        if(isConfirm) {
          window.FB.login(function(response) {

          }, {scope: 'publish_actions'});
        } 
      });
    }
    else{
      swal({
        title: "發佈失敗",
        text: response.error.error_user_msg || response.error.message,
        type: "error",
        confirmButtonColor: "#3b5998",
        confirmButtonText: "確定"
      });
    }
  }
  else {
    dispatch({
      type: POST_FEED
    });
    swal({
      title: "發佈成功",
      text: "",
      type: "success",
      confirmButtonColor: "#3b5998",
      confirmButtonText: "確定"
    });
  }
}