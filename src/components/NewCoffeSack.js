import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NewCoffeeSackForm({ onAddSack }) {
  const [newSack, setNewSack] = useState({
    productType: '',
    description: '',
    origin: '',
    roast: '',
    pricePerUnit: 0,
    inventory: 0
  });

  const handleChange = (e) => {
    setNewSack({ ...newSack, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSack(newSack);
    setNewSack({
      productType: '',
      description: '',
      origin: '',
      roast: '',
      pricePerUnit: 0,
      inventory: 0
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="productType" value={newSack.productType} onChange={handleChange} placeholder="Product Type" required />
      <input type="text" name="description" value={newSack.description} onChange={handleChange} placeholder="Description" required />
      <input type="text" name="origin" value={newSack.origin} onChange={handleChange} placeholder="Origin" required />
      <input type="text" name="roast" value={newSack.roast} onChange={handleChange} placeholder="Roast" required />
      <input type="number" name="pricePerUnit" value={newSack.pricePerUnit} onChange={handleChange} placeholder="Price Per Unit" required />
      <input type="number" name="inventory" value={newSack.inventory} onChange={handleChange} placeholder="Inventory" required />
      <button type="submit">Add Coffee Sack</button>
    </form>
  );
}

NewCoffeeSackForm.propTypes = {
  onAddSack: PropTypes.func.isRequired
};

export default NewCoffeeSackForm;
