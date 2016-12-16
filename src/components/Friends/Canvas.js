import React, { Component, PropTypes } from 'react';
import DraggableFriendList from '../../containers/Friends/DraggableFriendList.js';

class Canvas extends Component {
	static propTypes = {
		parent: PropTypes.number.isRequired,
	  	children: PropTypes.arrayOf(PropTypes.number).isRequired,
	  	placeholderIndex: PropTypes.number.isRequired,
	  	placeholderSize: PropTypes.object.isRequired,
	  	isOver: PropTypes.bool.isRequired,
	  	canDrop: PropTypes.bool.isRequired,
	  	createList: PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			isEditing: false,
			value: '',
		}

		this.showInputArea = this.showInputArea.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	showInputArea(event) {
		event.stopPropagation();

		this.setState(prevState => ({
	      	isEditing: !prevState.isEditing
	    }));
	}

	handleChange(event) {
	    this.setState({
	    	value: event.target.value
	    });
	}

	handleSubmit() {
		this.props.createList(this.state.value);
		this.setState({
	    	value: ''
	    });
	}

	render() {
		const { parent, children, placeholderIndex, placeholderSize, isOver, canDrop, getBreakpoints } = this.props;
		const { isEditing } = this.state;

		let lists = [];

		for(let i = 0, length = children.length; i < length; i++) {
			if(isOver && canDrop && placeholderIndex === i){
				lists.push(
					<div className="list-wrapper" key="placeholder">
						<div className="list placeholder"
							 style={placeholderSize} />
					</div>
				)
			}
				
			lists.push(
				<div className="list-wrapper" key={children[i]}>
	      			<DraggableFriendList 
	      				id={children[i]}
	      				canvas={parent} 
	      				parent={parent} 
	      				getBreakpoints={getBreakpoints} />
				</div>
			);

			if(isOver && canDrop && i === length - 1 && placeholderIndex === length){
				lists.push(
					<div className="list-wrapper" key="placeholder">
						<div className="list placeholder"
							 style={placeholderSize} />
					</div>
				)
			}
		}

		return(
			<div className="canvas">
				{lists}
				<div className="list-wrapper">
					<div>
						<div className="list new-list">
							<form onClick={this.showInputArea} className={(!isEditing && 'close') || 'open'}>
							{ 
								!isEditing && 
								<span>新增朋友圈…</span> 
							}
							{ 
								isEditing && 
								<input type="text" placeholder="新增朋友圈…" value={this.state.value} 
									onClick={(e) => {e.stopPropagation()}} 
									onChange={this.handleChange} /> 
							}
							{ 
								isEditing && 
								<div className="list-control">
									<button onClick={this.handleSubmit} className="btn btn-default">確認</button>
									<button onClick={() => {this.setState({value: ''})}} className="btn">
										<i className="fa fa-times" aria-hidden="true"></i>
									</button>
								</div> 
							}
							</form>	
						</div>	
					</div>
				</div>
			</div>
		);	
	}
}

export default Canvas;