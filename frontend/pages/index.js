import React from 'react';
import GetEntries from '../components/GetEntries';
import GetEntryById from '../components/GetEntryByID';
import GetEntriesByAccount from '../components/GetEntriesByAccount';
import GetSummary from '../components/GetSummary';
import PostEntry from '../components/PostEntry';
import UpdateEntry from '../components/UpdateEntry';
import DeleteEntry from '../components/DeleteEntry';

const IndexPage = () => {
  return (
    <div>
      <h1>Welcome to the General Ledger System</h1>
      {/* Post Entry Form */}
      <PostEntry />
      {/* Get All Entries Button */}
      <GetEntries />
      {/* Get Entry By Entry ID Form */}
      <GetEntryById />
      {/* Get Entries For Account Form */}
      <GetEntriesByAccount />
      {/* Update Entry By Entry ID Form */}
      <UpdateEntry />
      {/* Delete Entry By Entry ID Form */}
      <DeleteEntry />
      {/* <form>
        <h2>Delete Entry By Entry ID</h2>
        <label>
          Entry ID:
          <input type="text" name="entryId" />
        </label>
        <button type="submit">Delete Entry</button>
      </form> */}
      {/* Get Ledger Summary Section */}
      <GetSummary />
    </div>
  );
};

export default IndexPage;
