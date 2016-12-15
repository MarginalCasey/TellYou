import React, {Component} from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import firebase from 'firebase';
import swal from 'sweetalert';
import './Landing.css';

import { loginAndFetch } from '../actions/user.js';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
  }

  login() {
    const { dispatch } = this.props;

    window.FB.login(function(response) {
      if(response.status === 'connected') {
        swal({
          title: "登入中...",
          text: "",
          imageUrl: "/loading.gif",
          showConfirmButton: false
        });

        const credential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(credential)
        .then(user => {
          const { email, displayName, photoURL, uid } = user;
          dispatch(loginAndFetch(uid, email, displayName, photoURL, response.authResponse.accessToken));
        })
        .catch(error => {

        });
        
        browserHistory.push('/friends');
      } 
    }, {scope: 'email, public_profile, user_friends, publish_actions'});
  }

  render() {
    return (
      <div id="landing-page">
        <header>
          <span className='english'>
            <strong>Tell</strong>
            <strong>You</strong>
          </span> 
          <span className='chinese'>
            吐露友
          </span>
        </header>

        <section className="intro">
          <div className="slogan">
            <p>年紀愈長 &nbsp; 朋友愈多 &nbsp; 發文愈少 &nbsp; 我們不再分享生活</p>
            <p>吐露友 &nbsp; 讓你分享近況給限定的對象 &nbsp; 毋須再隱藏內心的聲音</p> 
          </div>
        </section>

        <section className="login">
          <div className="btn-group">
            <button className="btn facebook" onClick={this.login}>以 FACEBOOK 帳戶登入</button>
            <button className="btn demo"><Link to="/demo/friends">體驗 DEMO</Link></button>
          </div>
          <a href="/policy" target="_blank">隱私權政策</a>
        </section>
      </div>
    );
  }
}

Landing = connect()(Landing);

export default Landing


