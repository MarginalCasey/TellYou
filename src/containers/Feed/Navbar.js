import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

let Navbar = ({id, type, friendLists}) => {
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
          <Link to={'/feed/'+ type} className="list-header-extra" activeClassName="active">
          {friendLists[currentParent].title}
          </Link>
        </li>
      );
    }
    else{
      parentList.unshift(
        <li key={currentParent}>
          <Link to={{ pathname: '/feed/' + type, query: { listId: currentParent } }} className="list-header-extra" activeClassName="active">
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
      {
        (type === 'include') ?
        <span>分享範圍:</span> :
        <span>排除對象:</span>
      }
        
        {parentList}  
        <li key="current">{title}</li>
      </ul>
      <button className="btn btn-default">
        <Link to='/feed'>
          返回
        </Link>
      </button>
    </nav>
	)	
};	

Navbar.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  friendLists: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    friendLists: state.entities.friendLists
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