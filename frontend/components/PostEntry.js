import React, { useState } from 'react';

function PostEntry() {
  const [entry, setEntry] = useState({
    date: '',
    accountName: '',
    entryType: '',
    amount: '',
    description: ''
  });

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert the amount to a float and validate it
    const amountValue = parseFloat(entry.amount);
    const isValidAmount = !isNaN(amountValue) && amountValue >= 0; // Include 0 as valid

    const payload = {
      date: entry.date,
      account: entry.accountName,
      debit: entry.entryType === 'debit' ? (isValidAmount ? amountValue : 0) : 0,
      credit: entry.entryType === 'credit' ? (isValidAmount ? amountValue : 0) : 0,
      description: entry.description
    };

    try {
      const response = await fetch('http://localhost:8000/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      alert('Entry posted successfully!');
    } catch (error) {
      console.error('Failed to post entry:', error);
      alert(`Failed to post entry: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Post Entry</h2>
      <label>
        Date:
        <input type="date" name="date" value={entry.date} onChange={handleChange} />
      </label>
      <label>
        Account Name:
        <input type="text" name="accountName" value={entry.accountName} onChange={handleChange} />
      </label>
      <label>
        Entry Type:
        <select name="entryType" value={entry.entryType} onChange={handleChange}>
          <option value="">Select Type</option>
          <option value="debit">Debit</option>
          <option value="credit">Credit</option>
        </select>
      </label>
      <label>
        Amount (USD):
        <input type="number" name="amount" value={entry.amount} onChange={handleChange} />
      </label>
      <label>
        Description (optional):
        <input type="text" name="description" value={entry.description} onChange={handleChange} />
      </label>
      <button type="submit">Post Entry</button>
    </form>
  );
}

export default PostEntry;
