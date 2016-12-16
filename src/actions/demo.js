import { user, friendLists, friends } from '../demoState.js';

import { login } from './user.js';
import { fetchFriendsSuccess, receiveLists } from './fetch.js';

export const DEMO_START = 'DEMO_START';
export const DEMO_END = 'DEMO_END';

export function demoStart() {	
  return (dispatch) => {
    dispatch({
      type: DEMO_START
    });

    const { uid, email, name, photo, accessToken } = user;
    dispatch(login(uid, email, name, photo, accessToken));
    dispatch(fetchFriendsSuccess(friends.data));
    dispatch(receiveLists(friendLists));
  };
}

export function demoEnd() { 
  return {
    type: DEMO_END
  }
}

