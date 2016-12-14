import { fetchLists } from './fetch.js';

export const LOGIN = 'LOGIN';

export function loginAndFetch(uid, email, name, photo, accessToken) {
	return (dispatch) => {
  	dispatch(login(uid, email, name, photo, accessToken));
    dispatch(fetchLists());
  };
}

function login(uid, email, name, photo, accessToken) {	
  	return { 
    	type: LOGIN,
    	uid,
      email,
  		name,
  		photo,
   		accessToken
  	};
}

