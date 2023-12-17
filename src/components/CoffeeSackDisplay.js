import React from 'react';
import PropTypes from 'prop-types';
// import arabica from "../img/arabica.jpg";
// import robusta from "../img/robusta.jpg";
// import excelsa from "../img/excelsa.jpg";

function CoffeeSackDisplay({ image, name, inventory }) {
  const sackStyle = {
    margin: '10px',
    width: '30%'
  }

  const imageStyle = {
    width: "200px",
    height: "auto"
  }

  return (
    <div style={sackStyle}>
      <img src={image} alt={`${name} sack`} style={imageStyle} />
      <h3>{name}</h3>
      <p>Inventory: {inventory}</p>
    </div>
  );
}

CoffeeSackDisplay.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  inventory: PropTypes.number.isRequired
};

export default CoffeeSackDisplay;

