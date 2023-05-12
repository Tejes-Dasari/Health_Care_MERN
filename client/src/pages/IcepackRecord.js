import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IcepackRecord = () => {
  const [name, setName] = useState('');
  const [icepackCount, setIcepackCount] = useState(0);
  const [email, setEmail] = useState('');
  const [icePackRecords, setIcePackRecords] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/icepack_record')
      .then(response => {
        console.log(response.data);
        setIcePackRecords(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    axios.post('http://localhost:5000/icepack_record', {
      name,
      icepackCount,
      email
    })
      .then(response => {
        console.log(response.data);
        setIcePackRecords([...icePackRecords, response.data]);
        setName('');
        setIcepackCount(0);
        setEmail('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Ice Pack Record</h1>
      <form onSubmit={handleSubmit}>
        <label className='icepack' htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={event => setName(event.target.value)} required />

        <label className='icepack' htmlFor="icepackCount">Ice Pack Count:</label>
        <input type="number" id="icepackCount" value={icepackCount} onChange={event => setIcepackCount(event.target.value)} required />

        <label className='icepack' htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={event => setEmail(event.target.value)} required />

        <button type="submit">Add Record</button>
      </form>

      <h2>Records:</h2>
      <ul>
      {Array.isArray(icePackRecords) &&
        icePackRecords.map(icePackRecord => (
          <li key={icePackRecord._id}>
            <div>Name: {icePackRecord.name}</div>
            <div>Ice Pack Count: {icePackRecord.icepackCount}</div>
            <div>Email: {icePackRecord.email}</div>
            <div>Created At: {new Date(icePackRecord.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IcepackRecord;
