cp ledger_copy.db ledger.db
lsof -ti:8000 | xargs kill
