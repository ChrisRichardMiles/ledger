import React, { useState, useEffect } from 'react';

const GetSummary = () => {
  const [summary, setSummary] = useState({
    total_number_of_debits: 0,
    total_debit_amount: 0,
    total_number_of_credits: 0,
    total_credit_amount: 0,
    is_balanced: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch('http://localhost:8000/summary');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSummary(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch summary: ' + error.message);
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div>
      <h1>Ledger Summary</h1>
      {loading ? (
        <p>Loading summary...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Total Number of Debits</th>
              <th>Total Debit Amount</th>
              <th>Total Number of Credits</th>
              <th>Total Credit Amount</th>
              <th>Ledger Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{summary.total_number_of_debits}</td>
              <td>${summary.total_debit_amount.toFixed(2)}</td>
              <td>{summary.total_number_of_credits}</td>
              <td>${summary.total_credit_amount.toFixed(2)}</td>
              <td>{summary.is_balanced ? 'Balanced' : 'Not Balanced'}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GetSummary;
