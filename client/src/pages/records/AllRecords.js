import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, Button, Popconfirm } from 'antd';

function AllRecords() {
  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEnrollmentNumber, setEditedEnrollmentNumber] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/records/all_records')
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const editRecord = (record) => {
    setEditingId(record._id);
    setEditedName(record.name);
    setEditedEnrollmentNumber(record.enrollmentNumber);
    setEditedDescription(record.description);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedName('');
    setEditedEnrollmentNumber('');
    setEditedDescription('');
  };

  const saveEdit = async (record) => {
    try {
      await axios.put(`http://localhost:5000/records/update_record/${record._id}`, {
        name: editedName,
        enrollmentNumber: editedEnrollmentNumber,
        description: editedDescription,
      });
      const updatedRecords = records.map((r) =>
        r._id === record._id
          ? {
              ...r,
              name: editedName,
              enrollmentNumber: editedEnrollmentNumber,
              description: editedDescription,
            }
          : r
      );
      setRecords(updatedRecords);
      setEditingId(null);
      setEditedName('');
      setEditedEnrollmentNumber('');
      setEditedDescription('');
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecord = async (record) => {
    try {
      await axios.delete(`http://localhost:5000/records/delete_record/${record._id}`);
      const deleteRecords = records.filter((r) => r._id !== record._id);
      setRecords(deleteRecords);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (event) => {
    setEditedName(event.target.value);
  };

  const handleEnrollmentNumberChange = (event) => {
    setEditedEnrollmentNumber(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setEditedDescription(event.target.value);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) =>
        editingId === record._id ? (
          <Input value={editedName} onChange={handleNameChange} />
        ) : (
          text
        ),
    },
    {
      title: 'Enrollment Number',
      dataIndex: 'enrollmentNumber',
      key: 'enrollmentNumber',
      render: (text, record) =>
        editingId === record._id ? (
          <Input value={editedEnrollmentNumber} onChange={handleEnrollmentNumberChange} />
        ) : (
          text
        ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) =>
        editingId === record._id ? (
          <Input value={editedDescription} onChange={handleDescriptionChange}/>
            ) : (
              text
            ),
        },
        {
          title: 'Created At',
          dataIndex: 'createdAt',
          key: 'createdAt',
          render: (createdAt) => new Date(createdAt).toLocaleString(),
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          render: (_, record) => {
            if (editingId === record._id) {
              return (
                <>
                  <Button type="primary" onClick={() => saveEdit(record)}>
                    Save
                  </Button>
                  <Button onClick={cancelEdit}>Cancel</Button>
                </>
              );
            }
            return (
              <>
                <Button onClick={() => editRecord(record)}>Edit</Button>
                <Popconfirm title="Are you sure to delete this record?" onConfirm={() => deleteRecord(record)}>
                  <Button type="danger">Delete</Button>
                </Popconfirm>
              </>
            );
          },
        },
        ];

return (
<Table dataSource={records} columns={columns} />
);
}

export default AllRecords;
        
