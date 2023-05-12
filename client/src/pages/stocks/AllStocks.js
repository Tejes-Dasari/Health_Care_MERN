import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Input, Button, Popconfirm } from 'antd';

const AllStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedMedicineName, setEditedMedicineName] = useState('');
  const [editedInStock, setEditedInStock] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/stock/all_stocks')
      .then(response => setStocks(response.data))
      .catch(error => console.log(error));
  }, []);

  const editStock = (stock) => {
    setEditingId(stock._id);
    setEditedMedicineName(stock.medicineName);
    setEditedInStock(stock.inStock);
    setEditedDescription(stock.description);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedMedicineName('');
    setEditedInStock('');
    setEditedDescription('');
  };

  const saveEdit = async (stock) => {
    try {
      await axios.put(`http://localhost:5000/stock/update_stock/${stock._id}`, {
        medicineName: editedMedicineName,
        inStock: editedInStock,
        description: editedDescription,
      });
      const updatedStocks = stocks.map((s) =>
        s._id === stock._id
          ? {
              ...s,
              medicineName: editedMedicineName,
              inStock: editedInStock,
              description: editedDescription,
            }
          : s
      );
      setStocks(updatedStocks);
      setEditingId(null);
      setEditedMedicineName('');
      setEditedInStock('');
      setEditedDescription('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleMedicineNameChange = (event) => {
    setEditedMedicineName(event.target.value);
  };

  const handleInStockChange = (event) => {
    setEditedInStock(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const deleteStock = async (stock) => {
    try {
      await axios.delete(`http://localhost:5000/stock/delete_stock/${stock._id}`);
      const deleteStocks = stocks.filter((s) => s._id !== stock._id);
      setStocks(deleteStocks);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: 'Medicine Name',
      dataIndex: 'medicineName',
      key: 'medicineName',
      render: (text, stock) =>
        editingId === stock._id ? (
          <Input value={editedMedicineName} onChange={handleMedicineNameChange} />
        ) : (
          text
        ),
    },
    {
      title: 'In Stock',
      dataIndex: 'inStock',
      key: 'inStock',
      render: (text, stock) =>
        editingId === stock._id ? (
          <Input value={editedInStock} onChange={handleInStockChange} />
        ) : (
          text
        ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, stock) =>
        editingId === stock._id ? (
          <Input value={editedDescription} onChange={handleDescriptionChange}/>
            ) : (
              text
            ),
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          render: (_, stock) => {
            if (editingId === stock._id) {
              return (
                <>
                  <Button type="primary" onClick={() => saveEdit(stock)}>
                    Save
                  </Button>
                  <Button onClick={cancelEdit}>Cancel</Button>
                </>
              );
            }
            return (
              <>
                <Button onClick={() => editStock(stock)}>Edit</Button>
                <Popconfirm title="Are you sure to delete this record?" onConfirm={() => deleteStock(stock)}>
                  <Button type="danger">Delete</Button>
                </Popconfirm>
              </>
            );
          },
        },
        ];

return (
<Table dataSource={stocks} columns={columns} />
);
}

export default AllStocks;
