-- Create table and insert data
CREATE TABLE IF NOT EXISTS ledger_entries (
    entry_id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    account_name VARCHAR(255) NOT NULL,
    debit MONEY,
    credit MONEY,
    description VARCHAR(255)
);

-- Insert initial data
INSERT INTO ledger_entries (date, account_name, debit, credit, description) VALUES
    ('2024-05-10', 'Sales', '$5000.00', NULL, 'Sale of product A'),
    ('2024-05-12', 'Expenses', NULL, '$1500.00', 'Office supplies purchase'),
    ('2024-05-15', 'Accounts Receivable', '$3000.00', NULL, 'Invoice payment received');

