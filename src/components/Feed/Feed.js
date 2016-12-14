import React, { Component }  from 'react';
import './Feed.css';

class Feed extends Component {
	render() {
    	const { children } = this.props;

	    return (
	    	<div>
	    		{children}
	    	</div>
	    );
  	}
}

export default Feed