import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

let Navbar = ({id, friendLists, demo}) => {
  let title, parent = 0;
  
  if(friendLists[id]) {
    title = friendLists[id].title;
    parent = friendLists[id].parent;
  }
  
  let parentList=[];
  let currentParent = parent;

  while(currentParent !== -1) {
    if(currentParent === 0){
      parentList.unshift(
        <li key="all">
          <Link to={demo ? '/demo/friends' : '/friends'} className="list-header-extra" activeClassName="active">
          {friendLists[currentParent].title}
          </Link>
        </li>
      );
    }
    else{
      parentList.unshift(
        <li key={currentParent}>
          <Link to={{ pathname: demo ? '/demo/friends' : '/friends', query: { listId: currentParent } }} className="list-header-extra" activeClassName="active">
          {friendLists[currentParent].title}
          </Link>
        </li>
      );
    }

    currentParent = friendLists[currentParent].parent;
  }

	return (
    <nav>
      <ul className="breadcrumb">
        {parentList}  
        <li key="current">{title}</li>
      </ul>
    </nav>
	)	
};	

Navbar.propTypes = {
  id: PropTypes.number.isRequired,
  friendLists: PropTypes.object.isRequired,
  demo: PropTypes.bool.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    friendLists: state.entities.friendLists,
    demo: state.demo
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}

Navbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

export default Navbar;