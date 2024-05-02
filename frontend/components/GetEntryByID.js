import React, { useState } from 'react';

const GetEntryById = () => {
  const [entries, setEntries] = useState([]);
  const [entryId, setEntryId] = useState('');

  const handleGetEntryById = async () => {
    if (!entryId) {
      console.error('Please enter a valid ID.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/entries/${entryId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setEntries([data]); // Assuming the API returns a single entry object
    } catch (error) {
      console.error('Error fetching entry:', error);
    }
  };

  const handleChange = (event) => {
    setEntryId(event.target.value); // Update entryId state with user input
  };

  const handleClick = () => {
    handleGetEntryById(); // Fetch entry when button is clicked
  };

  return (
    <div>
      <h1>Get Entry By Id</h1>
      <input
        type="number"
        value={entryId}
        onChange={handleChange}
        placeholder="Enter Entry ID"
      />
      <button onClick={handleClick}>Get Entry By Id</button>
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
          {entries.map((entry, index) => (
            <tr key={index}>
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

export default GetEntryById;
