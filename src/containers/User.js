import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import firebase from 'firebase';
import swal from 'sweetalert';

class User extends Component {
	static propTypes = {
		email: PropTypes.string.isRequired,
		photo: PropTypes.string.isRequired
	};

	constructor(props) {
	    super(props);
	    this.state = {
	      	isShowing: false
	    };

	    this.showInformation = this.showInformation.bind(this);
	    this.handleClick = this.handleClick.bind(this);
	    this.handleClickOutside = this.handleClickOutside.bind(this)
	    this.logOut = this.logOut.bind(this);
	}

	componentDidMount() {
	    document.addEventListener('click', this.handleClickOutside, false);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleClickOutside, false);
	}

	showInformation() {
		const text =
		"<p>哈囉~ 我是作者 Casey</p>" +
		"<p>對於空空如也的朋友列表感到困惑嗎?</p><br/>" +
		"<p>由於facebook的限制</p>" +
		"<p>吐露友只能取得同樣有使用這項服務的朋友清單</p>" +
		"<p>想要將所有朋友都納入自訂朋友圈的話</p>" +
		"<p>只能麻煩各位自行邀請囉~</p><br/>" +
		"<p>因為我自己也是這麼做的... ┐(´д`)┌</p>"
		

		swal({
          	title: "關於吐露友",
          	text: text,
          	type: "info",
        	confirmButtonColor: "#3b5998",
        	html: true
        });
	}
	
	handleClick() {
		this.setState({
			isShowing: true
		});
	}

	handleClickOutside(event) {
	    const domNode = findDOMNode(this);

	    if ((!domNode || !domNode.contains(event.target))) {
	        this.setState({
	            isShowing : false
	        });
	    }
	}

	logOut() {
		firebase.auth().signOut();
		location.href = '/';
	}

	render() {
		const { isShowing } = this.state;
		const { email, photo } = this.props;

		return(
			<div className="user-area">
				<button className="btn information" onClick={this.showInformation}>
					<i className="fa fa-info-circle" aria-hidden="true"></i>
				</button>
				<button className="btn user" onClick={this.handleClick}>
					<img src={photo} alt=""/>
				</button>
			{
				isShowing &&
				<div className="account-chooser">
					<img src={photo} alt=""/>
					<div>
						<div className="account-chooser-email">
							{email}
						</div>
						<div className="account-chooser-signout">
							<a href="#" onClick={this.logOut}>登出</a>
						</div>
					</div>
				</div>
			}
			</div>
		);	
	}
}

const mapStateToProps = (state, ownProps) => {
	const { email, photo } = state.user;

  	return {
  		email,
  		photo
  	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  	return {

  	}
}

User = connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

export default User
