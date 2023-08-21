# E-Voting (React + Pyodie + FastAPI + Redis)

Quellcode meiner Demonstration einer Online-Abstimmung, die im Rahmen meiner Maturaarbeit erstellt wurde

# Aufbau des Repos

Dieses Repo enthält den Quellcode für das Frontend (React Application) und den Server (FastAPI Server in Python).

## Wie man den Server startet (MacOS)
brew install redis
redis-server
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

### Server-Dok
http://127.0.0.1:8000/docs

## Wie man die Website startet
cd frontend
npm install
npm run dev

# Docker
docker-compose up -d