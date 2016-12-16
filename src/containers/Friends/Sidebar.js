import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import FriendList from '../../components/Friends/FriendList.js';

class Sidebar extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    groupMembers: PropTypes.arrayOf(PropTypes.string),
    ungroupMembers: PropTypes.arrayOf(PropTypes.string)
  }

  constructor(props) {
    super(props);
    this.state = {
      isGrabbing: false,
      gripperPosition: 300,
    }

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidMount() {
    this.setState({
      sidebarHeight: findDOMNode(this).getBoundingClientRect().height,
      gripperHeight: findDOMNode(this).getElementsByClassName('sidebarGripper')[0].getBoundingClientRect().height,
      headerHeight: Math.floor(findDOMNode(this).getElementsByClassName('list-header')[0].getBoundingClientRect().height) - 2,
    });
  }

  handleMouseDown(e) {
    this.setState({
      isGrabbing: true
    });
  }

  handleMouseMove(e) {
    const { isGrabbing, sidebarHeight, gripperHeight, headerHeight } = this.state;

    if(isGrabbing === true){
      let mouseY = e.pageY;
      let position = window.innerHeight - mouseY;

      if(position > (headerHeight + gripperHeight) && position < (sidebarHeight - headerHeight))
         this.setState({gripperPosition: position});
    }
  }

  handleMouseUp(e) {
    this.setState({
      isGrabbing: false
    });
  }

  render() {
    const { groupMembers, ungroupMembers } = this.props;
    const { gripperPosition, sidebarHeight } = this.state;

    return (
      <aside onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseUp}>
        <div className="list-wrapper" style={{height: sidebarHeight-gripperPosition+'px'}}>
          <FriendList 
            id={-1}
            title="未分類"
            members={ungroupMembers}
            children={[]} />
        </div>
        <div className="list-wrapper" style={{height: gripperPosition+'px'}}>
          <div className="sidebarGripper" onMouseDown={this.handleMouseDown}></div>
          <FriendList 
            id={-2}
            title="已分類"
            members={groupMembers}
            children={[]} />
        </div>
      </aside>
    ) 
  }
}

const mapStateToProps = (state, ownProps) => {
  let members = [], children = [];

  if(state.entities.friendLists[ownProps.id]) {
    members = state.entities.friendLists[ownProps.id].members;
    children = state.entities.friendLists[ownProps.id].children;
  }

  let groupMembers = [];
  let ungroupMembers = [...members];

  children.forEach((childrenId) => {
    state.entities.friendLists[childrenId].members.forEach((memberId) => {
      let i = ungroupMembers.indexOf(memberId);
      (i !== -1) &&　ungroupMembers.splice(i, 1);
      (i !== -1) &&　groupMembers.push(memberId);
    });
  });

  return {
    groupMembers,
    ungroupMembers
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}

Sidebar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);

export default Sidebar;

