import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import swal from 'sweetalert';
import DroppableCards from '../../containers/Friends/DroppableCards.js';
import Cards from './Cards.js';

class FriendList extends Component {
	static propTypes = {
		id: PropTypes.number.isRequired,
		canvas: PropTypes.number,
		title: PropTypes.string.isRequired,
		members: PropTypes.arrayOf(PropTypes.string),
		children: PropTypes.arrayOf(PropTypes.number),
		renameList: PropTypes.func,
		deleteList: PropTypes.func
	}

	constructor(props) {
		super(props);
		this.state = {
			isOpen: true,
			isEditing: false,
			title: props.title
		};

		this.showInputArea = this.showInputArea.bind(this);
		this.showConfirm = this.showConfirm.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	showInputArea(event) {
		this.setState(prevState => ({
	      	isEditing: !prevState.isEditing
	    }));
	}

	showConfirm() {
		const { id, deleteList } = this.props;
		swal({
		  	title: "確定刪除?",
		  	text: "",
		  	type: "warning",
		  	showCancelButton: true,
		  	confirmButtonColor: "#3b5998",
		  	cancelButtonColor: "#E2E4E6",
		  	confirmButtonText: "確認",
		  	cancelButtonText: "取消",
		  	closeOnConfirm: false
		},
		function(){
			deleteList(id);
		  	swal("刪除成功", "", "success");
		});
	}

	handleChange(event) {
	    this.setState({
	    	title: event.target.value
	    });

	    this.props.renameList(event.target.value);
	}

	handleClick() {
		this.setState(prevState => ({
	      isOpen: !prevState.isOpen
	    }));
	}

	render() {
		const { id, canvas, title, members, children, getBreakpoints } = this.props;
		const { isEditing, isOpen } = this.state; 
		let listId;

		if(id === -1)
			listId = 'list-uncategorized';
		if(id === -2)
			listId = 'list-categorized';

      	return (
			<div id={listId} className="list">
				<div className="list-header">
				{ 
					(id === -1 || id === -2) &&
					<div className="title">{title}</div>	
				}
				{ 
					(id !== -1 && id !== -2) && isEditing && 
					<input type="text" value={this.state.title} 
						//onClick={(e) => {e.stopPropagation()}}
						onChange={this.handleChange}
						onBlur={this.showInputArea} 
						autoFocus />  
				}
				{ 
					(id !== -1 && id !== -2) && !isEditing && 
					<div className="title" onClick={this.showInputArea}>
						{title} 
					</div>	
				}
				{ 
					(id !== -1 && id !== -2) && !isEditing &&
					(
					<div className="button-groups">
						<button onClick={this.handleClick}><i className="fa fa-caret-down" aria-hidden="true"></i></button>
						<button onClick={this.showConfirm}><i className="fa fa-times" aria-hidden="true"></i></button>			
					</div>
					)
				}
				</div>

				{
					// Sidebar
					(id === -1 ||  id === -2) && 
					<div className="list-cards">
						<Cards 
				         	childLists={[]} 
				          	childCards={members.map((cardId) => ({id: cardId, parent: id}))}
				          	placeholderIndex={-1}
				          	isOver={false} 
				          	canDrop={false} />
			        </div>
				}

				{ 
					// Canvas
					(id !== -1 && id !== -2) && isOpen && 
					<DroppableCards 
						id={id}
						canvas={canvas}
						members={members}
						children={children} 
						getBreakpoints={getBreakpoints} />
				}

				
				<div className="list-footer">
				{
					(id !== -1 && id !== -2) && !(members.length === 0 && children.length === 0) && isOpen &&
					<Link to={{ pathname: '/friends', query: { listId: id } }} className="list-header-extra" activeClassName="active">
						詳細檢視	
					</Link>
				}
				</div>
			</div>
		);
	}
}

export default FriendList