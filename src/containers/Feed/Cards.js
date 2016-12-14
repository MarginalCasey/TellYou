import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FriendList from './FriendList.js';
import Card from '../../components/Friends/Card.js';

class Cards extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    childLists: PropTypes.arrayOf(PropTypes.number).isRequired,
    childCards: PropTypes.arrayOf(PropTypes.string).isRequired,
    friendLists: PropTypes.object.isRequired,
    friends: PropTypes.object.isRequired,
    isChecked: PropTypes.func.isRequired,
    addToList: PropTypes.func.isRequired, 
    removeFromList: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(id) {
    const { addToList } = this.props;
    addToList(id, 'friend');
  }

  handleChange(id) {
    const { isChecked, addToList, removeFromList } = this.props;
    if(isChecked(id) === true){
      removeFromList(id, 'friend');
    }
    if(isChecked(id) === false){
      addToList(id, 'friend');
    }
  }

  render() {
    const { type, childLists, childCards, friendLists, friends, isChecked } = this.props;

    let cardList = [];

    // insert childlists
    childLists.forEach((listId) => {
      cardList.push(
        <div className="list-wrapper" key={listId}> 
          <FriendList 
            key={'list-'+listId}
            type={type}
            id={listId}
            title={friendLists[listId].title}
            members={friendLists[listId].members}
            children={friendLists[listId].children} />
        </div>
      );
    });

    // insert childcards
    for(let i = 0, length = childCards.length; i < length; i++) {
      let id = childCards[i];
      let person = friends[id]

      cardList.push(
        <div key={'card-'+id} id={'card-'+id} className="checkable">
          <div>
            <button onClick={this.handleClick.bind(null, id)}><i className="fa fa-minus-square" aria-hidden="true"></i></button>   
            <input type="checkbox" checked={isChecked(id)} onChange={this.handleChange.bind(null, id)} />
          </div>
          <Card 
            name={person.name} 
            photo={person.photo} />
        </div>
      );
    }

    return (
      <div>
        {cardList}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { entities, feed } = state;
  const { friendLists, friends } = entities;
  const { type: listType } = ownProps;

  return {
    friendLists,
    friends,
    isChecked: (id) => {
      if(feed[listType].indexOf(id) !== -1)
        return true;
     
      return false;
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}

Cards = connect(
  mapStateToProps,
  mapDispatchToProps
)(Cards);

export default Cards