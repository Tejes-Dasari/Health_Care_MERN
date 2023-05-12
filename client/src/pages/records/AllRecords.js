import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/records/all_records')
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ul>
      {Array.isArray(records) &&
          records.map((record) => (
            <li key={record.id}>
          <strong>{record.name}</strong> ({record.enrollmentNumber}) - {record.description}
        </li>
          ))}
    </ul>
  );
}

export default AllRecords