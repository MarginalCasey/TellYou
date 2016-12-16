import React, { Component }  from 'react';
import Navbar from '../../containers/Feed/Navbar.js';
import Canvas from '../../containers/Feed/Canvas.js';
import Sidebar from '../../containers/Feed/Sidebar.js';

class Setting extends Component {
	render() {
		const { route, location } = this.props;
		const listId =  Number(location.query.listId) || route.id;
		const type = route.type;
	
		return (
			<div id="board">
				<Navbar 
					id={listId}
					type={type} />
				<main>
					<Canvas 
						id={listId} 
						type={type} />
					<Sidebar 
						id={listId} 
						type={type} />
				</main>
			</div>
		)	
	}
}

export default Setting