import React from 'react';
import GetEntries from '../components/GetEntries';
import GetEntryById from '../components/GetEntryByID';
import GetEntriesByAccount from '../components/GetEntriesByAccount';


const IndexPage = () => {
  return (
    <div>
      <h1>Welcome to the General Ledger System</h1>
      {/* Post Entry Form */}
      <form>
        <h2>Post Entry</h2>
        <label>
          Date:
          <input type="date" name="date" />
        </label>
        <label>
          Account Name:
          <input type="text" name="accountName" />
        </label>
        <label>
          Entry Type:
          <select name="entryType">
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </select>
        </label>
        <label>
          Amount (USD):
          <input type="number" name="amount" />
        </label>
        <label>
          Description (optional):
          <input type="text" name="description" />
        </label>
        <button type="submit">Post Entry</button>
      </form>

      {/* Get All Entries Button */}
      <GetEntries />
      {/* Get Entry By Entry ID Form */}
      <GetEntryById />
      {/* Get Entries For Account Form */}
      <GetEntriesByAccount />

      {/* Update Entry By Entry ID Form */}
      <form>
        <h2>Update Entry By Entry ID</h2>
        <label>
          Entry ID:
          <input type="text" name="entryId" />
        </label>
        <label>
          Amount:
          <input type="number" name="amount" />
        </label>
        <label>
          Description:
          <input type="text" name="description" />
        </label>
        <button type="submit">Update Entry</button>
      </form>

      {/* Delete Entry By Entry ID Form */}
      <form>
        <h2>Delete Entry By Entry ID</h2>
        <label>
          Entry ID:
          <input type="text" name="entryId" />
        </label>
        <button type="submit">Delete Entry</button>
      </form>

      {/* Get Ledger Summary Button */}
      <button>Get Ledger Summary</button>
    </div>
  );
};

export default IndexPage;
