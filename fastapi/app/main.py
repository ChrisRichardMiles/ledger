from fastapi import FastAPI, HTTPException, Query
from sqlalchemy import create_engine, MetaData, Table, select, text
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, Integer, String

# Create an instance of the FastAPI class
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Define the database URL
DATABASE_URL = 'sqlite:///ledger.db'

# Create the database engine
engine = create_engine(DATABASE_URL)

# Define metadata
# metadata = MetaData()

# Define the table
# ledger = Table(
#     'ledger', 
#     metadata, 
#     Column('id', Integer),
#     Column('description', String),
#     Column('amount', Integer)
# )

# metadata.create_all(engine)

# Define the route to handle the root endpoint
@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}

@app.get("/entries")
async def get_entries(account_name: str = Query(None)):
    print('get_entries', account_name)
    with engine.connect() as connection:
        if account_name:
            print(account_name)
            query = text("SELECT * FROM ledger WHERE account = :account_name")
            result = connection.execute(query, {'account_name': account_name})
            entries_data = result.fetchall()
            print(entries_data)
            if not entries_data:
                raise HTTPException(status_code=404, detail="No entries found for this account")
        else:
            query = text("SELECT * FROM ledger")
            result = connection.execute(query)
            entries_data = result.fetchall()

        print(entries_data)
        serialized_entries = [row._mapping for row in entries_data]
        return serialized_entries

# Define the route to handle the GET request for retrieving an entry by ID
@app.get("/entries/{entry_id}")
async def get_entry_by_id(entry_id: int):
    print('get_entry_by_id')
    # Create a database connection
    with engine.connect() as connection:
        # Execute a select query to retrieve the entry with the given ID
        query = text("SELECT * FROM ledger WHERE id = :entry_id")
        result = connection.execute(query, {'entry_id': entry_id})
        entry_data = result.fetchone()

        # Check if the entry was found
        if entry_data is None:
            raise HTTPException(status_code=404, detail="Entry not found")

    # Serialize the entry data into JSON format
    serialized_entry = entry_data._mapping
    
    # Return the JSON response containing the entry
    return serialized_entry

@app.get("/entries/?account_name=")
async def get_entries_by_account(account_name: str = None):
    print('get_entries_by_account')
    if not account_name:
        raise HTTPException(status_code=400, detail="Account name is required")
    
    with engine.connect() as connection:
        query = text("SELECT * FROM ledger WHERE account = :account_name")
        result = connection.execute(query, {'account_name': account_name})
        entries_data = result.fetchall()
        print(account_name)

        if not entries_data:
            raise HTTPException(status_code=404, detail="No entries found for this account")

        serialized_entries = [row._mapping for row in entries_data]
        return serialized_entries
