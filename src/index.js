import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import firebase from 'firebase';
import swal from 'sweetalert';

import rootReducer from './reducers/index.js';
import App from './components/App.js';
import Landing from './components/Landing.js';
import Policy from './components/Policy.js';
import Friends from './components/Friends/Friends.js';
import Feed from './components/Feed/Feed.js';
import NewFeed from './containers/Feed/NewFeed.js';
import Setting from './components/Feed/Setting.js';

import { loginAndFetch } from './actions/user.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	{},
	composeEnhancers(
  	applyMiddleware(
      thunkMiddleware
    )
  )
);

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Landing} />
      <Route path="/policy" component={Policy} />
    	<Route component={App}>
    		<Route path="/friends" component={Friends} id={0} />
    		<Route path="/feed" component={Feed} id={0}>
          <IndexRoute component={NewFeed}/>
          <Route path="/feed/include" component={Setting} id={0} type='include' />
          <Route path="/feed/exclude" component={Setting} id={0} type='exclude' />
        </Route>
    	</Route>
  	</Router>
	</Provider>,
	document.getElementById('root')
);

// Initialize Firebase
const config = {
  apiKey: "AIzaSyB15MbPN9SAQMLftt-xyRyjPENsc1ugBJo",
  authDomain: "tellyou-3dc17.firebaseapp.com",
  databaseURL: "https://tellyou-3dc17.firebaseio.com",
  storageBucket: "tellyou-3dc17.appspot.com",
  messagingSenderId: "51802212613"
};
firebase.initializeApp(config);

// Initialize FB
window.fbAsyncInit = function() {
  window.FB.init({
    appId      : '661692607342749',
    cookie     : true,
    xfbml      : false, 
    version    : 'v2.8' 
  });

  window.FB.getLoginStatus(checkLoginStatus);
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginStatus(response) {
	window.FB.Event.subscribe('auth.authResponseChange', checkLoginState);

	if(response.status === 'connected') {
  	const credential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
    const isSignedIn = (firebase.auth().currentUser !== null);

    if(isSignedIn && location.pathname !== '/policy') {
      swal({
        title: "登入中...",
        text: "",
        imageUrl: "/loading.gif",
        showConfirmButton: false
      });

      // auto login
      firebase.auth().signInWithCredential(credential)
      .then(user => {
        const { email, displayName, photoURL, uid } = user;
        store.dispatch(loginAndFetch(uid, email, displayName, photoURL, response.authResponse.accessToken));
        
        if(location.pathname === '/'){    
          browserHistory.push('/friends');
        }
      })
      .catch(error => {

      });
    }
    	
  }
  else {
  	if(location.pathname !== '/'){
      swal({
        title: "未登入",
        text: "將重新導向至登入頁面",
        type: "error",
        confirmButtonColor: "#3b5998"
      },
      function(){
        location.href = '/';
      });  		
    }
  }
}

function checkLoginState(event) {
  if(!event.authResponse) {
    swal({
      title: "失去連接",
      text: "Facebook已登出, 請重新登入",
      type: "error",
      confirmButtonColor: "#3b5998",
    });
    browserHistory.push('/');
  }
}