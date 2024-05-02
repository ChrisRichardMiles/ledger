from fastapi import FastAPI, HTTPException, Request, Query
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from sqlalchemy import create_engine, text
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from pydantic import BaseModel
import json

class LedgerEntry(BaseModel):
    date: str
    account: str
    debit: float = None
    credit: float = None
    description: str = None

# Create an instance of the FastAPI class
app = FastAPI()

# Added for Debugging but it didn't show anything
# @app.exception_handler(RequestValidationError)
# async def validation_exception_handler(request: Request, exc: RequestValidationError):
#     errors = exc.errors()
#     body = await request.json()  # Be cautious with this line; if request body is large, this could be inefficient
#     return JSONResponse(
#         status_code=422,
#         content={
#             "detail": errors,
#             "body": body
#         }
#     )

# Middleware to log the request body
class RequestBodyLoggerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        if request.method == "POST" and request.url.path == "/entries":
            body = await request.json()
            print("Incoming POST request data:", json.dumps(body, indent=4))
        response = await call_next(request)
        return response

# Add the custom middleware
app.add_middleware(RequestBodyLoggerMiddleware)

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


@app.get("/summary")
async def get_ledger_summary():
    print('get_ledger_summary')
    with engine.connect() as connection:
        # Query to calculate the total number of debits and their total amount
        debit_query = text("""
            SELECT COUNT(*) as total_debits, SUM(debit) as total_debit_amount
            FROM ledger
            WHERE debit > 0
        """)
        debit_result = connection.execute(debit_query).fetchone()

        # Query to calculate the total number of credits and their total amount
        credit_query = text("""
            SELECT COUNT(*) as total_credits, SUM(credit) as total_credit_amount
            FROM ledger
            WHERE credit > 0  
        """)
        credit_result = connection.execute(credit_query).fetchone()
        print('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
        print(credit_result)

        # Determine if the ledger is balanced (total debits equal total credits)
        is_balanced = (debit_result[1] == credit_result[1])

        # Compile the results into a single dictionary to return as JSON
        summary = {
            "total_number_of_debits": debit_result[0],
            "total_debit_amount": abs(debit_result[1] if debit_result[1] else 0),  # Ensure no None values
            "total_number_of_credits": credit_result[0],
            "total_credit_amount": credit_result[1] if credit_result[1] else 0,
            "is_balanced": is_balanced
        }

        return summary
    
@app.post("/entries")
async def post_entry(entry: LedgerEntry):
    query = text("""
        INSERT INTO ledger (date, account, debit, credit, description)
        VALUES (:date, :account, :debit, :credit, :description)
    """)
    try:
        with engine.connect() as connection:
            result = connection.execute(query, entry.dict())
            connection.commit()  # Make sure to commit if not using autocommit
            return {"message": "Entry added successfully", "id": result.lastrowid}
    except SQLAlchemyError as e:
        print(f"Error occurred: {e}")
        raise HTTPException(status_code=500, detail="Failed to add entry")
    
# @app.post("/entries")
# async def post_entry(entry: LedgerEntry):
#     query = text("""
#         INSERT INTO ledger (date, account, debit, credit, description)
#         VALUES (:date, :account, :debit, :credit, :description)
#     """)
#     with engine.connect() as connection:
#         result = connection.execute(query, entry.dict())
#         if result.is_insert():
#             return {"message": "Entry added successfully", "id": result.lastrowid}
#         raise HTTPException(status_code=500, detail="Failed to add entry")
