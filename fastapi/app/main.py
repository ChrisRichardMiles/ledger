from fastapi import FastAPI
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

# Define the route to handle the GET request for retrieving all entries
@app.get("/entries")
async def get_all_entries():
    # Create a database connection
    with engine.connect() as connection:
        # Execute a select query to retrieve all entries
        # query = select([ledger_entries])
        query = text("SELECT * FROM ledger")

        result = connection.execute(query)
        # Fetch all rows
        entries_data = result.fetchall()
        print(entries_data) 
    
    # Serialize the entries data into JSON format
    # return entries_data
    serialized_entries = [row._mapping for row in entries_data]
    
    # Return the JSON response containing all entries
    return serialized_entries
