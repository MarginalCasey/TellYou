import firebase from 'firebase';
import swal from 'sweetalert';

export const FETCH_FRIENDS_START = 'FETCH_FRIENDS_START';
export const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS';
export const FETCH_FRIENDS_FAILURE = 'FETCH_FRIENDS_FAILURE';

export const FETCH_LISTS_START = 'FETCH_LISTS_START';
export const FETCH_LISTS_SUCCESS = 'FETCH_LISTS_SUCCESS';
export const FETCH_LISTS_FAILURE = 'FETCH_LISTS_FAILURE';

function requestLists() {
  	return { 
    	type: FETCH_LISTS_START 
  	};
}

function fetchListsSuccess(item) {
  	return { 
    	type: FETCH_LISTS_SUCCESS,
		data: item
  	};
}

function fetchListsFailure(error) {
  	return { 
    	type: FETCH_LISTS_FAILURE,
	    error: error
  	};
}

function receiveLists(json) {
	return (dispatch) => {
		if(true){
			const friendListsFromDB = json;
			const missing = [];

			dispatch(fetchFriends()).then((data) => {
			    swal({
				  	title: "資料更新完畢",
				  	text: "",
				  	type: "success",
				  	showConfirmButton: false
				});

				setTimeout(function(){
				    swal.close();
				}, 1000);

				const friendsFromFaceBook = data.map(friend => friend.id);

				// get missing friends
				friendListsFromDB[0].members.forEach((id) => {
					if(id === 'nextId') return;

					if(friendsFromFaceBook.indexOf(id) === -1)
						missing.push(id);
				});

				// remove missing friends from list
				missing.forEach((id) => {
					Object.getOwnPropertyNames(friendListsFromDB).forEach((i) => {
						if(i === 'nextId') return;

						let index = friendListsFromDB[i].members.indexOf(id);
						if(index !== -1)
							friendListsFromDB[i].members.splice(index, 1);
					})
				});

				// add new friends to friendLists[0]
				friendsFromFaceBook.forEach((id) => {
					if(friendListsFromDB[0].members.indexOf(id) === -1)
						friendListsFromDB[0].members.push(id);
				});

				dispatch(fetchListsSuccess(friendListsFromDB));
			});
				
		}
		else {
			dispatch(fetchListsFailure(json.error));
		}
	};	
}

export function fetchLists() {
  	return (dispatch, getState) => {
  		const { user, entities } = getState();

	    swal({
		  	title: "載入使用者資料...",
		  	text: "",
		  	imageUrl: "/loading.gif",
		  	showConfirmButton: false
		});
	

    	dispatch(requestLists());
	    firebase.database().ref('users/' + user.uid +'/friendLists').once('value').then(function(snapshot) {
	    	// for new user
		  	let friendLists = entities.friendLists;

		  	if(snapshot.val() !== null)
		  		friendLists = snapshot.val();

		  	for(let index in friendLists) {
		  		if(index === 'nextId')
		  			continue;

		  		if(friendLists[index].members === undefined)
		  			friendLists[index].members = [];

		  		if(friendLists[index].children === undefined)
		  			friendLists[index].children = [];
		  	}

		  	dispatch(receiveLists(friendLists));
		});
  	};
}


function requestFriends() {
  	return { 
    	type: FETCH_FRIENDS_START 
  	};
}

function fetchFriendsSuccess(item) {
  	return { 
    	type: FETCH_FRIENDS_SUCCESS,
		data: item
  	};
}

function fetchFriendsFailure(error) {
  	return { 
    	type: FETCH_FRIENDS_FAILURE,
	    error: error
  	};
}

function receiveFriends(response) {
	return (dispatch) => {
		if(!response.error){
			dispatch(fetchFriendsSuccess(response.data));
		}
		else {
			dispatch(fetchFriendsFailure(response.error));
		}
	};	
}

function fetchFriends() {
  	return (dispatch, getState) => {
    	dispatch(requestFriends());	

	    swal({
		  	title: "載入朋友清單...",
		  	text: "",
		  	imageUrl: "/loading.gif",
		  	showConfirmButton: false
		});

  		return new Promise( 
  			(resolve, reject) => {
	  			window.FB.api(
				  	'/me/friends',
				  	'GET',
				  	{"fields":"id,name,picture{url}","limit":"5000"},
				  	function(response) {
				  		if(response.error) {
				  			swal({
						        title: "無法從Facebook取得朋友清單",
						        text: response.error.error_user_msg || response.error.message,
						        type: "error",
						        confirmButtonColor: "#3b5998",
						        closeOnConfirm: false
						    },
						    function(){
						        dispatch(receiveFriends(response));
				            	resolve([]);
						    });  	
				        }
				        else {
				            dispatch(receiveFriends(response));
		    				resolve(response.data);
				        }
				  	}
				);
  			}
		);
  	};
}
