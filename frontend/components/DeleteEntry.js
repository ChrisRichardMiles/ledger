import React, { useState } from 'react';

function DeleteEntry() {
    const [entryId, setEntryId] = useState('');

    const handleChange = (e) => {
        setEntryId(e.target.value);
    };

    const handleDelete = async () => {
        if (!entryId) {
            alert('Please enter an entry ID.');
            return;
        }
        try {
            const response = await fetch(`http://localhost:8000/entries/${entryId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete entry. Status: ' + response.status);
            }
            alert('Entry deleted successfully!');
            setEntryId(''); // Clear the input after successful deletion
        } catch (error) {
            alert('Error deleting entry: ' + error.message);
        }
    };

    return (
        <div>
            <h2>Delete Entry</h2>
            <input
                type="text"
                value={entryId}
                onChange={handleChange}
                placeholder="Enter entry ID"
            />
            <button onClick={handleDelete}>Delete Entry</button>
        </div>
    );
}

export default DeleteEntry;
