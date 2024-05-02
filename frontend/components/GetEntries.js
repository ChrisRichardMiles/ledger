import React, { useState, useEffect } from 'react';

const GetEntries = () => {
  const [entries, setEntries] = useState([]);

  const handleGetAllEntries = async () => {
    try {
      const response = await fetch('http://localhost:8000/entries');
      if (!response.ok) {
        throw new Error('Failed to fetch entries');
      }
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching entries:', error);
      alert('Failed to fetch entries: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Get All Entries</h1>
      <button onClick={handleGetAllEntries}>Get All Entries</button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Account</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.date}</td>
              <td>{entry.account}</td>
              <td>{entry.debit}</td>
              <td>{entry.credit}</td>
              <td>{entry.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetEntries;
