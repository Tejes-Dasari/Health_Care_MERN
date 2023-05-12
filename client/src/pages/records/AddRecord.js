import React, { useState } from 'react';
import axios from 'axios';

function AddRecord() {
  const [name, setName] = useState('');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const record = { name, enrollmentNumber, description };
    axios.post('http://localhost:5000/records/add_record', record)
      .then((response) => {
        console.log(response.data);
        alert("Record Added Sucessfully")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRefresh = () => {
    window.location.reload();
  };


  return (
    <form className="Form" onSubmit={handleSubmit}>
      <label className='label'>
        Name:
        <input id="name" type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <br />
      <label className='label'>
        Enrollment Number:
        <input id="enrollmentNumber" type="text" value={enrollmentNumber} onChange={(event) => setEnrollmentNumber(event.target.value)} />
      </label>
      <br />
      <label className='label'>
        Description:
        <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      <br />
      <button onClick={handleRefresh} type="submit">Add Record</button>
    </form>
  );
}

export default AddRecord