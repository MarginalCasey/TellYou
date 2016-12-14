import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import firebase from 'firebase';

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

	handleClickOutside(event) {
	    const domNode = findDOMNode(this);

	    if ((!domNode || !domNode.contains(event.target))) {
	        this.setState({
	            isShowing : false
	        });
	    }
	}

	handleClick() {
		this.setState({
			isShowing: true
		});
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
				<button className="btn" onClick={this.handleClick}>
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
