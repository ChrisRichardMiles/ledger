from sqlalchemy import create_engine, Column, Date, String, Float, Integer
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Create an engine to connect to your database
engine = create_engine('sqlite:///ledger.db', echo=True)

# Create a base class for declarative class definitions
Base = declarative_base()

# Define your table by creating a class that inherits from Base
class LedgerEntry(Base):
    __tablename__ = 'ledger_entries'

    id = Column(Integer, primary_key=True)
    date = Column(Date, nullable=False)
    account = Column(String(255), nullable=False)
    debit = Column(Float)
    credit = Column(Float)
    description = Column(String(255))

# Create the table in the database
Base.metadata.create_all(engine)

# Create a Session class to interact with the database
Session = sessionmaker(bind=engine)

# Create a session instance
session = Session()

# Insert data into the table
entries_data = [
    {'date': '2024-05-10', 'account': 'Sales', 'debit': 5000.00, 'credit': None, 'description': 'Sale of product A'},
    {'date': '2024-05-12', 'account': 'Expenses', 'debit': None, 'credit': 1500.00, 'description': 'Office supplies purchase'},
    {'date': '2024-05-15', 'account': 'Accounts Receivable', 'debit': 3000.00, 'credit': None, 'description': 'Invoice payment received'}
]

for data in entries_data:
    entry = LedgerEntry(**data)
    session.add(entry)

session.commit()

# Query the table
entries = session.query(LedgerEntry).all()
for entry in entries:
    print(entry.date, entry.account, entry.debit, entry.credit, entry.description)

# Close the session when you're done
session.close()
