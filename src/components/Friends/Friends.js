import React, { Component }  from 'react';
import Navbar from '../../containers/Friends/Navbar.js';
import DroppableCanvas from '../../containers/Friends/DroppableCanvas.js';
import Sidebar from '../../containers/Friends/Sidebar.js';
import './Friends.css';

class Friends extends Component {
	render() {
		const { route, location } = this.props;
		const listId =  Number(location.query.listId) || route.id;
	
		return (
			<div id="board">
				<Navbar id={listId} />
				<main>
					<DroppableCanvas id={listId} />
					<Sidebar id={listId} />
				</main>
			</div>
		)	
	}
}		

export default Friends;