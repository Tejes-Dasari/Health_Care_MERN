// StockForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddStock = () => {
  const [medicineName, setMedicineName] = useState('');
  const [inStock, setInStock] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('http://localhost:5000/stock/add_stock', { medicineName, inStock, description })
      .then(response => console.log(response.data))
      alert("Stock Added Sucessfully")
      .catch(error => console.log(error));
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <label className='label'>
        Medicine Name:
        <input type="text" value={medicineName} onChange={event => setMedicineName(event.target.value)} />
      </label >
      <br />
      <label className='label'>
        In Stock:
        <input type="number" value={inStock} onChange={event => setInStock(event.target.value)} />
      </label>
      <br />
      <label className='label'>
        Description:
        <textarea value={description} onChange={event => setDescription(event.target.value)} />
      </label>
      <br />
      <button onClick={handleRefresh} type="submit">Submit</button>
    </form>
  );
};

export default AddStock;
