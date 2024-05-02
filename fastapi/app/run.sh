python3 -m venv api_env
source api_env/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000