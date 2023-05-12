import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllStocks = () => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/stock/all_stocks')
      .then(response => setStock(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Medicine Name</th>
          <th>In Stock</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
      {Array.isArray(stock) &&
        stock.map((entry, index) => (
          <tr key={index}>
            <td>{entry.medicineName}</td>
            <td>{entry.inStock}</td>
            <td>{entry.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AllStocks;
