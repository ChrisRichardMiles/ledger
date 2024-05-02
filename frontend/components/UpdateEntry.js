import React, { useState } from 'react';

function UpdateEntry() {
    const [entry, setEntry] = useState({
        id: '',
        amount: '',
        description: ''
    });

    const handleChange = (e) => {
        setEntry({ ...entry, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!entry.id) {
            alert('ID is required to update an entry.');
            return;
        }

        const payload = {
            amount: entry.amount ? parseFloat(entry.amount) : undefined,
            description: entry.description || undefined
        };

        try {
            const response = await fetch(`http://localhost:8000/entries/${entry.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            alert('Entry updated successfully!');
            setEntry({ id: '', amount: '', description: '' }); // Reset form
        } catch (error) {
            console.error('Failed to update entry:', error);
            alert('Failed to update entry: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Update Entry</h2>
            <label>
                Entry ID:
                <input type="text" name="id" value={entry.id} onChange={handleChange} />
            </label>
            <label>
                New Amount (USD):
                <input type="number" name="amount" value={entry.amount} onChange={handleChange} />
            </label>
            <label>
                New Description (optional):
                <input type="text" name="description" value={entry.description} onChange={handleChange} />
            </label>
            <button type="submit">Update Entry</button>
        </form>
    );
}

export default UpdateEntry;
