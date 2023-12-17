import React from 'react';
import PropTypes from 'prop-types';
// import arabica from "../img/arabica.jpg";
// import robusta from "../img/robusta.jpg";
// import excelsa from "../img/excelsa.jpg";

function CoffeeSackDisplay({ image, name, inventory, style }) {
  const sackStyle = {
    margin: '10px',
    width: 'calc(20% - 20px)',
    boxSizing: 'border-box'
  }

  const imageStyle = {
    width: "200px",
    height: "auto"
  }

  let inventoryMessage;
  if (inventory === 0) {
    inventoryMessage = <p style={{ color: 'red' }}>Out of Stock</p>;
  } else if (inventory <= 10) {
    inventoryMessage = <p style={{ color: 'orange' }}>Almost Empty</p>;
  } else {
    inventoryMessage = <span>Inventory: {inventory}</span>;
  }

  return (
    <div style={{...sackStyle, ...style}}>
      <img src={image} alt={`${name} sack`} style={imageStyle} />
      <h3>{name}</h3>
      <p>{inventoryMessage}</p>
    </div>
  );
}

CoffeeSackDisplay.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  inventory: PropTypes.number.isRequired,
  style: PropTypes.object
};

export default CoffeeSackDisplay;

