# This Is A Ledger App
The purpose of this project is to develop a backend for a General Ledger system using fastapi. The backend api will give endpoints that frontend applications use to interact with databases. To facilitate behavior driven development, we set up an sqlite database and a docker container running a nextjs frontend. 

## Current Endpoints: 
- [x] **POST /entries**: Create a new credit or debit ledger entry.
- [x] **GET /entries**: Retrieve all ledger entries.
- [x] **GET /entries/{entry_id}**: Retrieve a specific ledger entry by ID.
- [x] **GET /entries?account_name={name}**: Retrieve ledger entries filtered by account name.
- [x] **PATCH /entries/{entry_id}**: Update amount or description of a ledger entry; other fields are not editable.
- [x] **DELETE /entries/{entry_id}**: Delete a ledger entry by ID.
- [x] **GET /summary**: Retrieve a summary of the ledger including total number of debits, total debit amount, total number of credits, total credit amount, and whether the ledger is balanced (credit amount == debit amount).

## How to run
**Dependencies**: You will need docker and python (I used 3.10 but others should work). Docker is currently used to run the frontend app. I hope to have all three components (database, api, frontend) residing in their own containers in the future.
###
### Run 
```
git clone https://github.com/ChrisRichardMiles/ledger.git
cd ledger
bash run.sh
```
Visit `http://localhost:3000`

This will use venv and pip to install fastapi, uvicorn, and sqlalchemy. Then it will initialize a basic sqlite database with a few entries with total credits equal to total debits.
It will then start the fastapi app. Then it will create a docker image and start a container to run the frontend. 

After you are done, run `bash clean_docker_and_env.sh` to remove docker container and image and to kill the api app running at port 8000.
