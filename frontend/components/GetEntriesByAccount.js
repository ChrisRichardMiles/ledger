import React, { useState } from 'react';

const GetEntriesByAccount = () => {
  const [entries, setEntries] = useState([]);
  const [accountName, setAccountName] = useState('');

  const handleGetEntriesByAccount = async () => {
    if (!accountName) {
      console.error('Please enter a valid account name.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/entries?account_name=${accountName}`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleChange = (event) => {
    setAccountName(event.target.value);
  };

  const handleClick = () => {
    handleGetEntriesByAccount();
  };

  return (
    <div>
      <h1>Get Entries By Account</h1>
      <input
        type="text"
        value={accountName}
        onChange={handleChange}
        placeholder="Enter Account Name"
      />
      <button onClick={handleClick}>Get Entries</button>
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

export default GetEntriesByAccount;
