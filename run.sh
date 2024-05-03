python3 -m venv env
source env/bin/activate
pip install fastapi uvicorn sqlalchemy 
cp fastapi/app/ledger_copy.db fastapi/app/ledger.db
cd fastapi/app/
bash run.sh # uvicorn main:app --host 0.0.0.0 --port 8000
cd ../../frontend/
bash run.sh # set up frontend container

