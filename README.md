# E-Voting

Code source de ma démonstration de vote en ligne crée dans le cadre de mon travail de maturité

# Structure du repo

Ce repo contient le code source du fronted (Application React) et du serveur (Application FastAPI en python)

## Comment lancer le serveur (MacOS)
brew install redis
redis-server
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

### Doc du serveur
http://127.0.0.1:8000/docs


## Comment lancer le site
cd frontend
npm install
npm run dev