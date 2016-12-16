import React, { Component, PropTypes }  from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { addToExclude, removeFromExclude, editFeed, postFeed } from '../../actions/feed.js';
import Cards from './Cards.js';

class NewFeed extends Component {
	static propTypes = {
		photo: PropTypes.string.isRequired,
		childCards: PropTypes.arrayOf(PropTypes.string).isRequired,
		content: PropTypes.string.isRequired,
		demo: PropTypes.bool.isRequired,
		addToList:  PropTypes.func.isRequired, 
		removeFromList: PropTypes.func.isRequired,
		editFeed: PropTypes.func.isRequired,
		postFeed: PropTypes.func.isRequired
	}

	constructor(props) {
	    super(props);

	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.props.editFeed(event.target.value);
  	}

  	handleSubmit() {
    	this.props.postFeed();
  	}

	render() {	
		const { photo, childCards, content, demo, addToList, removeFromList } = this.props;

		return (
			<div id="container">
				<div id="content">
					<main>
						<img src={photo} alt=""/>
						<textarea placeholder="想說些什麼?" value={content} onChange={this.handleChange} />
					</main>
					<footer>
						<button className="btn btn-lg btn-primary" onClick={this.handleSubmit}>
							發佈至 Facebook
        				</button>
					</footer>
				</div>
				<div id="privacy">
					<header>隱私設定</header>
					<main>
						<button className="btn btn-lg btn-success">
							<Link to={demo ? '/demo/feed/include' : '/feed/include'}>
          						分享範圍
        					</Link>
        				</button>
        				<button className="btn btn-lg btn-danger">
							<Link to={demo ? '/demo/feed/exclude' : '/feed/exclude'}>
          						排除對象
        					</Link>
        				</button>
					</main>
				</div>
				<div id="result">
					<header>觀看的到的朋友</header>
					<main>
						<Cards 
							type='exclude'
				         	childLists={[]} 
				          	childCards={childCards} 
				          	addToList={addToList}
				          	removeFromList={removeFromList} />
					</main>
				</div>
			</div>
		)	
	}
}

const mapStateToProps = (state, ownProps) => {
	const { photo } = state.user;
	const { include, exclude, content } = state.feed;
	let childCards = [...include], index;

	for(let i = 0, length = include.length; i < length; i++) {
		if(exclude.indexOf(include[i]) !== -1){
			index = childCards.indexOf(include[i]);
			childCards.splice(index, 1);
		}
	}

  	return {
  		photo,
    	childCards,
    	content,
    	demo: state.demo
  	};
}

const mapDispatchToProps = (dispatch, ownProps) => {  	
  	return {
	    addToList: (id, type) => {
        	dispatch(addToExclude(id, type));
	    },
	    removeFromList: (id, type) => {
	    	dispatch(removeFromExclude(id, type));
	    },
	    editFeed: (content) => {
	    	dispatch(editFeed(content));
	    },
	    postFeed: () => {
	    	dispatch(postFeed());
	    }
	}
}

NewFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewFeed);

export default NewFeed