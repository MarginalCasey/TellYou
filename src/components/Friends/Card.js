import React, { PropTypes } from 'react';

const Card = ({name, photo}) => (
  <div className="list-card">
    <img src={photo} alt=""/>
    <div className="name">{name}</div>
  </div>
);
		
Card.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired
};

export default Card